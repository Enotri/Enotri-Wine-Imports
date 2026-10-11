import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { producerSlug, producers } from "@/lib/portfolio";
import {
  CtaBand,
  Section,
  PhotoGallery,
  eventPhotos,
  peoplePhotos,
  landPhotos,
} from "@/components/page-parts";
const producerHeroAsset = { url: "/images/site/producer-first-page.webp" };

export const Route = createFileRoute("/producers/")({
  head: () => ({
    meta: [
      { title: "Producers — Grower-Led Estates | Enotri Wine Imports" },
      {
        name: "description",
        content:
          "Meet the growers behind the Enotri portfolio: family estates and independent farmers from South Africa and Europe.",
      },
      { property: "og:title", content: "Producers — Enotri Wine Imports" },
      {
        property: "og:description",
        content:
          "Authentic, grower-led estates with strong character, regional identity and value.",
      },
    ],
  }),
  component: Producers,
});

const INITIAL_COUNT = 8;

function Producers() {
  const [country, setCountry] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const countries = useMemo(
    () => ["All", ...Array.from(new Set(producers.map((p) => p.country))).sort()],
    [],
  );
  const filtered = producers.filter((p) => country === "All" || p.country === country);
  const shown = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - shown.length;

  return (
    <>
      <section className="film-hero h-[82vh] min-h-[520px]">
        <img
          src={producerHeroAsset.url}
          alt="Lush green vineyard rows climbing a hillside"
          className="hero-media"
          loading="eager"
        />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <p className="hero-kicker">Producers</p>
          <h1 className="hero-title">Crafted by Growers</h1>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="prose-enotri max-w-2xl">
            <p>At Enotri Wine Imports, our portfolio begins in the vineyard.</p>
            <p>
              We work with producers who see themselves not only as winemakers, but as growers,
              farmers, and stewards of place. Their wines are shaped by provenance: the soil,
              climate, altitude, farming choices, and cultural history behind each bottle.
            </p>
            <p>Our role is to bring these wines to Alberta with clarity, respect, and purpose.</p>
            <p>
              We focus on authentic, grower-led estates from South Africa and Europe, with a
              particular emphasis on wines that offer strong character, regional identity, and
              excellent price-quality ratio.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="flex items-center justify-between gap-4 bg-primary px-6 py-5 text-primary-foreground md:px-8">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.24em] md:text-sm">
            Explore our producers
          </span>
          <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-6">
          {countries.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCountry(c);
                setExpanded(false);
              }}
              className={`text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                country === c
                  ? "text-primary underline underline-offset-8"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p) =>
            p.tileFullBleed && p.logo ? (
              <Link
                key={p.name}
                to="/producers/$slug"
                params={{ slug: producerSlug(p.name) }}
                className="group relative aspect-[4/3] overflow-hidden bg-card"
              >
                <img
                  src={p.logo}
                  alt={`${p.name}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-5 text-center">
                  <span className="font-display text-xl leading-snug tracking-wide text-white md:text-2xl">
                    {p.name}
                  </span>
                  <span className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-white/85">
                    {p.region} · {p.country}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                key={p.name}
                to="/producers/$slug"
                params={{ slug: producerSlug(p.name) }}
                className="group flex aspect-[4/3] flex-col items-center justify-center bg-card px-6 text-center transition-colors duration-300 hover:bg-secondary/50"
              >
                {p.logo && (
                  <img
                    src={p.logo}
                    alt={`${p.name}`}
                    loading="lazy"
                    className={p.logoClassName ?? "max-h-16 w-auto object-contain"}
                  />
                )}
                {!p.logoContainsName && (
                  <span
                    className={`font-display text-xl leading-snug tracking-wide text-foreground md:text-2xl ${
                      p.logo ? "mt-3" : ""
                    }`}
                  >
                    {p.name}
                  </span>
                )}
                <span className="mt-3 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-primary">
                  {p.region} · {p.country}
                </span>
              </Link>
            ),
          )}
        </div>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-px flex w-full items-center justify-center gap-3 bg-primary px-6 py-5 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            View all producers ({hiddenCount} more)
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </Section>

      <PhotoGallery title="Trade tastings and events" photos={eventPhotos} />
      <CtaBand />
    </>
  );
}
