import { createFileRoute } from "@tanstack/react-router";
import cellarAsset from "@/assets/cellar_photo.webp.asset.json";
import founderAsset from "@/assets/rawlings-munemo.jpg.asset.json";
import soilHandsAsset from "@/assets/sustainability-soil-hands.jpg.asset.json";
import { CtaBand, Section } from "@/components/page-parts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Enotri Wine Imports, Edmonton" },
      {
        name: "description",
        content:
          "Enotri Wine Imports is a boutique wine agency in Edmonton, Alberta, representing wines that express their true provenance.",
      },
      { property: "og:title", content: "About Enotri Wine Imports" },
      {
        property: "og:description",
        content:
          "Our story and philosophy: independent producers, responsible farming, and wines with a sense of place.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="film-hero h-[82vh] min-h-[520px]">
        <img
          src={cellarAsset.url}
          alt="Stacked oak barrels in a winery cellar"
          loading="eager"
          className="hero-media"
        />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <p className="hero-kicker">About</p>
          <h1 className="hero-title">Our Story</h1>
          <p className="hero-lede">
            Enotri Wine Imports is a boutique wine agency based in Edmonton, Alberta.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl">A simple goal</h2>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <img
                src={soilHandsAsset.url}
                alt="Two hands cupping rich dark soil with earthworms, roots, and seedlings"
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="prose-enotri max-w-2xl self-center text-base">
            <p>
              The company was founded with a simple goal: to represent wines that express their true
              provenance and the dedication of the vineyard stewards who grow them.
            </p>
            <p>
              We collaborate with independent producers from renowned and emerging regions,
              selecting wines that combine authenticity, quality, and harmony. All our producers
              bring something meaningful to the portfolio, whether through old vines, sustainable
              farming, indigenous varieties, family heritage, regional distinctiveness, or
              exceptional value.
            </p>
          </div>
        </div>
      </Section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.35fr_0.65fr] md:py-24">
          <div>
            <p className="eyebrow">Philosophy</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Our Philosophy</h2>
          </div>
          <div className="prose-enotri max-w-2xl text-base">
            <p>
              We believe the most important work happens in the vineyard, so we only take on estates
              that farm their own fruit. Before a wine is listed, someone here has walked those rows
              and tasted in that cellar with the person responsible for it.
            </p>
            <p>
              That keeps the portfolio short on purpose. It also means that when a buyer asks why a
              wine tastes the way it does, or how it was farmed, there is a real answer rather than
              a marketing line — and a price that an Alberta list can actually carry.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-[0.45fr_0.55fr] md:items-center">
          <img
            src={founderAsset.url}
            alt="Rawlings Munemo, founder of Enotri Wine Imports, holding a glass of red wine"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Rawlings Munemo</h2>
            <div className="prose-enotri mt-6 max-w-xl text-base">
              <p>
                Rawlings founded Enotri Wine Imports to bring wines of genuine provenance to Alberta
                — bottles that carry the mark of the people and places behind them.
              </p>
              <p>
                He works directly with the growers in the portfolio, tasting in their cellars and
                walking their vineyards before a single wine is listed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
