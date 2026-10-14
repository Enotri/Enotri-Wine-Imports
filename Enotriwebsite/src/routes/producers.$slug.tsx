import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { producerSlug, producers, wines } from "@/lib/portfolio";
import { CtaBand, Section } from "@/components/page-parts";
import { ProducerFilm } from "@/components/producer-film";

export const Route = createFileRoute("/producers/$slug")({
  loader: ({ params }) => {
    const producer = producers.find((p) => producerSlug(p.name) === params.slug);
    if (!producer) throw notFound();
    return producer;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Producer — Enotri Wine Imports" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — ${loaderData.region}, ${loaderData.country} | Enotri Wine Imports`;
    const description = loaderData.summary;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProducerDetail,
  notFoundComponent: ProducerNotFound,
});

function ProducerDetail() {
  const producer = Route.useLoaderData();
  const theirWines = wines.filter((w) => w.producer === producer.name);

  return (
    <>
      {producer.heroImage && (
        <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden border-b border-border">
          <img
            src={producer.heroImage.src}
            alt={producer.heroImage.alt}
            loading="eager"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 text-white md:pb-16">
            <p className="text-sm text-white/80">
              <Link to="/producers" className="hover:underline">
                Producers
              </Link>
              <span className="mx-3">/</span>
              {producer.region}, {producer.country}
            </p>
            <h1 className="mt-3 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{producer.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {producer.summary}
            </p>
          </div>
        </section>
      )}
      {!producer.heroImage && (
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <p className="eyebrow">
              <Link to="/producers" className="transition-colors hover:text-primary">
                Producers
              </Link>
              <span className="mx-3 text-muted-foreground">/</span>
              {producer.region}, {producer.country}
            </p>
            {producer.logo && (
              <img
                src={producer.logo}
                alt={`${producer.name} logo`}
                className="mt-8 h-20 w-auto rounded-sm object-contain"
              />
            )}
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">{producer.name}</h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {producer.summary}
            </p>
          </div>
        </section>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="prose-enotri max-w-2xl">
            <p className="eyebrow mb-6">The Story</p>
            {producer.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="space-y-8">
            <aside className="h-fit border border-border bg-secondary/40 p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">At a glance</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Region
                  </dt>
                  <dd className="mt-1">
                    {producer.region}, {producer.country}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    Farming
                  </dt>
                  <dd className="mt-1">{producer.farming}</dd>
                </div>
                {theirWines.length > 0 && (
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Wines in portfolio
                    </dt>
                    <dd className="mt-1">{theirWines.length}</dd>
                  </div>
                )}
              </dl>
            </aside>
            {producer.film && <ProducerFilm film={producer.film} />}
          </div>
        </div>
      </Section>

      {producer.gallery && producer.gallery.length > 0 && (
        <Section>
          <p className="eyebrow">At the estate</p>
          <h2 className="mt-4 text-3xl md:text-4xl">{producer.name} in pictures</h2>
          {(() => {
            const groups: {
              name?: string | undefined;
              photos: NonNullable<typeof producer.gallery>;
            }[] = [];
            for (const photo of producer.gallery) {
              const last = groups[groups.length - 1];
              if (last && last.name === photo.group) last.photos.push(photo);
              else groups.push({ name: photo.group, photos: [photo] });
            }
            return groups.map((g) => (
              <div key={g.name ?? "all"} className="mt-12">
                {g.name && <h3 className="text-xl md:text-2xl">{g.name}</h3>}
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {g.photos.map((photo) => (
                    <figure key={photo.src}>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="aspect-[3/2] w-full rounded-md object-cover shadow-soft"
                      />
                      <figcaption className="mt-2 text-sm text-muted-foreground">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ));
          })()}
        </Section>
      )}

      {theirWines.length > 0 && (
        <Section>
          <p className="eyebrow">In the portfolio</p>
          <h2 className="mt-4 text-3xl md:text-4xl">Wines by {producer.name}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {theirWines.map((w) => (
              <article key={w.name} className="card-lift border-t border-border pt-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                  {w.colour} · {w.region}
                </p>
                <h3 className="mt-2 text-xl leading-tight">{w.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {w.grapes}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
              </article>
            ))}
          </div>
          <p className="mt-10">
            <Link
              to="/wines"
              className="text-[0.7rem] uppercase tracking-[0.18em] text-primary underline underline-offset-8 transition-opacity hover:opacity-70"
            >
              Browse the full portfolio
            </Link>
          </p>
        </Section>
      )}

      <CtaBand />
    </>
  );
}

function ProducerNotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-4 text-4xl">We don't work with that producer</h1>
      <p className="mx-auto mt-6 max-w-md text-muted-foreground">
        The page you're looking for doesn't match anyone in our portfolio.
      </p>
      <p className="mt-10">
        <Link
          to="/producers"
          className="text-[0.7rem] uppercase tracking-[0.18em] text-primary underline underline-offset-8"
        >
          Meet our producers
        </Link>
      </p>
    </section>
  );
}
