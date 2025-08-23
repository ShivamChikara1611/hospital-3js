# Use official Python image
FROM python:3.9

# Create a non-root user
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy requirements with proper ownership
COPY --chown=user ./requirements.txt requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY --chown=user . /app

# Expose the port expected by Hugging Face Spaces
EXPOSE 7860

# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "7860"]
