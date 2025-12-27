FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Si tu n’as pas encore React, tu peux servir une page statique avec vite preview ou http-server
CMD ["npx", "http-server", "public", "-p", "3000"]
