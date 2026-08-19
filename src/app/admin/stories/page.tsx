export const dynamic = "force-dynamic";

import Link from "next/link";
import { getStories } from "@/lib/db";
import { getLastAdminEdit } from "@/lib/adminAudit";
import LastEditedBy from "@/components/admin/LastEditedBy";
import DeleteStoryButton from "./DeleteStoryButton";

export default async function StoriesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [stories, lastEdit] = await Promise.all([getStories(), getLastAdminEdit("stories")]);
  const { saved } = await searchParams;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-dtd-purple">Our Stories</h1>
        <Link
          href="/admin/stories/new"
          className="rounded-full bg-dtd-purple px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
        >
          + New Story
        </Link>
      </div>
      <p className="mt-1 text-foreground/80">
        Chapter history and news posts shown on the Our Stories page. Each story is saved on its
        own — no need to touch the others when adding or editing one.
      </p>
      <LastEditedBy info={lastEdit} />

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-dtd-purple/10 text-xs font-semibold uppercase tracking-wide text-foreground/50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {stories.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-foreground/60">
                  No stories yet. Click &ldquo;+ New Story&rdquo; to add the first one.
                </td>
              </tr>
            )}
            {stories.map((story) => (
              <tr key={story.id} className="border-b border-dtd-purple/5 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{story.title || "(untitled)"}</td>
                <td className="px-4 py-3 text-foreground/70">
                  {story.publishedDate
                    ? new Date(story.publishedDate + "T00:00:00").toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })
                    : ""}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/stories/${story.id}/edit`}
                      className="text-xs font-semibold text-dtd-purple underline"
                    >
                      Edit
                    </Link>
                    <DeleteStoryButton id={story.id} title={story.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
