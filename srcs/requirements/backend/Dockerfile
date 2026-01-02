FROM node:22-alpine

WORKDIR /usr/src/app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./
RUN npm ci

# Copier le reste du backend
COPY . .

# Installer ts-node globalement si nécessaire
RUN npm install -g ts-node typescript

# Lancer le backend avec ts-node
CMD ["ts-node", "app.ts"]
