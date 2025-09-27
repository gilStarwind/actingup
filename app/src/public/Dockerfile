# ===== build stage (Debian for better toolchain compat) =====
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --loglevel=verbose
COPY . .
# More RAM for big builds (CRA/Vite/Rollup/TS)
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN npm run build --verbose

# ===== run stage (serve static with nginx) =====
FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY src/public/nginx.conf /etc/nginx/conf.d/site.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
