# ===== build stage (Debian for better toolchain compat) =====
FROM node:20-bookworm-slim AS build
ARG VITE_SCHEDULE_CSV_URL
ARG VITE_GALLERY_SHEET_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci --loglevel=verbose
COPY . .
# More RAM for big builds (CRA/Vite/Rollup/TS)
ENV NODE_OPTIONS=--max-old-space-size=3072
ENV VITE_SCHEDULE_CSV_URL=${VITE_SCHEDULE_CSV_URL}
ENV VITE_GALLERY_SHEET_URL=${VITE_GALLERY_SHEET_URL}
RUN npm run build --verbose

# ===== run stage (serve static with nginx) =====
FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY src/public/nginx.conf /etc/nginx/conf.d/site.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
