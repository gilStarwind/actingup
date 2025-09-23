# build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# run
FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
RUN printf 'server { \
  listen 8080; \
  server_name _; \
  gzip on; \
  gzip_types text/plain text/css application/javascript application/json image/svg+xml; \
  add_header Cache-Control "public, max-age=31536000, immutable" always; \
  location / { root /usr/share/nginx/html; try_files $uri /index.html; } \
}\n' > /etc/nginx/conf.d/site.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080