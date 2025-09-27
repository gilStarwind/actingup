# Gallery Drop Zone

Place your production folders, `index.json`, and `photos.json` manifests in this directory **after** cloning the repo. The directory is ignored by Git so your photos stay on the deployment host.

Expected structure:

```
shows/
  index.json            # Array of show slugs (e.g. ["nemo","matilda"])
  nemo/
    photos.json         # Array of { "src": "nemo/pic1.jpg", "alt": "...", "caption": "..." }
    pic1.jpg
    pic2.jpg
  matilda/
    photos.json
    matilda1.jpg
```

All `src` values are resolved relative to this `shows/` folder. You can use absolute URLs if you prefer to host images elsewhere.

When running in Docker, the `shows/` directory is mounted into the Nginx container at `/usr/share/nginx/html/shows`.

Prefer to drive the gallery from a Google Sheet? Publish the sheet as CSV and set `VITE_GALLERY_SHEET_URL` in your Vite `.env`. The app will read rows from the sheet first and only touch this folder if the sheet is unavailable.
