# Use official Python image
FROM python:3.10-slim

# Set working directory in container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything to the container
COPY . .

# Expose the port (optional, Railway sets it)
EXPOSE 8000

# Run gunicorn from inside the api/ folder
CMD ["sh", "-c", "gunicorn --chdir api --bind 0.0.0.0:${PORT:-8000} app:app"]
