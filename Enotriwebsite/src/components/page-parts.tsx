import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  if (image) {
    return (
      <section className="film-hero h-[78vh] min-h-[520px]">
        <img src={image} alt="" loading="eager" className="hero-media" />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <p className="hero-kicker">{eyebrow}</p>
          <h1 className="hero-title">{title}</h1>
          {intro && <p className="hero-lede">{intro}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40">
      <div className="glow-halo mx-auto max-w-6xl px-6 py-28 md:py-36">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-24 md:py-36 ${className}`}>{children}</section>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-y border-primary bg-primary">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-6 py-16 sm:px-10 md:flex-row md:items-center md:justify-between md:px-14 md:py-20 lg:px-20">
        <div>
          <h2 className="max-w-xl text-4xl leading-[1.05] text-sand md:text-5xl">
            Try six bottles against your list
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
            Send your venue, the styles you need and your price bands. Rawlings replies within two
            business days with a proposed line-up and dates — no account, no minimum order, and no
            obligation to buy anything you taste.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex min-h-12 shrink-0 items-center border border-white/80 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-primary"
        >
          Request a tasting
        </Link>
      </div>
    </section>
  );
}

export function PhotoGallery({
  title,
  photos,
}: {
  title: string;
  photos: { src: string; alt: string }[];
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20">
        <h2 className="mb-10 text-3xl md:text-5xl">{title}</h2>
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="mb-4 w-full break-inside-avoid object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const g = (name: string, alt: string) => ({ src: `/images/gallery/${name}.webp`, alt });

export const eventPhotos = [
  g("event-bon-vivant-vol--2-8", "Bon Vivant wine event"),
  g("event-bonvivantepic", "Bon Vivant tasting"),
  g("event-winedinner", "Enotri wine dinner"),
  g("event-floorpour", "Pouring wine on the trade floor"),
  g("event-culturewine", "Culture Wine event"),
  g("event-sommelier", "Sommelier in uniform"),
  g("event-springfontein", "Springfontein winery visit"),
  g("event-winemaking", "Winemaking in the cellar"),
  g("event-durbanville", "Durbanville vineyards"),
  g("event-cwg", "Cape Winemakers Guild event"),
];

export const peoplePhotos = [
  g("people-winedirector", "Enotri wine director"),
  g("people-rallings", "Rallings of Enotri"),
  g("people-lee-anne", "Lee-anne of Enotri"),
  g("people-people", "The Enotri team"),
  g("people-people-02", "Enotri team with growers"),
];

export const landPhotos = [
  g("land-winery-01", "Winery building"),
  g("land-vineyard-01", "Vineyard rows"),
  g("land-vineyard-02", "Vineyard in the hills"),
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => g(`bottle-bottle-0${n}`, `Wine bottle ${n}`)),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => g(`hero-hero-0${n}`, `Vineyard landscape ${n}`)),
  g("hero-hero-10", "Vineyard landscape 10"),
];
