// Brand helpers
export const brand = {
  purple: "#6d28d9", // purple-700
  purpleSoft: "#a78bfa", // violet-300
  yellow: "#facc15", // yellow-400
  yellowDark: "#eab308", // yellow-500
  black: "#0a0a0a",
};

const rawBase = (import.meta.env && import.meta.env.BASE_URL) || "/";
const publicBase = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");
export const publicAsset = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${publicBase}${normalized}`;
};

const rawGalleryBase = (import.meta.env && import.meta.env.VITE_GALLERY_BASE_URL) || "/shows";
const galleryBase = (() => {
  if (/^https?:\/\//i.test(rawGalleryBase)) {
    return rawGalleryBase.replace(/\/$/, "");
  }
  const normalized = rawGalleryBase.startsWith("/") ? rawGalleryBase : `/${rawGalleryBase}`;
  return `${publicBase}${normalized}`.replace(/\/$/, "");
})();

export const galleryAsset = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${galleryBase}${normalized}`;
};

export const slugify = (value) => {
  if (!value) return "";
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
