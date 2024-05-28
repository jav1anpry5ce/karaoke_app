FROM node:alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install --omit-dev

COPY . .

RUN npm run build


FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]