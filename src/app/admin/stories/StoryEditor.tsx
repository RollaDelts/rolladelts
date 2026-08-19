"use client";

import PhotosField from "@/components/admin/PhotosField";
import type { Story } from "@/data/defaults";

const blank: Story = { slug: "", title: "", publishedDate: "", author: "", body: "", photos: "" };

type StoryEditorProps = {
  story?: Story;
  id?: number;
  action: (formData: FormData) => void | Promise<void>;
};

export default function StoryEditor({ story = blank, id, action }: StoryEditorProps) {
  return (
    <form action={action} className="mt-8 grid gap-4 rounded-xl border border-dtd-purple/10 bg-white p-6 shadow-sm">
      {id !== undefined && <input type="hidden" name="id" value={id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">Title</label>
          <input
            name="title"
            defaultValue={story.title}
            placeholder="Story title"
            required
            className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">Date</label>
          <input
            type="date"
            name="publishedDate"
            defaultValue={story.publishedDate}
            className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">Author (optional)</label>
        <input
          name="author"
          defaultValue={story.author}
          placeholder="Author name"
          className="mt-1 w-full max-w-sm rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
        />
      </div>

      <PhotosField defaultValue={story.photos} />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-foreground/50">
          Story (paragraphs separated by a blank line)
        </label>
        <textarea
          name="body"
          defaultValue={story.body}
          placeholder="Tell the story…"
          rows={14}
          className="mt-1 w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none"
        />
      </div>

      <div className="mt-2 flex items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-dtd-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
        >
          {id !== undefined ? "Save Changes" : "Publish Story"}
        </button>
        <a href="/admin/stories" className="text-xs font-semibold text-dtd-purple underline">
          Cancel
        </a>
      </div>
    </form>
  );
}
