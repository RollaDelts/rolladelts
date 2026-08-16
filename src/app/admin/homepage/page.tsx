export const dynamic = "force-dynamic";

import { getSiteStats, getHomePillars, getGalleryPhotos } from "@/lib/db";
import HomepageEditor from "./HomepageEditor";

export default async function HomepageAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [stats, pillars, gallery] = await Promise.all([
    getSiteStats(),
    getHomePillars(),
    getGalleryPhotos(),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Homepage Content</h1>
      <p className="mt-1 text-foreground/80">
        The stats bar, &ldquo;Why Join&rdquo; pillars, and photo gallery shown on the homepage.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <HomepageEditor
        key={saved ?? "initial"}
        initialStats={stats}
        initialPillars={pillars}
        initialGallery={gallery}
      />
    </div>
  );
}
