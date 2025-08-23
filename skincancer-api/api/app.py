import os
import numpy as np
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
import traceback
from huggingface_hub import hf_hub_download

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Constants
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
IMG_WIDTH, IMG_HEIGHT = 224, 224

# Hugging Face model repo
MODEL_REPO = "shivamchikara0006/skin-cancer-model"
MODEL_FILENAME = "skin_cancer_model.h5"

# Load model from HF Hub
try:
    model_path = hf_hub_download(repo_id=MODEL_REPO, filename=MODEL_FILENAME)
    model = load_model(model_path)
    logger.info(f"Model loaded successfully from {MODEL_REPO}. Input shape: {model.input_shape}")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise

CLASS_LABELS = ["Benign", "Malignant"]  # Ensure order matches your training

def allowed_file(filename):
    """Check if file extension is valid"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(img_file):
    """Preprocess uploaded image for model"""
    try:
        img = Image.open(io.BytesIO(img_file.read()))
        if img.mode != "RGB":
            img = img.convert("RGB")
        img = img.resize((IMG_WIDTH, IMG_HEIGHT))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        return img_array
    except Exception as e:
        logger.error(f"Image preprocessing failed: {str(e)}")
        raise ValueError("Invalid image format or corrupted file")
    finally:
        img_file.seek(0)

def get_prediction(image_array):
    """Make prediction with model"""
    try:
        prediction = model.predict(image_array)
        if prediction.shape[1] == 1:  # Binary (sigmoid)
            confidence = float(prediction[0][0])
            class_index = 1 if confidence >= 0.5 else 0
            confidence = confidence if class_index == 1 else 1 - confidence
        else:  # Multiclass (softmax)
            class_index = np.argmax(prediction[0])
            confidence = float(np.max(prediction[0]))
        return CLASS_LABELS[class_index], confidence
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise

@app.route("/predict", methods=["POST"])
def predict():
    """Handle prediction requests"""
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Empty filename"}), 400
        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Allowed: png, jpg, jpeg"}), 400

        processed_image = preprocess_image(file)
        class_name, confidence = get_prediction(processed_image)

        logger.info(f"Prediction: {class_name} ({confidence:.2%})")
        return jsonify({
            "prediction": class_name,
            "confidence": round(confidence, 4),
            "timestamp": datetime.now().isoformat(),
            "status": "success"
        })
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}\n{traceback.format_exc()}")
        return jsonify({"error": "An unexpected error occurred"}), 500

@app.route("/")
def home():
    return jsonify({
        "name": "Skin Cancer Detection API",
        "status": "running",
        "endpoints": {
            "prediction": "/predict (POST)"
        }
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))  # Hugging Face default
    app.run(host="0.0.0.0", port=port, debug=False)
