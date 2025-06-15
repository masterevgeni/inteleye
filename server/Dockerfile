FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SERVER_PORT}
# CMD ["npm", "run", "start:dev"]
CMD npm run migration:run && node dist/main.js
