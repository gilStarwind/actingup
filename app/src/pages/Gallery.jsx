import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { galleryAsset } from "../utils/helpers";
import Shell from "../components/Shell";
import { useGallery } from "../hooks/useGallery";

const GalleryHeader = ({ imageCount }) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
      <p className="mt-2 text-base text-neutral-300 max-w-xl">
        Browse highlights from recent productions. Tap a photo to open it full-screen and use your arrow keys to keep exploring.
      </p>
    </div>
    {imageCount > 0 && (
      <span className="text-sm uppercase tracking-widest text-neutral-400">
        {imageCount} {imageCount === 1 ? "photo" : "photos"}
      </span>
    )}
  </div>
);

const ShowNavigation = ({ shows, activeLabel, labelFor }) => (
  <div className="mt-6 rounded-2xl border border-neutral-800/80 bg-neutral-950/50 p-4">
    <div className="flex items-center justify-between gap-4">
      <div>
        <span className="text-sm uppercase tracking-wide text-neutral-400">Productions</span>
        <h3 className="text-lg font-semibold text-neutral-100">{activeLabel}</h3>
      </div>
      <Link
        to="/classes"
        className="hidden sm:inline-flex items-center rounded-full border border-neutral-800 px-3 py-1 text-sm font-medium text-neutral-300 hover:text-white/90"
      >
        View programs
      </Link>
    </div>
    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
      {shows.map((slug) => (
        <NavLink
          key={slug}
          to={`/gallery/${slug}`}
          className={({ isActive }) =>
            `group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? "border-violet-500/60 bg-violet-500/10 text-white"
                : "border-neutral-700/70 text-neutral-300 hover:border-neutral-500 hover:text-white"
            }`
          }
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-current opacity-60" aria-hidden="true" />
          {labelFor(slug)}
        </NavLink>
      ))}
      {!shows.length && (
        <span className="rounded-full border border-dashed border-neutral-700 px-4 py-2 text-base text-neutral-300">
          No shows found. Add `shows/index.json` to your gallery folder.
        </span>
      )}
    </div>
  </div>
);

const GalleryGrid = ({ images, openLightbox, activeLabel }) => {
  const featuredPhoto = images[0] || null;
  const restPhotos = images.slice(1);
  const featuredSrc = featuredPhoto ? galleryAsset(featuredPhoto.src || "") : "";
  
  return (
    <>
      {featuredPhoto && featuredSrc && (
        <motion.figure
          layout
          className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-950/60 shadow-2xl"
        >
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group block h-full w-full text-left focus:outline-none"
          >
            <img
              src={featuredSrc}
              alt={featuredPhoto.alt || featuredPhoto.caption || `${activeLabel} highlight`}
              loading="lazy"
              className="h-[20rem] w-full object-cover sm:h-[28rem] transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
              <div>
                <p className="text-sm uppercase tracking-widest text-white/70">Featured moment</p>
                <p className="text-lg font-semibold text-white drop-shadow">
                  {featuredPhoto.caption || featuredPhoto.alt || activeLabel}
                </p>
              </div>
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
                View full-screen
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5 5h4a1 1 0 100-2H4a1 1 0 00-1 1v5a1 1 0 102 0V5zM11 17h5a1 1 0 001-1v-5a1 1 0 10-2 0v4h-4a1 1 0 100 2z" />
                </svg>
              </span>
            </div>
          </button>
        </motion.figure>
      )}

      {restPhotos.length > 0 && (
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {restPhotos.map((photo, index) => {
            const photoIndex = index + 1;
            const rawSrc = photo?.src || "";
            const resolvedSrc = galleryAsset(rawSrc);
            if (!resolvedSrc) return null;
            return (
              <motion.figure
                key={`${rawSrc}-${photoIndex}`}
                layout
                className="group relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/60"
                style={{ breakInside: "avoid" }}
                whileHover={{ y: -2 }}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(photoIndex)}
                  className="block w-full text-left focus:outline-none"
                  aria-label={`Open photo ${photoIndex + 1} from ${activeLabel}`}
                >
                  <img
                    src={resolvedSrc}
                    alt={photo?.alt || photo?.caption || `${activeLabel} photo ${photoIndex + 1}`}
                    loading="lazy"
                    className="w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                    <p className="text-sm uppercase tracking-wide text-white/70">Tap to enlarge</p>
                    {photo?.caption && (
                      <p className="mt-1 text-base font-medium text-white">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </button>
              </motion.figure>
            );
          })}
        </div>
      )}
    </>
  );
};

const Lightbox = ({ photo, src, activeLabel, images, close, showNext, showPrev }) => (
  <motion.div
    key="lightbox"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={close}
  >
    <motion.div
      className="relative mx-4 flex max-h-[90vh] w-full max-w-5xl items-center justify-center"
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={(event) => event.stopPropagation()}
    >
      <img
        src={src}
        alt={photo.alt || photo.caption || `${activeLabel} photo`}
        className="max-h-[90vh] w-auto rounded-3xl border border-neutral-800/80 bg-neutral-950 object-contain"
      />
      <button
        type="button"
        onClick={close}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90"
        aria-label="Close photo"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Previous photo"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Next photo"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </>
      )}
      {(photo.caption || photo.alt) && (
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/70 px-4 py-3 text-base text-white backdrop-blur">
          {photo.caption || photo.alt}
        </div>
      )}
    </motion.div>
  </motion.div>
);

export default function Gallery() {
  const {
    shows,
    images,
    loading,
    error,
    sheetState,
    labelFor,
    openLightbox,
    closeLightbox,
    lightboxPhoto,
    lightboxSrc,
    activeShow,
    activeLabel,
    showNext,
    showPrev,
    resolvedPhotosPath,
    photosPath,
  } = useGallery();
  
  return (
    <Shell>
      <GalleryHeader imageCount={images.length} />

      {sheetState.status === "ready" && (
        <div className="mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm text-violet-100">
          Gallery data is syncing from the connected Google Sheet. {sheetState.message ? `(${sheetState.message})` : "Update the sheet to refresh this page."}
        </div>
      )}
      {sheetState.status === "error" && sheetState.message && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Google Sheet unavailable ({sheetState.message}). Showing the last uploaded gallery files instead.
        </div>
      )}

      <ShowNavigation shows={shows} activeLabel={activeLabel} labelFor={labelFor} />

      <div className="mt-8 space-y-6">
        {loading && <div className="text-base text-neutral-300">Loading photos…</div>}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-base text-red-100">
            Could not load <code>{resolvedPhotosPath || photosPath || "(unknown path)"}</code> ({error})
          </div>
        )}
        {!loading && !error && activeShow && (
          images.length ? (
            <GalleryGrid images={images} openLightbox={openLightbox} activeLabel={activeLabel} />
          ) : (
            <div className="rounded-xl border border-neutral-800/70 bg-neutral-950/60 px-4 py-6 text-base text-neutral-300">
              No photos posted yet for this show.
            </div>
          )
        )}
      </div>

      <AnimatePresence>
        {lightboxPhoto && lightboxSrc && (
          <Lightbox
            photo={lightboxPhoto}
            src={lightboxSrc}
            activeLabel={activeLabel}
            images={images}
            close={closeLightbox}
            showNext={showNext}
            showPrev={showPrev}
          />
        )}
      </AnimatePresence>
    </Shell>
  );
}
