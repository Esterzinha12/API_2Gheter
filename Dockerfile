FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN apk add --no-cache mysql mysql-client

RUN mkdir -p /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

EXPOSE 3000 3306

CMD sh -c "mysqld_safe & sleep 10 && node app.js"
