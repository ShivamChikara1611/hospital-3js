import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const images = [assets.skincancer1, assets.skincancer2, assets.skincancer3];

const SkinCancerDetection = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (
            selectedFile &&
            (selectedFile.type === "image/jpeg" || selectedFile.type === "image/jpg")
        ) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
            setShowPreview(false); // Reset preview when a new file is selected
        } else {
            setFile(null);
            setPreviewUrl(null);
            setError("Please upload a valid .jpg or .jpeg file.");
        }
    };

    const handlePredict = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }
        // Show the uploaded image once detect is clicked
        setShowPreview(true);
        setLoading(true);
        setError(null);
        setPrediction(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(process.env.VITE_SKIN_CANCER_DETECTION_URL, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setPrediction(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-[50px] text-gray-800 flex flex-col w-full mb-[150px]">
            <h1 className="text-4xl sm:text-6xl mb-[50px] font-semibold text-center"><span className="text-primary">Conquering</span> Skin Cancer Together
            </h1>

            <article>
                {/* Slideshow Container */}
                <div className="relative h-full overflow-hidden md:w-[40%] float-left md:mr-5">
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-contain flex-shrink-0 mb-12 md:mb-0"
                            />
                        ))}
                    </div>
                </div>

                {/* Detail Description */}
                <h3 className="text-primary font-bold text-lg">A Message of Hope & Strength</h3>
                <p className="text-sm text-gray-500 font-light">At the heart of every challenge lies the opportunity for triumph. Whether you are beginning your journey or have been battling skin cancer for some time, remember that early detection and proactive care are powerful tools. With cutting-edge technology and compassionate support, you are not alone on this journey.</p>

                <br />

                <h3 className="text-primary font-bold text-lg">What Is Skin Cancer?</h3>
                <p className="text-sm text-gray-500 font-light">Skin cancer affects millions, but knowledge is your first line of defense. By understanding the warning signs and risk factors, you empower yourself to take timely action. Our advanced detection tools are designed to provide you with the insights needed for early diagnosis and intervention.</p>

                <br />

                <h3 className="text-primary font-bold text-lg">Our Innovative Approach</h3>
                <p className="text-sm text-gray-500 font-light">Imagine a future where technology meets compassion—a future where smart tools help in detecting early signs of skin cancer, giving you the opportunity to act before it’s too late. With our AI-driven detection system, you gain clarity, support, and the chance to address skin cancer at its earliest stages.</p>

                <br />

                <h3 className="text-primary font-bold text-lg">Steps to Beat Skin Cancer:</h3>
                <ol className="text-sm text-gray-500 font-light list-decimal list-inside">
                    <li>Early Detection: Regular screenings can save lives. Our tool helps identify potential issues early, giving you a head start in treatment.</li>
                    <li>Informed Decisions: With accurate results and detailed insights, you can work closely with your healthcare provider to choose the best path forward.
                    </li>
                    <li>Support and Community: Lean on expert advice, supportive communities, and a network that understands your journey.
                    </li>
                    <li>Healthy Living: Embrace a lifestyle that nurtures your body and mind—balanced nutrition, sun safety, and regular checkups are key pillars of prevention and recovery.
                    </li>
                </ol>

                <br />

                <h3 className="text-primary font-bold text-lg">You Are Stronger Than You Think</h3>
                <p className="text-sm text-gray-500 font-light">Every step you take towards understanding and combating skin cancer is a step towards a healthier, brighter future. Embrace the spirit of resilience and know that every day brings new hope. With the right tools, information, and support, you can beat skin cancer and reclaim your life.
                </p>
            </article>



            <div className="bg-primary rounded-lg mt-[100px] p-5 max-w-[400px] mx-auto">
                <h3 className="text-center text-xl font-semibold text-white">Check Here</h3>

                <div className="md:flex gap-5 items-center w-full justify-center w-full mt-5">
                    {/* File Upload */}
                    <input
                        type="file"
                        accept=".jpg, .jpeg"
                        onChange={handleFileChange}
                        className="p-1.5 rounded bg-third cursor-pointer w-full mb-2 md:mb-0 text-sm"
                    />

                    {/* Predict Button */}
                    <div>
                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className="px-5 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition duration-300"
                        >
                            {loading ? "Detecting..." : "Detect"}
                        </button>
                    </div>
                </div>

                {/* Preview Uploaded Image */}
                {showPreview && previewUrl && (
                    <div className="mt-5 w-full">
                        <h3 className="text-md text-gray-800 mb-3">Result</h3>
                        <img
                            src={previewUrl}
                            alt="Uploaded Preview"
                            className="w-full"
                        />
                    </div>
                )}


                {/* Error Message */}
                {error && <p className="text-sm text-red-500 mt-5">{error}</p>}


                {/* Prediction Result */}
                {prediction && (
                    <div className="mt-5">
                        <p>Status: {prediction.prediction === "Malignant" ? 'True' : 'False'}</p>
                        <p>Accuracy: {prediction.confidence * 100}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SkinCancerDetection;