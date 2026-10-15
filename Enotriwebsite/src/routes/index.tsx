import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/page-parts";
import { GrowersMap } from "@/components/growers-map";
import { ScrollExpandHero } from "@/components/scroll-expand-hero";
import { legendary, producerSlug, producers, wines } from "@/lib/portfolio";

const countryCount = new Set(producers.map((p) => p.country)).size;

const featuredProducers = [
  {
    name: "Pasetti",
    image: "/images/home/pasetti-vineyard.webp",
    alt: "A grower and dog among the Pasetti vineyard rows",
  },
  {
    name: "Château de la Grave",
    image: "/images/home/chateau-family.webp",
    alt: "The Bassereau family standing among the vines at Château de la Grave",
  },
].flatMap(({ name, image, alt }) => {
  const producer = producers.find((entry) => entry.name === name);
  return producer ? [{ producer, image, alt }] : [];
});

const featuredWineImages = new Map<string, string>([
  ["Roncathe Soave DOC 2024", "/images/home/roncathe-soave.webp"],
  ["Granetto Pinot Grigio 2025", "/images/home/granetto-pinot-grigio.webp"],
  ["Calcàreo Carménère 2021", "/images/home/calcareo-carmenere.webp"],
  ["Nvie Langhe Nebbiolo", "/images/home/nvie-langhe-nebbiolo.webp"],
]);
const featuredWines = wines.flatMap((wine) => {
  const image = featuredWineImages.get(wine.name);
  return image ? [{ ...wine, image }] : [];
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enotri Wine Imports — Wines with roots" },
      {
        name: "description",
        content:
          "Meet the growers, places and thoughtfully chosen wines behind Enotri Wine Imports in Alberta.",
      },
      { property: "og:title", content: "Enotri Wine Imports — Wines with roots" },
      {
        property: "og:description",
        content: "Independent growers and wines of character, brought to Alberta.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="landing">
      <ScrollExpandHero
        mediaSrc="/videos/home-hero-harvest-poster.webp"
        mediaAlt="Welcome to the wines of Bordeaux"
        videoSrc="/videos/home-hero-harvest.mp4"
        bgSrc="/images/home/scroll-hero-bg.webp"
        bgAlt="Open iron gates onto a gravel drive leading into vineyard rows"
        titleLead="Good wine has"
        titleTrail="a sense of place."
        scrollCue="Scroll to expand"
      >
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6">
          <div className="text-backdrop max-w-xl">
            <p className="text-xs font-medium tracking-[0.12em] text-foreground sm:text-sm">
              Independent wine imports · Edmonton, Alberta
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground sm:text-base sm:leading-7">
              We bring the work of independent growers to Alberta—wines shaped by the land, and by
              the people who tend it.
            </p>
          </div>
          <div className="text-backdrop flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              to="/wines"
              className="inline-flex min-h-12 items-center border border-foreground px-5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background"
            >
              Explore the wines
            </Link>
            <Link
              to="/producers"
              className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              Meet the growers
            </Link>
          </div>
        </div>
      </ScrollExpandHero>

      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-14 md:px-14 md:py-24 lg:gap-20 lg:px-20 lg:py-28">
        <div className="relative min-w-0">
          <div className="absolute -bottom-4 -left-4 h-[72%] w-[72%] border-b-[3px] border-l-[3px] border-primary/80 sm:-bottom-6 sm:-left-6" />
          <img
            src="/images/home/chateau-vineyard.webp"
            alt="Vineyard rows at Château de la Grave"
            loading="lazy"
            className="relative aspect-[1.12/1] w-full object-cover"
          />
        </div>
        <div className="max-w-xl md:pl-3">
          <p className="home-label">The Enotri approach</p>
          <h2 className="mt-4 max-w-lg text-4xl leading-[1.05] sm:text-5xl">
            Start with the grower. The wine follows.
          </h2>
          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            We build our portfolio one relationship at a time. Each estate is chosen for its sense
            of place, its care in the vineyard and the people willing to stand behind every bottle.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            That keeps our list considered and gives Alberta restaurants, retailers and private
            clients a real story to share at the table.
          </p>
          <Link
            to="/about"
            className="mt-7 inline-flex min-h-11 items-center border-b border-primary/50 text-sm font-medium text-foreground hover:border-primary"
          >
            Our story
          </Link>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:px-14 md:py-24 lg:gap-20 lg:px-20 lg:py-28">
          <div className="max-w-xl">
            <p className="home-label">Chosen for character</p>
            <h2 className="mt-4 max-w-md text-4xl leading-[1.05] sm:text-5xl">
              A thoughtful selection, rooted in real places.
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              From volcanic hills in Veneto to high vineyards in Abruzzo, every bottle has a reason
              to be here. Discover expressive wines from {producers.length} family estates in{" "}
              {countryCount} countries.
            </p>
            <Link
              to="/wines"
              className="mt-7 inline-flex min-h-11 items-center border-b border-primary/50 text-sm font-medium text-foreground hover:border-primary"
            >
              Browse the portfolio
            </Link>
          </div>
          <div className="relative min-w-0 md:pl-5">
            <div className="absolute -right-3 -top-4 h-[72%] w-[72%] border-r-[3px] border-t-[3px] border-primary/80 sm:-right-5 sm:-top-6" />
            <img
              src="/images/home/pasetti-cellar.webp"
              alt="Barrels in the Pasetti wine cellar"
              loading="lazy"
              className="relative aspect-[1.3/1] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20 lg:py-28">
        <div className="flex flex-col justify-between gap-5 border-b border-border pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="home-label">From the portfolio</p>
            <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">Find your next favourite.</h2>
          </div>
          <Link
            to="/wines"
            className="inline-flex min-h-11 items-center text-sm font-medium text-foreground hover:underline"
          >
            All {wines.length} wines
          </Link>
        </div>
        <div className="mt-9 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWines.map((wine) => (
            <article key={`${wine.producer}-${wine.name}`} className="group min-w-0">
              <div className="card-lift relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={wine.cutout ?? wine.image}
                  alt={`${wine.name} bottle`}
                  loading="lazy"
                  className="absolute bottom-[8%] left-1/2 h-[83%] w-auto max-w-[70%] -translate-x-1/2 object-contain [filter:drop-shadow(0_14px_14px_rgb(40_25_20/0.28))]"
                />
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  {wine.producer} · {wine.region}, {wine.country}
                </p>
                <h3 className="mt-2 font-display text-xl leading-tight sm:text-2xl">{wine.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{wine.colour}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 sm:px-10 md:px-14 md:pb-24 lg:px-20 lg:pb-28">
        <div className="border-b border-border pb-7">
          <p className="home-label">Legendary &amp; Exceptional</p>
          <h2 className="mt-3 max-w-2xl text-4xl leading-[1.05] sm:text-5xl">
            Wines that stand apart for character and rarity.
          </h2>
        </div>
        <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {legendary.map((wine) => (
            <article key={`${wine.producer}-${wine.name}`} className="cell-hover bg-background p-7">
              <p className="text-xs text-muted-foreground">
                {wine.producer} · {wine.region}, {wine.country}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight">{wine.name}</h3>
              <p className="mt-1 text-sm text-foreground">{wine.colour}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{wine.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary text-white">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 md:py-20 lg:px-20 lg:py-28">
            <p className="text-xs font-medium tracking-[0.12em] text-white">A belief we share</p>
            <h2 className="mt-5 max-w-xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Better wine begins long before the cellar.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white sm:text-base">
              In the soil, the seasons, and the patient choices of the people who grow the fruit. We
              look for wines that carry those details with them.
            </p>
            <Link
              to="/sustainability"
              className="mt-7 inline-flex min-h-11 w-fit items-center border-b border-white/60 text-sm font-medium text-white hover:border-white"
            >
              How we think about the land
            </Link>
          </div>
          <div className="relative min-h-[320px] md:min-h-full">
            <img
              src="/enotri-vineyard-hero.jpg"
              alt="Vineyard rows shaped by the contours of the land"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 border-b border-primary/20 pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="home-label">The people behind the bottle</p>
              <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">Meet the growers.</h2>
            </div>
            <Link
              to="/producers"
              className="inline-flex min-h-11 items-center text-sm font-medium text-foreground hover:underline"
            >
              All producers
            </Link>
          </div>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {featuredProducers.map(({ producer, image, alt }) => {
              return (
                <article key={producer.name} className="min-w-0 bg-white">
                  <Link
                    to="/producers/$slug"
                    params={{ slug: producerSlug(producer.name) }}
                    className="group block"
                  >
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      className="aspect-[1.45/1] w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <div className="p-5 sm:p-6">
                      <p className="text-xs text-muted-foreground">
                        {producer.region}, {producer.country}
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
                        {producer.name}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {producer.summary}
                      </p>
                      <span className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-foreground underline decoration-foreground/40 underline-offset-4 group-hover:decoration-foreground">
                        Discover the estate
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <GrowersMap />

      <CtaBand />
    </div>
  );
}
