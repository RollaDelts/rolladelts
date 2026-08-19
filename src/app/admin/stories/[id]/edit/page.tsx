export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getStory } from "@/lib/db";
import StoryEditor from "../../StoryEditor";
import { updateStoryAction } from "../../actions";

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storyId = Number(id);
  if (!Number.isFinite(storyId)) notFound();

  const story = await getStory(storyId);
  if (!story) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Edit Story</h1>
      <p className="mt-1 text-foreground/80">{story.title}</p>
      <StoryEditor story={story} id={story.id} action={updateStoryAction} />
    </div>
  );
}
