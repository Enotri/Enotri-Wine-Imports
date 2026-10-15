import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { producerByName, producerSlug, wines } from "@/lib/portfolio";
import {
  CtaBand,
  Section,
  PhotoGallery,
  LabelGallery,
  eventPhotos,
  peoplePhotos,
  wineLabels,
} from "@/components/page-parts";
const testarossa = { url: "/images/site/testarossa_montepulciano_2019.webp" };
const madonnella = { url: "/images/site/madonnella.webp" };
const collecivetta = { url: "/images/site/collecivetta.webp" };
const winesHero = { url: "/images/site/vineyard-prosecco.webp" };

const featuredBottles = [
  { src: collecivetta.url, name: "Collecivetta Pecorino", producer: "Pasetti" },
  { src: madonnella.url, name: "Madonnella Montepulciano d'Abruzzo", producer: "Pasetti" },
  {
    src: testarossa.url,
    name: "Testarossa Montepulciano d'Abruzzo Riserva 2019",
    producer: "Pasetti",
  },
];

export const Route = createFileRoute("/wines")({
  head: () => ({
    meta: [
      { title: "Our Wines — Enotri Wine Imports Portfolio" },
      {
        name: "description",
        content:
          "Browse the Enotri portfolio: grower-made wines from South Africa, France, Italy and Spain, filterable by colour and country.",
      },
      { property: "og:title", content: "Our Wines — Enotri Wine Imports" },
      {
        property: "og:description",
        content:
          "Legendary wines of the world and everyday classics, all grown by the people who make them.",
      },
    ],
  }),
  component: Wines,
});

const colours = ["All", "White", "Red", "Rosé", "Sparkling", "Sweet"] as const;

