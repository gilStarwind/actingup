import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import DOMPurify from "dompurify";
import { slugify, galleryAsset } from "../utils/helpers";
import { useLightbox } from "./useLightbox";

function parseGalleryRows(rows) {
  const metaMap = new Map();
  const warnings = [];
  rows.forEach((rawRow, index) => {
    if (!rawRow || typeof rawRow !== "object") return;
    const showLabelRaw = rawRow.label || rawRow.show || rawRow.production || rawRow.title || "";
    const slugSource = rawRow.slug || showLabelRaw || rawRow.folder || rawRow.album || "";
    const slug = slugify(slugSource);
    const srcCandidate = rawRow.src || rawRow.image || rawRow.photo || rawRow.url || "";
    if (!slug) {
      warnings.push(`Row ${index + 2}: Missing slug/show identifier.`);
      return;
    }
    if (!srcCandidate) {
      warnings.push(`Row ${index + 2}: Missing photo source for ${slug}.`);
      return;
    }
    const cleanSrc = srcCandidate.toString().trim();
    const cleanLabel = DOMPurify.sanitize(showLabelRaw ? showLabelRaw.toString().trim() : slug);
    const altText = DOMPurify.sanitize((rawRow.alt || rawRow.caption || cleanLabel || slug).toString().trim());
    const captionText = DOMPurify.sanitize((rawRow.caption || "").toString().trim());
    const showOrderVal = Number(rawRow.show_order ?? rawRow.collection_order ?? rawRow.order_show ?? "");
    const photoOrderVal = Number(rawRow.photo_order ?? rawRow.order ?? rawRow.order_photo ?? "");
    const meta = metaMap.get(slug) || {
      label: cleanLabel,
      showOrder: Number.isFinite(showOrderVal) ? showOrderVal : null,
      photos: [],
    };
    if (cleanLabel && cleanLabel !== meta.label) meta.label = cleanLabel;
    if (Number.isFinite(showOrderVal)) {
      if (!Number.isFinite(meta.showOrder) || showOrderVal < meta.showOrder) {
        meta.showOrder = showOrderVal;
      }
    }
    meta.photos.push({
      src: cleanSrc,
      alt: altText,
      caption: captionText,
      order: Number.isFinite(photoOrderVal) ? photoOrderVal : meta.photos.length,
    });
    metaMap.set(slug, meta);
  });

  const showsList = Array.from(metaMap.entries())
    .sort(([, a], [, b]) => {
      const aOrder = Number.isFinite(a.showOrder) ? a.showOrder : Number.POSITIVE_INFINITY;
      const bOrder = Number.isFinite(b.showOrder) ? b.showOrder : Number.POSITIVE_INFINITY;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.label.localeCompare(b.label);
    })
    .map(([slug]) => slug);

  const labelsRecord = {};
  const entriesRecord = {};
  metaMap.forEach((meta, slug) => {
    labelsRecord[slug] = meta.label || slug;
    entriesRecord[slug] = meta.photos
      .slice()
      .sort((a, b) => a.order - b.order)
      .map(({ order, ...photo }) => photo);
  });

  return {
    shows: showsList,
    labels: labelsRecord,
    entries: entriesRecord,
    warnings,
  };
}

async function loadSheetData(gallerySheetUrl) {
  const res = await fetch(gallerySheetUrl, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
  const text = await res.text();
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => (header ?? "").toString().trim().toLowerCase(),
    transform: (value) => (typeof value === "string" ? value.trim() : value),
  });
  const rows = Array.isArray(parsed.data)
    ? parsed.data.filter((row) => row && Object.values(row).some((val) => (val ?? "").toString().trim()))
    : [];
  if (!rows.length) throw new Error("Sheet contained no usable rows");
  const result = parseGalleryRows(rows);
  if (!result || !result.shows.length) throw new Error("Sheet contained no gallery items");

  const messageParts = [];
  if (parsed.errors?.length) messageParts.push(`${parsed.errors.length} parsing warning(s)`);
  if (result.warnings.length) messageParts.push(result.warnings.join(" • "));
  
  return {
    shows: result.shows,
    labels: result.labels,
    entries: result.entries,
    message: messageParts.length ? messageParts.join(" • ") : null,
  };
}

