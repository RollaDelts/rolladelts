"use server";

import { getServerClient } from "@/lib/supabase";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export type UploadResult = { url: string } | { error: string };

/**
 * Uploads an image to the "site-images" Supabase Storage bucket and
 * returns its public URL. Called directly from the ImageUploader client
 * component (not as a form action) so it can return the URL to the UI.
 */
export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file selected." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Please upload a JPEG, PNG, WebP, or GIF image." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 8MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `uploads/${crypto.randomUUID()}.${ext}`;

  const supabase = getServerClient();
  const { error } = await supabase.storage.from("site-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) return { error: error.message };

  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return { url: data.publicUrl };
}
