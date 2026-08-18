/**
 * Resizes an image client-side before upload so a phone photo (often
 * several MB straight off a camera roll) doesn't slow down page loads.
 * Format is preserved (so PNG transparency survives) — only dimensions
 * shrink and, for lossy formats, quality is applied. Falls back to the
 * original file whenever compression doesn't clearly help or anything
 * goes wrong; this should never be the reason an upload fails.
 */
export async function compressImage(
  file: File,
  maxDimension = 1920,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const alreadySmall = scale === 1 && file.size <= 1.5 * 1024 * 1024;
    if (alreadySmall) {
      bitmap.close();
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, file.type, quality));
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], file.name, { type: file.type });
  } catch {
    return file;
  }
}
