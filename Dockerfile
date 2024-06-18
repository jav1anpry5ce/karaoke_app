FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install --omit-dev

COPY . .

ARG REACT_APP_URL
ARG REACT_APP_FRONTEND_URL

ENV REACT_APP_URL=$REACT_APP_URL
ENV REACT_APP_FRONTEND_URL=$REACT_APP_FRONTEND_URL

RUN npm run build


FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]