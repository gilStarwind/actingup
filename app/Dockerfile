# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# for Vite/CRA/etc.; adjust as needed
RUN npm run build

# --- run stage ---
FROM nginx:alpine
# remove default config to keep 404s clean
RUN rm -f /etc/nginx/conf.d/default.conf
# simple gzip + cache control
RUN printf 'server { \
  listen 8080; \
  server_name _; \
  gzip on; \
  gzip_types text/plain text/css application/javascript application/json image/svg+xml; \
  add_header Cache-Control "public, max-age=31536000, immutable" always; \
  location / { \
    root /usr/share/nginx/html; \
    try_files $uri /index.html; \
  } \
}\n' > /etc/nginx/conf.d/site.conf
# copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080