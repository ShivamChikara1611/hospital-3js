FROM python:3.10-slim

# Set environment variable for Railway
ENV PORT=7860

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything
COPY . .

# Expose port
EXPOSE 7860

# Use shell form so $PORT is interpreted correctly
# CMD gunicorn --chdir api --bind 0.0.0.0:$PORT app:app

# for hugging face
CMD ["python", "app.py"] 