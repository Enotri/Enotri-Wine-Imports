import type { ReactNode } from "react";
import CardFanCarousel from "@/components/ui/card-fan-carousel";
import type { CardItem } from "@/components/ui/card-fan-carousel";

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
        <div className="hero-inner">
          <div className="text-backdrop">
            <p className="hero-kicker">{eyebrow}</p>
            <h1 className="hero-title">{title}</h1>
            {intro && <p className="hero-lede">{intro}</p>}
          </div>
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

// Transparent bottle cut-outs for the fan carousel, alternating whites and
// reds. These live in public/bottles, which Vite serves at the site root.
// The carousel opens centred on index 3, Heras Cordón Reserva.
const BOTTLES: CardItem[] = [
  {
    imgUrl: "/bottles/roncathe-soave.webp",
    alt: "Roncathe Soave DOC 2024 bottle",
    eyebrow: "Corte Moschina · Veneto, Italy",
    title: "Roncathe Soave DOC 2024",
    details: "Garganega · White",
    note: "Organic, basalt-rich volcanic soils of the Roncà hills; crisp citrus, almond and a flinty savoury edge.",
  },
  {
    imgUrl: "/bottles/nvie-langhe-nebbiolo.webp",
    alt: "Nvie Langhe Nebbiolo bottle",
    eyebrow: "Ferrero Federico · Piedmont, Italy",
    title: "Nvie Langhe Nebbiolo",
    details: "Nebbiolo · Red",
    note: "The estate's approachable Nebbiolo: bright cherry, rose petal and fine, silky tannins.",
  },
  {
    imgUrl: "/bottles/argonauta-verdicchio.webp",
    alt: "Argonauta Verdicchio Classico Superiore 2021 bottle",
    eyebrow: "Zaccagnini · Castelli di Jesi, Marche",
    title: "Argonauta Verdicchio Classico Superiore 2021",
    details: "Verdicchio · White",
    note: "From the classic hills around Jesi; crisp green apple, almond and a subtle saline finish.",
  },
  {
    imgUrl: "/bottles/heras-cordon-reserva.webp",
    alt: "Heras Cordón Reserva bottle",
    eyebrow: "Bodegas Heras Cordón · Rioja Alta, Spain",
    title: "Heras Cordón Reserva",
    details: "Tempranillo · Red",
    note: "Classic Reserva from Rioja Alta; ripe black cherry, vanilla and sweet spice, with polished tannins and a long, savoury finish.",
  },
  {
    imgUrl: "/bottles/collecivetta-pecorino.webp",
    alt: "Collecivetta Pecorino bottle",
    eyebrow: "Pasetti · Abruzzo, Italy",
    title: "Collecivetta",
    details: "Pecorino · White",
    note: "Pecorino, the once-forgotten Abruzzo white the Pasetti family helped revive, grown at 450–600 metres on the slopes of the Gran Sasso.",
  },
  {
    imgUrl: "/bottles/madonnella-montepulciano.webp",
    alt: "Madonnella Montepulciano d'Abruzzo bottle",
    eyebrow: "Pasetti · Abruzzo, Italy",
    title: "Madonnella",
    details: "Montepulciano d'Abruzzo · Red",
    note: "The heart of the estate: Montepulciano from some of Abruzzo's highest vineyards, where cool nights keep the fruit bright.",
  },
  {
    imgUrl: "/bottles/granetto-pinot-grigio.webp",
    alt: "Granetto Pinot Grigio 2025 bottle",
    eyebrow: "Corte Moschina · Colli Berici, Veneto",
    title: "Granetto Pinot Grigio 2025",
    details: "Pinot Grigio · White",
    note: "Limestone slopes with a stony substrate; bright, elegant fruit with real mineral lift and character.",
  },
  {
    imgUrl: "/bottles/el-proposito.webp",
    alt: "El Propósito 2023 bottle",
    eyebrow: "Viticultores de Lapuebla · Rioja Alavesa, Spain",
    title: "El Propósito 2023",
    details: "95% Tempranillo, 5% Viura · Red",
    note: "From 1940s–60s vines, fermented whole-bunch in French oak vats; strawberry, raspberry and rose, delicate and fine.",
  },
  {
    imgUrl: "/bottles/galactico.webp",
    alt: "Galáctico bottle",
    eyebrow: "Viticultores de Lapuebla · Rioja Alavesa, Spain",
    title: "Galáctico",
    details: "Tempranillo · Red",
    note: "A single-parcel bottling from old vines in Lapuebla de Labarca; dark cherry, liquorice and fine mountain tannins.",
  },
  {
    imgUrl: "/bottles/heras-cordon-vendimia-seleccionada.webp",
    alt: "Heras Cordón Vendimia Seleccionada bottle",
    eyebrow: "Bodegas Heras Cordón · Rioja Alta, Spain",
    title: "Heras Cordón Vendimia Seleccionada",
    details: "Tempranillo · Red",
    note: "A selected-harvest Rioja; bright red berry, plum and gentle oak, framed by supple tannins and fresh acidity.",
  },
];

export function CtaBand() {
  return (
    <section
      className="relative overflow-hidden border-y border-primary"
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(60% 55% at 50% 42%, #2b2826 0%, #141312 45%, #0a0a0a 75%)",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20">
        <CardFanCarousel cards={BOTTLES} />
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

// Wine label wall: flush masonry columns, each label at full column width and natural height.
export function LabelGallery({
  title,
  labels,
}: {
  title: string;
  labels: { src: string; alt: string; width: number; height: number }[];
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 md:px-14 md:py-24 lg:px-20">
        <h2 className="mb-10 text-3xl md:text-5xl">{title}</h2>
        <div className="columns-1 gap-0 sm:columns-2 lg:columns-3">
          {labels.map((l) => (
            <img
              key={l.src}
              src={l.src}
              alt={l.alt}
              width={l.width}
              height={l.height}
              loading="lazy"
              className="card-lift block h-auto w-full break-inside-avoid duration-300 hover:shadow-none"
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
  g("event-sommelier", "A sommelier in a white service jacket, seated in a restaurant booth"),
  g("event-springfontein", "Springfontein winery visit"),
  g("event-winemaking", "Winemaking in the cellar"),
  g(
    "event-durbanville",
    "Two visitors outside the Klein Roosboom tasting room, in front of its wall of vintage plates",
  ),
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

const label = (name: string, alt: string, width: number, height: number) => ({
  src: `/labels/${name}.webp`,
  alt,
  width,
  height,
});

// Wines page label wall; width/height are the files' pixel sizes (reserves space while loading).
export const wineLabels = [
  label("corte-moschina-calcareo", "Corte Moschina Calcàreo label", 1070, 1400),
  label("pasetti-montepulciano", "Pasetti Montepulciano d'Abruzzo label", 1400, 1400),
  label("corte-moschina-granetto", "Corte Moschina Granetto label", 1070, 1400),
  label("pasetti-pecorino", "Pasetti Pecorino d'Abruzzo label", 1400, 1400),
  label("corte-moschina-roncathe", "Corte Moschina Roncathe label", 1070, 1400),
  label(
    "pasetti-montepulciano-riserva",
    "Pasetti Montepulciano d'Abruzzo Riserva label",
    839,
    1400,
  ),
];
