# Use the official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy only the necessary files from skincancer-api
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port Railway provides
EXPOSE $PORT

# Run your Flask app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "app:app"]
