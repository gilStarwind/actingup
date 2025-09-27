# Deployment Gallery Folder

Copy your production photo folders and JSON manifests into this directory **on the host** before starting Docker. The `docker-compose.yml` file mounts it into the running Nginx container at `/usr/share/nginx/html/shows`, which is where the React app looks for gallery assets.

You can keep this folder outside of Git (it's ignored) and even relocate it elsewhere—set the absolute path with `GALLERY_PATH=/some/absolute/path` in an `.env` file next to `infra/docker-compose.yml` when deploying on the Pi.

If you instead publish the gallery rows from a Google Sheet (`VITE_GALLERY_SHEET_URL`), the app will prefer that remote data and fall back to this mounted folder when needed.
