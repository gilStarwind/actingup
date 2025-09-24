# Acting Up Website (React)

The Vite + React app lives inside the `app/` directory. Run all npm commands from there (or use the `--prefix app` flag) so npm can see the `package.json` file.

Quick start:

```bash
cd app
npm install
npm run dev
```

Then open http://localhost:5173

Useful variants:
- `npm --prefix app install` runs installs without changing directories.
- `npm --prefix app run build` produces the static bundle in `app/dist` for Docker to serve.

Notes:
- The GitHub workflow and Dockerfile already use `./app` as the build context.
- If you want TailwindCSS or other tooling added, let me know.

## Photo gallery storage

- Drop your gallery assets (JSON manifests + images) into `app/public/shows/` while developing locally. That folder is ignored by Git so large media files stay out of history.
- For deployments, use the top-level `gallery/` directory (also ignored). `infra/docker-compose.yml` mounts it into the Nginx container at `/usr/share/nginx/html/shows`, matching what the React app expects at runtime.
- Each show has an entry in `index.json` (an array of slugs) and its own `<slug>/photos.json` file describing images:

  ```json
  [
    {
      "src": "matilda/matilda-1.jpg",
      "alt": "Curtain call",
      "caption": "Matilda Jr. closing night"
    }
  ]
  ```

- Photo `src` values are resolved relative to the gallery root. Absolute URLs (e.g. pointing to an S3 bucket) are also supported.
- Need to serve the gallery from a different origin? Set `VITE_GALLERY_BASE_URL` before building (for example `VITE_GALLERY_BASE_URL=https://photos.example.com`).

### Deploying on the Raspberry Pi

1. SSH into the Pi and create a folder for photos, e.g. `/opt/actingup/gallery`.
2. Sync your `index.json`, `photos.json`, and image files into that folder (you can use `rsync`, SCP, or drag-and-drop if you have Samba).
3. In `infra/`, create an `.env` file with `GALLERY_PATH=/opt/actingup/gallery` so Docker mounts the right folder.
4. Run `docker compose up -d` from `infra/` to restart the site. The container will serve images directly from the host folder without rebuilding the image.
5. Any time you add or remove photos, update the manifests and refresh the browser—no redeploy needed.

## Class schedule updates

- The Classes page now prefers a CSV at `class-schedule/index.csv`. During local development, point Excel/Sheets exports to `app/public/class-schedule/index.csv`; Git ignores that folder so you can iterate safely. Use `index.sample.csv` in the same directory as your template.
- Expected headers (all lowercase): `status,title,description,days,times,gender,ages,openings,starts,ends,session,tuition,fees`. Additional columns are ignored.
- The app still accepts `class-schedule/index.json` as a backup format. If neither CSV nor JSON are present, it falls back to the bundled sample data so the page always renders.
- On the Pi, populate the top-level `class-schedule/` directory (mounted to `/usr/share/nginx/html/class-schedule` by docker-compose). Drop your `index.csv` there without rebuilding the container. Override the location with `CLASS_SCHEDULE_PATH=/absolute/path/to/schedule` in `infra/.env` if needed.
- Bonus helper: visit `/tools/schedule-helper` in the running site to upload a CSV, preview the parsed rows, and download a JSON copy for spot checks.
