import StoryEditor from "../StoryEditor";
import { createStoryAction } from "../actions";

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">New Story</h1>
      <p className="mt-1 text-foreground/80">
        Add a new chapter history or news post to the Our Stories page.
      </p>
      <StoryEditor action={createStoryAction} />
    </div>
  );
}
