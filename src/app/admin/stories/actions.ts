"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createStory, updateStory, deleteStory } from "@/lib/db";
import { recordAdminEdit } from "@/lib/adminAudit";
import type { Story } from "@/data/defaults";

function readStory(formData: FormData): Story {
  return {
    slug: "",
    title: (formData.get("title") as string ?? "").trim(),
    publishedDate: (formData.get("publishedDate") as string ?? "").trim(),
    author: (formData.get("author") as string ?? "").trim(),
    body: (formData.get("body") as string ?? "").trim(),
    photos: (formData.get("photos") as string ?? "").trim(),
  };
}

export async function createStoryAction(formData: FormData) {
  await createStory(readStory(formData));
  await recordAdminEdit("stories");
  revalidatePath("/stories");
  revalidatePath("/admin/stories");
  redirect("/admin/stories?saved=1");
}

export async function updateStoryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await updateStory(id, readStory(formData));
  await recordAdminEdit("stories");
  revalidatePath("/stories");
  revalidatePath("/admin/stories");
  redirect("/admin/stories?saved=1");
}

export async function deleteStoryAction(id: number) {
  await deleteStory(id);
  await recordAdminEdit("stories");
  revalidatePath("/stories");
  revalidatePath("/admin/stories");
}
