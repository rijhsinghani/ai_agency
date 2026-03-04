#!/bin/bash
# Deploy video-pipeline Cloud Run service
# Region: us-east4 (CPU-only Whisper; GPU not available in us-east4)
set -e

PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-"videoprocessing"}
SERVICE_NAME="video-pipeline"
REGION="us-east4"
IMAGE="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "Building and pushing Docker image..."
docker build -t "${IMAGE}" "$(dirname "$0")"
docker push "${IMAGE}"

echo "Deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE}" \
  --region="${REGION}" \
  --project="${PROJECT_ID}" \
  --cpu=4 \
  --memory=4Gi \
  --timeout=3600 \
  --min-instances=0 \
  --max-instances=3 \
  --set-env-vars="GCS_TRIGGER_BUCKET=${GCS_TRIGGER_BUCKET},GCS_OUTPUT_BUCKET=${GCS_OUTPUT_BUCKET}" \
  --set-secrets="SUPABASE_URL=supabase-url:latest,SUPABASE_SERVICE_KEY=supabase-service-key:latest" \
  --no-allow-unauthenticated

echo "Setting up Eventarc trigger..."
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" --region="${REGION}" --format='value(status.url)')
PROJECT_NUMBER=$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')

gcloud eventarc triggers create "${SERVICE_NAME}-trigger" \
  --location="${REGION}" \
  --destination-run-service="${SERVICE_NAME}" \
  --destination-run-region="${REGION}" \
  --event-filters="type=google.cloud.storage.object.v1.finalized" \
  --event-filters="bucket=${GCS_TRIGGER_BUCKET}" \
  --service-account="service-${PROJECT_NUMBER}@gcp-sa-eventarc.iam.gserviceaccount.com"

echo "Deployment complete. Service URL: ${SERVICE_URL}"