function Wines() {
  const [colour, setColour] = useState<string>("All");
  const [country, setCountry] = useState<string>("All");

  const [page, setPage] = useState(1);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(wines.map((w) => w.country))).sort()],
    [],
  );

  const isFiltering = colour !== "All" || country !== "All";

  const filtered = wines.filter(
    (w) =>
      (colour === "All" || w.colour === colour) && (country === "All" || w.country === country),
  );

  // Page 1 = original portfolio, page 2 = the Château de la Grave additions.
  const pageTwoStart = wines.findIndex((w) => w.producer === "Château de la Grave");
  const shown = isFiltering
    ? filtered
    : page === 2
      ? filtered.slice(pageTwoStart)
      : filtered.slice(0, pageTwoStart);

  const pickColour = (c: string) => {
    setColour(c);
    setPage(1);
  };
  const pickCountry = (c: string) => {
    setCountry(c);
    setPage(1);
  };

  return (
    <>
      <section className="film-hero h-[92vh] min-h-[600px]">
        <img
          src={winesHero.url}
          alt="Vineyard landscape with rolling hills and a village in the distance"
          loading="eager"
          className="hero-media"
        />
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="eyebrow">Our Wines</p>
        <h1 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] font-normal tracking-[-0.02em] text-foreground">
          The portfolio, bottle by bottle
        </h1>
        <div className="mt-7 max-w-2xl space-y-4 text-foreground [&_p]:leading-relaxed">
          <p>
            Every wine below comes from an estate that farms its own fruit, and every one has been
            tasted with the grower before it was listed. Filter by colour or country, open a tech
            sheet for the technical detail, or click a producer name to read who made it.
          </p>
          <p>
            Available to Alberta restaurants, bars and retailers by the case through Connect
            Logistics. Ask us for wholesale pricing and current stock — there is no account or
            minimum order needed to enquire.
          </p>
        </div>
      </div>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="eyebrow">From the portfolio</p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {featuredBottles.map((b) => (
              <figure key={b.name} className="flex flex-col items-center text-center">
                <img
                  src={b.src}
                  alt={`${b.producer} ${b.name} bottle`}
                  loading="lazy"
                  className="h-72 w-auto rounded-md object-contain shadow-soft transition-transform duration-500 hover:-translate-y-1 md:h-96"
                />
                <figcaption className="mt-6">
                  <p className="text-label uppercase tracking-[0.2em] text-foreground">
                    {b.producer}
                  </p>
                  <p className="mt-2 text-lg leading-tight">{b.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {colours.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pickColour(c)}
                className={`text-label uppercase tracking-[0.18em] transition-colors ${
                  colour === c
                    ? "text-foreground underline underline-offset-8"
                    : "text-muted-foreground hover:opacity-70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {countries.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pickCountry(c)}
                className={`text-label uppercase tracking-[0.18em] transition-colors ${
                  country === c
                    ? "text-foreground underline underline-offset-8"
                    : "text-muted-foreground hover:opacity-70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((w) => (
            <article key={`${w.producer}-${w.name}`} className="group">
              <div className="flex aspect-[3/4] items-end justify-center overflow-hidden bg-sand">
                {w.image ? (
                  <img
                    src={w.image}
                    alt={`${w.producer} ${w.name} bottle`}
                    loading="lazy"
                    className="h-[92%] w-auto object-contain transition-transform duration-500 group-hover:-translate-y-1"
                  />
                ) : (
                  <BottleMark name={w.name} colour={w.colour} />
                )}
              </div>

              <p className="mt-4 text-label uppercase tracking-[0.2em] text-foreground">
                {w.region}, {w.country}
              </p>
              <h2 className="mt-2 text-xl leading-tight">{w.name}</h2>
              <p className="mt-1 text-sm text-foreground">
                {w.producerUrl ? (
                  <a
                    href={w.producerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-4 transition-colors hover:opacity-70"
                  >
                    {w.producer}
                  </a>
                ) : producerByName(w.producer) ? (
                  <Link
                    to="/producers/$slug"
                    params={{ slug: producerSlug(w.producer) }}
                    className="underline decoration-border underline-offset-4 transition-colors hover:opacity-70"
                  >
                    {w.producer}
                  </Link>
                ) : (
                  w.producer
                )}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {w.grapes}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
              {w.techSheet && (
                <a
                  href={w.techSheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-label uppercase tracking-[0.2em] text-foreground underline underline-offset-4"
                >
                  Tech sheet (PDF)
                </a>
              )}
            </article>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No wines match that combination — try another filter.
          </p>
        )}

        {!isFiltering && (
          <nav aria-label="Wines pages" className="mt-16 flex items-center justify-center gap-8">
            {[1, 2].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={page === p ? "page" : undefined}
                className={`text-label uppercase tracking-[0.18em] transition-colors ${
                  page === p
                    ? "text-foreground underline underline-offset-8"
                    : "text-muted-foreground hover:opacity-70"
                }`}
              >
                Page {p}
              </button>
            ))}
          </nav>
        )}
      </Section>

      <LabelGallery title="Bottles and labels" labels={wineLabels} />
      <CtaBand />
    </>
  );
}

function BottleMark({ name, colour }: { name: string; colour: string }) {
  const fill =
    colour === "White"
      ? "var(--gold)"
      : colour === "Rosé"
        ? "oklch(0.78 0.09 20)"
        : colour === "Sparkling"
          ? "oklch(0.82 0.06 95)"
          : colour === "Sweet"
            ? "oklch(0.7 0.11 70)"
            : "var(--primary)";

  return (
    <svg
      viewBox="0 0 60 150"
      role="img"
      aria-label={`${name} — ${colour} wine`}
      className="h-[85%] w-auto transition-transform duration-500 group-hover:-translate-y-1"
    >
      <path
        d="M24 4h12v28c0 8 12 16 12 32v78a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V64c0-16 12-24 12-32V4z"
        fill={fill}
        opacity="0.92"
      />
      <rect x="12" y="86" width="36" height="34" fill="oklch(0.98 0.008 85)" opacity="0.9" />
      <rect x="24" y="0" width="12" height="10" fill={fill} />
    </svg>
  );
}
