FROM python:3.10-slim

ENV PORT=8000

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

# Use a shell form so ${PORT:-8000} works
CMD gunicorn --chdir api --bind 0.0.0.0:${PORT:-8000} app:app