export function useGallery() {
  const { show: showParam } = useParams();
  const [shows, setShows] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lightboxIndex, openLightbox, closeLightbox, showNext, showPrev } = useLightbox(images.length);

  const gallerySheetUrl = (() => {
    const raw = import.meta.env?.VITE_GALLERY_SHEET_URL;
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed) return trimmed;
    }
    return null;
  })();
  const [sheetState, setSheetState] = useState(() => ({
    status: gallerySheetUrl ? "loading" : "disabled",
    shows: [],
    labels: {},
    entries: {},
    message: null,
  }));

  const labelFor = (slug) => {
    if (sheetState.labels?.[slug]) return sheetState.labels[slug];
    const map = {
      "nemo": "Finding Nemo Jr.",
      "matilda": "Matilda Jr.",
      "secret-garden": "The Secret Garden",
    };
    if (!slug) return "";
    return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  useEffect(() => {
    if (!gallerySheetUrl) {
      setSheetState((prev) =>
        prev.status === "disabled"
          ? prev
          : { status: "disabled", shows: [], labels: {}, entries: {}, message: null }
      );
      return;
    }
    let cancelled = false;
    async function load() {
      setSheetState((prev) => ({ ...prev, status: "loading", message: null }));
      try {
        const sheetData = await loadSheetData(gallerySheetUrl);
        if (!cancelled) {
          setSheetState({
            status: "ready",
            ...sheetData,
          });
          setShows(sheetData.shows);
        }
      } catch (err) {
        if (!cancelled) {
          setSheetState({
            status: "error",
            shows: [],
            labels: {},
            entries: {},
            message: err?.message || "Unable to load gallery sheet",
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [gallerySheetUrl]);

  useEffect(() => {
    if (sheetState.status === "ready") return;
    if (sheetState.status === "loading") return;
    let cancelled = false;
    async function loadIndex() {
      try {
        const res = await fetch(galleryAsset("/index.json"), { cache: "no-cache" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setShows(Array.isArray(data) ? data : []);
        } else if (!cancelled) {
          setShows([]);
        }
      } catch (err) {
        if (!cancelled) setShows([]);
      }
    }
    loadIndex();
    return () => {
      cancelled = true;
    };
  }, [sheetState.status]);

  const activeShow = showParam || (shows.length ? shows[0] : null);
  const photosPath = activeShow ? `/${activeShow}/photos.json` : null;
  const resolvedPhotosPath = photosPath ? galleryAsset(photosPath) : "";

  useEffect(() => {
    if (sheetState.status === "loading") {
      setLoading(true);
      return;
    }
    if (sheetState.status === "ready") {
      setImages(sheetState.entries[activeShow] || []);
      setLoading(false);
      setError(null);
      return;
    }
    if (!resolvedPhotosPath) {
      setImages([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function loadPhotos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(resolvedPhotosPath, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setImages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err?.message || "Failed to load photos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, [resolvedPhotosPath, sheetState.status, sheetState.entries, activeShow]);
  
  const activeLabel = activeShow ? labelFor(activeShow) : "Gallery";
  const featuredPhoto = images[0] || null;
  const featuredSrc = featuredPhoto ? galleryAsset(featuredPhoto.src || "") : "";
  const restPhotos = images.slice(1);
  const lightboxPhoto = lightboxIndex !== null ? images[lightboxIndex] : null;
  const lightboxSrc = lightboxPhoto ? galleryAsset(lightboxPhoto.src || "") : "";

  return {
    shows,
    images,
    loading,
    error,
    sheetState,
    labelFor,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    showNext,
    showPrev,
    lightboxPhoto,
    lightboxSrc,
    activeShow,
    activeLabel,
    featuredPhoto,
    featuredSrc,
    restPhotos,
    resolvedPhotosPath,
    photosPath,
  };
}
