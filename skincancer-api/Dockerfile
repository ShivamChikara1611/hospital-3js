FROM python:3.10-slim

# Set environment variable
ENV PORT=8000

# Set working directory to /app
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the whole project
COPY . .

# Expose the port (for Railway)
EXPOSE 8000

# Start gunicorn server from within the /app directory
CMD ["gunicorn", "--chdir", "api", "--bind", "0.0.0.0:8000", "app:app"]
