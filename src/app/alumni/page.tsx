import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getAlumniSpotlights } from "@/lib/db";
import type { AlumniSpotlight } from "@/data/defaults";

function parsePhotos(photos: string): { src: string; caption?: string }[] {
  return photos
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src, caption] = line.split("|");
      return { src: src.trim(), caption: caption?.trim() };
    });
}

function parseBio(bio: string): string[] {
  return bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function AlumniEntry({ alum }: { alum: AlumniSpotlight }) {
  const photos = parsePhotos(alum.photos);
  const paragraphs = parseBio(alum.bio);

  return (
    <div className="grid gap-8 border-t border-dtd-purple/10 py-12 md:grid-cols-[240px_1fr]">
      <div className="flex flex-col gap-3">
        {photos.map((photo, i) => (
          <figure key={i}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-dtd-purple/10 bg-dtd-cream">
              <Image
                src={photo.src}
                alt={photo.caption ?? alum.name}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            {photo.caption && (
              <figcaption className="mt-1 text-xs text-foreground/60">{photo.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold uppercase text-dtd-purple">{alum.name}</h2>
        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-dtd-gold-dark">
          {alum.pledgeClass} &middot; {alum.years}
        </p>
        <div className="mt-4 space-y-4 text-sm text-foreground/80">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AlumniPage() {
  const spotlights = await getAlumniSpotlights();

  return (
    <div>
      <PageHero
        title="Alumni Spotlights"
        subtitle="Delta Tau Delta is a brotherhood for life. Here's a look at where some of our alumni have gone since Rolla."
      />

      <section className="mx-auto max-w-4xl px-4 py-4">
        {spotlights.map((alum) => (
          <AlumniEntry key={alum.name} alum={alum} />
        ))}
      </section>

      <section className="bg-dtd-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-dtd-purple">Know a Delt We Should Feature?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-foreground/80">
            If you&apos;re an Epsilon Nu alum with a story to share, or want to nominate a
            brother for a future spotlight, reach out.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded-full bg-dtd-purple px-8 py-3 text-sm font-bold uppercase tracking-wide text-dtd-white transition hover:bg-dtd-purple-dark"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
