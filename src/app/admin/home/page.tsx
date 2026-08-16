export const dynamic = "force-dynamic";

import { getHomeSettings, getSiteStats, getHomePillars, getGalleryPhotos, getPillarPhotos } from "@/lib/db";
import HomeEditor from "./HomeEditor";

export default async function HomeAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [settings, stats, pillars, gallery, pillarPhotos] = await Promise.all([
    getHomeSettings(),
    getSiteStats(),
    getHomePillars(),
    getGalleryPhotos(),
    getPillarPhotos(),
  ]);
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtd-purple">Home Page Updates</h1>
      <p className="mt-1 text-foreground/80">
        Everything editable on the homepage: the hero photo, stats bar, &ldquo;Why Join&rdquo;
        pillars, and photo gallery.
      </p>

      {saved === "1" && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Changes saved.
        </div>
      )}

      <HomeEditor
        key={saved ?? "initial"}
        initialSettings={settings}
        initialStats={stats}
        initialPillars={pillars}
        initialGallery={gallery}
        initialPillarPhotos={pillarPhotos}
      />
    </div>
  );
}
