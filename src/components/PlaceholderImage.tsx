type PlaceholderImageProps = {
  label: string;
  suggestion: string;
  aspect?: string; // tailwind aspect-ratio class, e.g. "aspect-video"
  className?: string;
};

/**
 * Visual stand-in for a real photo. Shows what should go here so it's
 * easy to spot and swap out once real chapter photos are available.
 */
export default function PlaceholderImage({
  label,
  suggestion,
  aspect = "aspect-video",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex ${aspect} w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-dtd-purple/30 bg-dtd-cream p-6 text-center ${className}`}
    >
      <span className="text-3xl" aria-hidden>
        🖼️
      </span>
      <span className="font-semibold text-dtd-purple">{label}</span>
      <span className="text-sm text-foreground/60">{suggestion}</span>
    </div>
  );
}
