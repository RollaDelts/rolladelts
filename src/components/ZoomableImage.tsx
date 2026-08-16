"use client";

import { useEffect, useState } from "react";
import SiteImage from "@/components/SiteImage";

export default function ZoomableImage({
  src,
  alt,
  aspect,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger image: ${alt}`}
        className="block w-full cursor-zoom-in"
      >
        <SiteImage src={src} alt={alt} aspect={aspect} sizes={sizes} className={className} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- full-size lightbox view, not a fixed-aspect layout image */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
