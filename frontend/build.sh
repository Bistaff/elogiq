#!/bin/bash

source .docker/.env

echo "Build of application"
npm run build --configuration=production

echo "Build project as image with name: $IMAGE_NAME:$IMAGE_TAG"
docker build -t $IMAGE_NAME:$IMAGE_TAG -f .docker/Dockerfile .
docker tag $IMAGE_NAME:$IMAGE_TAG bistaff95/$IMAGE_NAME:$IMAGE_TAG
docker push bistaff95/$IMAGE_NAME:$IMAGE_TAG

if [ $? -eq 0 ]; then
  echo "Image built: $IMAGE_NAME:$IMAGE_TAG"
else
  echo "Build failed"
  exit 1
fi


