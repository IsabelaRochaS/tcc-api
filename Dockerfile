FROM node:16.16.0-alpine3.16

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./
RUN npm ci
RUN rm .npmrc

COPY . .

CMD node ./dist/main.js