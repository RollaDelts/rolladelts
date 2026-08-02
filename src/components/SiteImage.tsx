import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  aspect?: string; // tailwind aspect-ratio class, e.g. "aspect-video"
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** "cover" fills and crops (default); "contain" letterboxes to show the whole image. */
  fit?: "cover" | "contain";
};

export default function SiteImage({
  src,
  alt,
  aspect = "aspect-video",
  className = "",
  sizes = "(min-width: 1024px) 500px, 100vw",
  priority = false,
  fit = "cover",
}: SiteImageProps) {
  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
