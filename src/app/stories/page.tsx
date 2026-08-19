import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import StoriesGrid from "./StoriesGrid";
import { getStories } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Stories",
  description: "Chapter history and news from Delta Tau Delta's Epsilon Nu Chapter at Missouri S&T.",
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <div>
      <PageHero
        title="Our Stories"
        subtitle="A look back at Epsilon Nu's history — chapter news, milestones, and memories from over the years."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        {stories.length === 0 ? (
          <p className="text-foreground/70">Check back soon for chapter stories.</p>
        ) : (
          <StoriesGrid stories={stories} />
        )}
      </section>
    </div>
  );
}
