# Use official Python base image
FROM python:3.9-slim

# Set working directory to /app
WORKDIR /app

# Copy only requirements first to install dependencies early
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port (Railway will use this automatically)
EXPOSE 8000

# Start the application using Gunicorn
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-8000} app:app"]
