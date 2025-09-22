# ---- Build Vite ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Nginx runtime ----
FROM nginx:1.27-alpine
# Copy built static files
COPY --from=build /app/dist /usr/share/nginx/html
# Healthcheck (optional)
HEALTHCHECK CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1