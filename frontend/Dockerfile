FROM node:16-alpine as build

WORKDIR /frontend

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY --from=build /frontend/build ./build

RUN npm install -g serve

RUN serve -s build -l 3000