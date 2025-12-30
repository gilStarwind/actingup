import { useState, useCallback, useEffect } from 'react';

export function useLightbox(imageCount) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    if (index < 0 || index >= imageCount) return;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || !imageCount) return prev;
      return (prev + 1) % imageCount;
    });
  }, [imageCount]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null || !imageCount) return prev;
      return (prev - 1 + imageCount) % imageCount;
    });
  }, [imageCount]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  return {
    lightboxIndex,
    openLightbox,
    closeLightbox,
    showNext,
    showPrev,
  };
}
