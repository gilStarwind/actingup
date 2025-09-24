# Deployment Schedule Folder

Drop `index.csv` (and optional backup files) here on the server. `infra/docker-compose.yml` mounts this directory into the container at `/usr/share/nginx/html/class-schedule` so the React app can fetch the latest class listings without rebuilding.

- Required headers: `status,title,description,days,times,gender,ages,openings,starts,ends,session,tuition,fees`.
- Populate one row per class. See `app/public/class-schedule/index.sample.csv` for an example you can open in Excel/Sheets.
- The site auto-refreshes from this CSV; no JSON conversion needed. Keep the file encoded as UTF-8.
