import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import { producerSlug, producers, wines } from "@/lib/portfolio";
import { CtaBand } from "@/components/page-parts";
import { ProducerFilm } from "@/components/producer-film";
import { ProducersMap } from "@/components/producers-map";
import { ProducerStory } from "@/components/producer-story";
import producerStoryCss from "../styles/producer-story.css?url";

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
      links: [{ rel: "stylesheet", href: producerStoryCss }],
    };
  },
  component: ProducerDetail,
  notFoundComponent: ProducerNotFound,
});

const COLOUR_DOT: Record<string, string> = {
  Red: "#7a1f2b",
  White: "#b9a24a",
  Rosé: "#d98a9a",
  Sparkling: "#8fa3b8",
  Sweet: "#c8892f",
};

function Slideshow({
  photos,
}: {
  photos: { src: string; alt: string; caption?: string | undefined }[];
}) {
  const [i, setI] = useState(0);
  const photo = photos[i];
  if (!photo) return null;
  return (
    <figure>
      <div className="relative aspect-[8/7] overflow-hidden bg-card">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {photos.length > 1 && photos.length <= 8 && (
          <div className="absolute inset-x-0 bottom-5 flex justify-center gap-3">
            {photos.map((p, n) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show photo ${n + 1} of ${photos.length}`}
                aria-current={n === i}
                className="producer-dot"
              />
            ))}
          </div>
        )}
        {photos.length > 8 && (
          <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-4 text-sm font-semibold text-white">
            <button
              type="button"
              onClick={() => setI((i - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
              className="producer-slide-arrow"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="producer-slide-count" aria-live="polite">
              {i + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setI((i + 1) % photos.length)}
              aria-label="Next photo"
              className="producer-slide-arrow"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      {photo.caption && (
        <figcaption className="mt-3 text-sm text-foreground/70">{photo.caption}</figcaption>
      )}
    </figure>
  );
}

function ProducerDetail() {
  const producer = Route.useLoaderData();
  const theirWines = wines.filter((w) => w.producer === producer.name);
  // The hero often reappears in the gallery; show each photo once.
  const photos = [
    ...(producer.heroImage ? [producer.heroImage] : []),
    ...(producer.gallery ?? []),
  ].filter((p, i, all) => all.findIndex((q) => q.src === p.src) === i);
  const showLogo = producer.logo && !producer.tileFullBleed;
  // With three or more photos the scroll gallery below shows them all; keep one photo up top.
  const topPhotos = photos.length >= 3 ? photos.slice(0, 1) : photos;

  return (
    <>
      <ProducersMap producer={producer.name} id="producer-map" />

      <section className="mx-auto max-w-[1360px] px-6 py-12 md:py-16">
        <p className="text-sm text-foreground/70">
          <Link to="/producers" className="hover:underline">
            Producers
          </Link>
          <span className="mx-3">/</span>
          {producer.name}
        </p>

        <div className="producer-layout mt-8">
          <div className="producer-layout__media">
            {photos.length > 0 ? (
              <Slideshow key={producer.name} photos={topPhotos} />
            ) : (
              producer.logo && (
                <img src={producer.logo} alt="" className="aspect-[8/7] w-full object-cover" />
              )
            )}
          </div>

          <span className="producer-layout__rule" aria-hidden="true" />

          <div className="producer-layout__text">
            {showLogo && (
              <div className="mb-8 inline-flex border border-navy bg-white p-8">
                <img src={producer.logo} alt="" className="max-h-28 w-auto object-contain" />
              </div>
            )}
            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05]">
              {producer.name}
            </h1>
            <p className="producer-heading mt-6">
              From: {producer.region}, {producer.country}
            </p>
            <p className="mt-3">
              <a
                href="#producer-map"
                className="inline-flex items-center gap-2 italic underline underline-offset-4 hover:opacity-70"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Show on map
              </a>
            </p>

            <h2 className="producer-heading mt-10">Background</h2>
            <div className="mt-3 space-y-4 text-base leading-7 text-foreground/85 md:text-[1.05rem] md:leading-8">
              <p>{producer.summary}</p>
              {producer.story.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <h2 className="producer-heading mt-10">Farming</h2>
            <p className="mt-3 text-base leading-7 text-foreground/85">{producer.farming}</p>

            <p className="mt-10 font-semibold leading-7">
              To find out more about this producer and their wines, send us an enquiry and we will
              reply within two business days.
            </p>
            <Link
              to="/contact"
              search={{ producer: producer.name }}
              hash="contact-form"
              className="enquire-button mt-6"
            >
              Enquire
              <ChevronRight className="enquire-button__icon" aria-hidden="true" />
            </Link>
          </div>

          {(theirWines.length > 0 || producer.film) && (
            <div className="producer-layout__wines">
              {theirWines.length > 0 && (
                <div className="border-t border-navy pt-10">
                  <h2 className="producer-heading">Wines by this producer</h2>
                  <ul className="mt-5 space-y-2">
                    {theirWines.map((w) => (
                      <li key={w.name} className="flex items-baseline gap-3">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full"
                          style={{ background: COLOUR_DOT[w.colour] }}
                        />
                        <span>
                          <span className="italic">{w.name}</span>
                          <span className="text-foreground/60">
                            {" "}
                            ({w.colour.toLowerCase()}, {w.grapes})
                          </span>
                          {w.techSheet && (
                            <a
                              href={w.techSheet}
                              download
                              className="ml-2 text-sm whitespace-nowrap underline underline-offset-4 hover:opacity-70"
                            >
                              Info sheet (PDF)
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6">
                    <Link
                      to="/wines"
                      className="text-sm underline underline-offset-4 hover:opacity-70"
                    >
                      Tasting notes and tech sheets on the wines page
                    </Link>
                  </p>
                </div>
              )}
              {producer.film && (
                <div className="mt-10">
                  <ProducerFilm film={producer.film} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ProducerStory key={producer.name} producer={producer} photos={photos} wines={theirWines} />

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
          className="text-label uppercase tracking-[0.18em] text-foreground underline underline-offset-8"
        >
          Meet our producers
        </Link>
      </p>
    </section>
  );
}
