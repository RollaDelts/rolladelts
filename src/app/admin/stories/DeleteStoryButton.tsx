"use client";

import { useTransition } from "react";
import { deleteStoryAction } from "./actions";

export default function DeleteStoryButton({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title || "this story"}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteStoryAction(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-semibold text-red-600 underline disabled:opacity-50"
    >
      Delete
    </button>
  );
}
