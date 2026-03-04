FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    ffmpeg \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download RNNoise model for noise reduction
RUN mkdir -p /app/rnnoise-models && \
    wget -q -O /app/rnnoise-models/bd.rnnn \
    https://github.com/GregorR/rnnoise-models/raw/master/beguiling-drafter-2018-08-30/bd.rnnn

RUN pip install --no-cache-dir \
    flask==3.0.3 \
    cloudevents==1.11.0 \
    google-cloud-storage==2.16.0 \
    supabase==2.0.3 \
    openai-whisper \
    auto-editor==29.3.1 \
    ffmpeg-normalize \
    google-generativeai \
    anthropic

WORKDIR /app
COPY . .

EXPOSE 8080
CMD ["python", "main.py"]
