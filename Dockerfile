FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3030

CMD ["npm", "start"]

