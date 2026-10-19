import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { producerSlug, producers } from "@/lib/portfolio";
import { CtaBand } from "@/components/page-parts";
import { ProducersMap } from "@/components/producers-map";

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

function Producers() {
  const reel = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = reel.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8 });
  };

  return (
    <>
      <ProducersMap />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="producers-intro">
          <p className="producers-intro__statement">
            We work with producers who see themselves not only as winemakers, but as growers,
            farmers, and stewards of place.
          </p>
          <span className="producers-intro__rule" aria-hidden="true" />
          <div className="space-y-5 text-base leading-7 text-foreground/80 md:text-lg md:leading-8">
            <p>
              At Enotri Wine Imports, our portfolio begins in the vineyard. Our growers&rsquo; wines
              are shaped by provenance: the soil, climate, altitude, farming choices, and cultural
              history behind each bottle.
            </p>
            <p>
              We focus on authentic, grower-led estates from South Africa and Europe, with a
              particular emphasis on wines that offer strong character, regional identity, and
              excellent price-quality ratio.
            </p>
            <p className="font-semibold text-foreground">
              Our role is to bring these wines to Alberta with clarity, respect, and purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1360px] px-6 pb-24 md:pb-32">
        <div className="border-t border-navy pt-14 md:pt-20">
          <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-normal uppercase tracking-[0.06em] text-navy">
            Our producers
          </h2>
          <div className="mt-12 flex items-center gap-4 md:gap-6">
            <button
              type="button"
              className="producer-reel__arrow"
              onClick={() => scroll(-1)}
              aria-label="Previous producers"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <div ref={reel} className="producer-reel min-w-0 flex-1">
              {producers.map((p) => (
                <Link
                  key={p.name}
                  to="/producers/$slug"
                  params={{ slug: producerSlug(p.name) }}
                  className="producer-reel__item group"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-card">
                    {p.tileFullBleed ? (
                      <img
                        src={p.tileImage ?? p.logo}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      p.logo && (
                        <div className="flex h-full items-center justify-center p-6">
                          <img
                            src={p.logo}
                            alt=""
                            loading="lazy"
                            className={p.logoClassName ?? "max-h-16 w-auto object-contain"}
                          />
                        </div>
                      )
                    )}
                  </div>
                  <span className="mt-4 block font-display text-lg leading-snug md:text-xl">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-sm text-foreground/70">
                    {p.region}, {p.country}
                  </span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              className="producer-reel__arrow"
              onClick={() => scroll(1)}
              aria-label="Next producers"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
