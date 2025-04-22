#!/bin/bash

docker stop $(docker ps -a -q)
docker rm $(docker ps -qa --filter status=exited )
docker rmi $(docker images -f dangling=true -q)
docker volume rm $(docker volume ls -f dangling=true -q)

# Run the project
# docker-compose -f .docker/docker-compose.yml up --build
docker-compose --env-file .docker/.env -f .docker/docker-compose.yml up -d