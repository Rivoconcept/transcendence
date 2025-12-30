FROM node:22-alpine AS react-build

WORKDIR /app

COPY ../frontend/package*.json ./

RUN npm ci

COPY ../frontend ./

RUN npm run build


FROM nginx:1.25-alpine

RUN apk add --no-cache \
    curl \
    bash \
    openssl \
    ca-certificates


COPY conf/default.conf /etc/nginx/conf.d/default.conf

COPY ../../secrets/certs /etc/ssl/private

COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

