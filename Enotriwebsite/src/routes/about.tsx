import { createFileRoute } from "@tanstack/react-router";
import { ProducerFilm } from "@/components/producer-film";
const founderAsset = { url: "/images/site/rawlings-munemo.webp" };
const soilHandsAsset = { url: "/images/site/sustainability-soil-hands.webp" };
import {
  CtaBand,
  Section,
  PhotoGallery,
  eventPhotos,
  peoplePhotos,
  landPhotos,
} from "@/components/page-parts";

// The vineyard-harvest film, shown in the Our Story hero.
// "Our Story" is set in the film itself (opening and closing), so the hero has no text overlay.
const harvestFilm = {
  src: "/videos/about-our-story-wide.mp4",
  poster: "/videos/about-our-story-wide-poster.webp",
  srcSmall: "/videos/about-our-story-tall.mp4",
  posterSmall: "/videos/about-our-story-tall-poster.webp",
  label:
    "Our Story. Enotri Wine Imports is a boutique wine agency based in Edmonton, Alberta. A short film of Château de la Grave, Bordeaux: the estate, its vineyards and the hand harvest",
  caption: "Château de la Grave, Bordeaux. Harvest photos © Pierre-Marc.",
};

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
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500&display=swap",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="film-hero bg-ink">
        {/* The film shows these words on screen; keep them in the page for search and screen readers */}
        <h1 className="sr-only">Our Story</h1>
        <p className="sr-only">
          Enotri Wine Imports is a boutique wine agency based in Edmonton, Alberta.
        </p>
        <ProducerFilm
          film={harvestFilm}
          variant="fill"
          className="w-full md:aspect-[2/1] md:max-h-[86vh]"
        />
      </section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[0.45fr_0.55fr] md:py-24">
          <div>
            <p className="eyebrow">Philosophy</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-['Dancing_Script',cursive] normal-case!">
              Our Philosophy
            </h2>
            <img
              src={soilHandsAsset.url}
              alt="Two hands cupping rich dark soil with earthworms, roots, and seedlings"
              loading="lazy"
              className="mt-8 aspect-[4/3] w-full overflow-hidden rounded-lg object-cover"
            />
          </div>
          <div className="prose-enotri max-w-2xl self-center text-base font-['Dancing_Script',cursive]">
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
                Rawlings founded Enotri Wine Imports with a simple goal: to bring wines to Alberta
                that express their true provenance and the dedication of the vineyard stewards who
                grow them — bottles that carry the mark of the people and places behind them.
              </p>
              <p>
                He partners with independent producers from renowned and emerging regions, choosing
                wines that combine authenticity, quality, and harmony. Every estate brings something
                meaningful to the portfolio, whether through old vines, sustainable farming,
                indigenous varieties, family heritage, regional distinctiveness, or exceptional
                value.
              </p>
              <p>
                Each relationship is direct: he tastes in the growers' cellars and walks their
                vineyards before a single wine is listed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl md:text-4xl">In the cellars and on the floor</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Tasting at the estates, working the harvest and pouring for Alberta's sommeliers.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              src: "/images/site/amphora-cellar.webp",
              alt: "Terracotta amphorae lined up in a winery cellar",
              pos: "object-[center_75%]",
            },
            {
              src: "/images/about/chateau-de-la-grave-cellar.jpg",
              alt: "Large oak casks in the cellar at Château de la Grave",
              pos: "object-center",
            },
            {
              src: "/images/about/cellar-tasting-group.jpg",
              alt: "A tasting group gathered among the barrels in a winery cellar",
              pos: "object-[37%_center]",
            },
          ].map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`aspect-[4/5] w-full rounded-md object-cover ${p.pos}`}
            />
          ))}
        </div>
      </Section>

      <PhotoGallery title="The people" photos={peoplePhotos} />
      <PhotoGallery
        title="Trade tastings and events"
        photos={eventPhotos.filter((p) => !p.src.includes("event-springfontein"))}
      />
      <CtaBand />
    </>
  );
}
