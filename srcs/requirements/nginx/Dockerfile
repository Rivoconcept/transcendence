FROM nginx:1.25-alpine

RUN apk add --no-cache \
    curl \
    bash \
    openssl \
    ca-certificates

COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY ../../secrets/certs /etc/ssl/private

# Copier le build React depuis l'image frontend
COPY --from=frontend-build /app/build /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
