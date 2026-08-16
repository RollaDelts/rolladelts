"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  saveHomeSettings,
  saveSiteStats,
  saveHomePillars,
  saveGalleryPhotos,
  savePillarPhotos,
} from "@/lib/db";
import type { HomeSettings, SiteStat, HomePillar, GalleryPhoto, PillarPhoto } from "@/data/defaults";

export async function saveHomePageAction(formData: FormData) {
  const settings: HomeSettings = {
    heroImageUrl: ((formData.get("heroImageUrl") as string | null) ?? "").trim(),
  };

  const statLabels = formData.getAll("statLabel") as string[];
  const statValues = formData.getAll("statValue") as string[];
  const stats: SiteStat[] = statLabels
    .map((label, i) => ({ label: label.trim(), value: (statValues[i] ?? "").trim() }))
    .filter((s) => s.label.length > 0);

  const pillarTitles = formData.getAll("pillarTitle") as string[];
  const pillarDescriptions = formData.getAll("pillarDescription") as string[];
  const pillars: HomePillar[] = pillarTitles
    .map((title, i) => ({ title: title.trim(), description: (pillarDescriptions[i] ?? "").trim() }))
    .filter((p) => p.title.length > 0);

  const galleryUrls = formData.getAll("galleryImageUrl") as string[];
  const galleryAlts = formData.getAll("galleryAlt") as string[];
  const galleryFits = formData.getAll("galleryFit") as string[];
  const gallery: GalleryPhoto[] = galleryUrls
    .map((imageUrl, i) => ({
      imageUrl: imageUrl.trim(),
      alt: (galleryAlts[i] ?? "").trim(),
      fit: galleryFits[i] === "contain" ? ("contain" as const) : ("cover" as const),
    }))
    .filter((g) => g.imageUrl.length > 0);

  const pillarPhotoUrls = formData.getAll("pillarPhotoImageUrl") as string[];
  const pillarPhotoCaptions = formData.getAll("pillarPhotoCaption") as string[];
  const pillarPhotos: PillarPhoto[] = pillarPhotoUrls
    .map((imageUrl, i) => ({ imageUrl: imageUrl.trim(), caption: (pillarPhotoCaptions[i] ?? "").trim() }))
    .filter((p) => p.imageUrl.length > 0);

  await saveHomeSettings(settings);
  await saveSiteStats(stats);
  await saveHomePillars(pillars);
  await saveGalleryPhotos(gallery);
  await savePillarPhotos(pillarPhotos);

  revalidatePath("/");
  revalidatePath("/admin/home");
  redirect("/admin/home?saved=1");
}
