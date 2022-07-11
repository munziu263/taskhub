FROM node:16-alpine as build

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN chown -R $USER /frontend/node_modules

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /frontend

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /frontend/build ./build

RUN npm install -g serve

RUN serve -s build -l 3000