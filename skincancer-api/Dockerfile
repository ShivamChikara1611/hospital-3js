# Use official Python image
FROM python:3.10-slim

# Set environment variable for PORT (Railway will override it if available)
ENV PORT=8000

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Expose the port
EXPOSE $PORT

# Start the app using gunicorn from inside 'api'
CMD ["gunicorn", "--chdir", "api", "--bind", "0.0.0.0:$PORT", "app:app"]
