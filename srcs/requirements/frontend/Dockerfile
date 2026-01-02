FROM node:22-alpine AS react-build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copier tout le reste
COPY . ./

# Build production
RUN npm run build

# Stage Nginx
FROM nginx:1.25-alpine
RUN apk add --no-cache bash curl openssl ca-certificates
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
