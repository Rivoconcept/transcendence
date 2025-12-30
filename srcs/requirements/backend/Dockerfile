FROM node:22.20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache nano bash git

COPY package*.json tsconfig.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npx", "ts-node", "app.ts"]
