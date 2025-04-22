FROM node:22-bullseye

WORKDIR /app

COPY dist/ /app/dist/

COPY package.json /app/

COPY run_fe.sh /app/

RUN chmod +x run_fe.sh
RUN npm install
RUN apt update
RUN apt install nano -y
