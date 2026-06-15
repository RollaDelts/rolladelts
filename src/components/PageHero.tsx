type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-dtd-purple text-dtd-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-dtd-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
