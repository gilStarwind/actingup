# Class Schedule Drop Zone

Save an `index.csv` file in this folder to override the bundled fallback schedule. The file is ignored by Git so you can update it locally or on the deployment host without touching the React code.

Required headers:

```
status,title,description,days,times,gender,ages,openings,starts,ends,session,tuition,fees
```

Each row represents one class. You can edit the CSV with Excel, Google Sheets, or Numbers—just make sure it is exported as UTF‑8. Use `index.sample.csv` as a template (a legacy `index.sample.json` is available if you prefer JSON). Reload the site after saving to see the changes.
