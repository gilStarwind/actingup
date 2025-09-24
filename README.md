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
