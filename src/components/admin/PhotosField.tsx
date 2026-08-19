"use client";

import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/actions/upload";

type PhotosFieldProps = {
  name?: string;
  defaultValue: string;
};

export default function PhotosField({ name = "photos", defaultValue }: PhotosFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImageAction(formData);
    setUploading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }
    if (textareaRef.current) {
      const current = textareaRef.current.value.trim();
      textareaRef.current.value = current ? `${current}\n${result.url}` : result.url;
    }
  }

  return (
    <div>
      <div className="mt-3 flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
          Photos (one per line: url or url|caption)
        </label>
        <label className="cursor-pointer rounded-full bg-dtd-purple px-3 py-1 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark">
          Upload Photo
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFile} className="hidden" />
        </label>
      </div>
      <textarea
        ref={textareaRef}
        name={name}
        defaultValue={defaultValue}
        placeholder={"/images/example.jpg|Optional caption"}
        rows={2}
        className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 font-mono text-xs focus:border-dtd-purple focus:outline-none"
      />
      {uploading && <p className="mt-1 text-xs text-foreground/50">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
