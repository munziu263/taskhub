FROM node:16-alpine as build

WORKDIR /frontend

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm run start