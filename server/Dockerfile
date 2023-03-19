FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5005

EXPOSE 5005

CMD ["npm", "start"]