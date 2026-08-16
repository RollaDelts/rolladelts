"use client";

import { useState } from "react";
import { uploadImageAction } from "@/app/admin/actions/upload";

type ImageUploaderProps = {
  /** Name of the hidden input that carries the resulting URL in the parent form. */
  name: string;
  defaultValue?: string;
  label?: string;
  aspect?: string; // tailwind aspect-ratio class for the preview box
};

export default function ImageUploader({
  name,
  defaultValue = "",
  label,
  aspect = "aspect-video",
}: ImageUploaderProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);

      if ("error" in result) {
        setError(result.error);
        return;
      }
      setUrl(result.url);
    } catch {
      setError("Upload failed — the image may be too large or the connection dropped. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && (
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-foreground/50">
          {label}
        </span>
      )}
      <input type="hidden" name={name} value={url} />

      {url ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin-only preview, not the public site
        <img
          src={url}
          alt=""
          className={`w-full max-w-xs rounded border border-dtd-purple/20 bg-dtd-cream object-cover ${aspect}`}
        />
      ) : (
        <div
          className={`flex w-full max-w-xs items-center justify-center rounded border-2 border-dashed border-dtd-purple/20 bg-dtd-cream text-xs text-foreground/50 ${aspect}`}
        >
          No image
        </div>
      )}

      <label className="mt-2 inline-block cursor-pointer rounded-full bg-dtd-purple px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark">
        {url ? "Replace Image" : "Upload Image"}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFile} className="hidden" />
      </label>

      {uploading && <p className="mt-1 text-xs text-foreground/50">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
