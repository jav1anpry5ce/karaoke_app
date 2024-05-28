FROM node

WORKDIR /server

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV PORT=5005

EXPOSE 5005

CMD ["npm", "start"]