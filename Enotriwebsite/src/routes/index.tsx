import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/vineyard_photo.jpg.asset.json";
import estateAsset from "@/assets/160.1.jpg.asset.json";
import cellarAsset from "@/assets/cellar_photo.webp.asset.json";
import { producers, legendary, wines } from "@/lib/portfolio";
import { CtaBand, Section } from "@/components/page-parts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Enotri Wine Imports — Wines of Character and Provenance" },
      {
        name: "description",
        content:
          "Enotri Wine Imports is an Edmonton wine agency representing independent vineyard stewards and family estates from South Africa and Europe.",
      },
      { property: "og:title", content: "Enotri Wine Imports — Roots Matter" },
      {
        property: "og:description",
        content:
          "Grower-led wines of authenticity, provenance and sustainability, imported to Alberta.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="film-hero h-[90vh] min-h-[580px]">
        <img
          src={heroAsset.url}
          alt="Hillside vineyard rows above a valley at golden hour"
          width={1920}
          height={1280}
          className="hero-media"
        />
        <div className="hero-scrim" />
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[70px] w-full text-gold/40"
        >
          <path
            d="M0 70 C 180 40, 300 85, 480 60 S 780 20, 960 55 S 1300 85, 1440 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0 78 C 220 55, 360 92, 560 70 S 860 38, 1080 66 S 1330 90, 1440 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.6"
          />
        </svg>
        <div className="hero-inner">
          <p className="hero-kicker">Wine agency · Edmonton, Alberta</p>
          <h1 className="hero-title">Grower-made wine for Alberta lists</h1>
          <p className="hero-lede">
            We import from {producers.length} family estates in{" "}
            {new Set(producers.map((p) => p.country)).size} countries — every wine tasted with the
            person who grew it, and available to Alberta restaurants and retailers by the case.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/wines"
              className="rounded-sm bg-sand px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-ink transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              See the portfolio
            </Link>
            <Link
              to="/contact"
              className="rounded-sm border border-sand/60 px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-sand transition-all hover:-translate-y-0.5 hover:bg-sand hover:text-ink"
            >
              Request a tasting
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3">
          {[
            {
              k: `${wines.length} wines`,
              v: "One compact list, no filler SKUs — every bottle chosen for a reason we can explain.",
            },
            {
              k: "Direct from the estate",
              v: "No brokers in between. We taste in the cellar and walk the rows before listing a wine.",
            },
            {
              k: "Ordered by the case",
              v: "Trade orders are placed through Connect Logistics; private clients order via the agency.",
            },
          ].map((f) => (
            <div key={f.k} className="card-lift border-t border-border pt-5">
              <p className="text-sm uppercase tracking-[0.14em] text-foreground">{f.k}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      <Section className="!py-14 md:!py-20">
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Enotri is a small agency. That is deliberate: we can only represent as many growers as we
          can visit, taste with, and argue about vintages with. If a wine is on this list, someone
          here has stood in the vineyard it came from.
        </p>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-12 border-t border-border pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <img
            src={estateAsset.url}
            alt="The estate winery building at dusk"
            width={1920}
            height={1280}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <p className="eyebrow">How we choose</p>
            <h2 className="mt-4 text-3xl md:text-5xl">Three questions before a wine is listed</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Does the estate farm its own fruit? Does the wine taste like where it is from rather
              than like a recipe? And does it earn its place at the price an Alberta list can
              actually carry?
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If the answer to any of those is no, we pass — however good the story is. That is why
              the portfolio is short and why we can talk about every bottle in it.
            </p>

            <Link
              to="/wines"
              className="mt-8 inline-block rounded-sm border border-primary px-7 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore the wines
            </Link>
          </div>
        </div>
      </Section>

      <section className="bg-secondary/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Featured Producers</p>
              <h2 className="mt-4 text-3xl md:text-5xl">Crafted by growers</h2>
            </div>
            <Link
              to="/producers"
              className="hidden shrink-0 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:opacity-70 md:block"
            >
              All producers
            </Link>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {producers.slice(0, 6).map((p) => (
              <article key={p.name} className="card-lift border-t border-border pt-5">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">
                  {p.region}, {p.country}
                </p>
                <h3 className="mt-2 text-2xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              </article>
            ))}
          </div>
          <Link
            to="/producers"
            className="mt-10 inline-block text-[0.7rem] uppercase tracking-[0.2em] text-primary md:hidden"
          >
            All producers
          </Link>
        </div>
      </section>

      <Section>
        <p className="eyebrow">Legendary &amp; Exceptional</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">
          Wines that stand apart for character and rarity
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {legendary.map((w) => (
            <article key={w.name} className="cell-hover bg-background p-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">{w.colour}</p>
              <h3 className="mt-3 text-2xl leading-tight">{w.name}</h3>
              <p className="mt-1 text-sm text-foreground/70">{w.producer}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.note}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="eyebrow">Wine Portfolio</p>
            <h2 className="mt-4 text-3xl md:text-5xl">
              {wines.length} wines from {new Set(producers.map((p) => p.country)).size} countries
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Whites of tension and texture, reds with lift and grip, a handful of sparkling and
              sweet wines — all from estates that farm their own fruit.
            </p>
            <Link
              to="/wines"
              className="mt-8 inline-block rounded-sm border border-primary px-7 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View the portfolio
            </Link>
          </div>
          <img
            src={cellarAsset.url}
            alt="Oak barrels ageing in the cellar"
            width={1920}
            height={1275}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </section>

      <Section>
        <p className="eyebrow">How to order</p>
        <h2 className="mt-4 max-w-2xl text-3xl md:text-5xl">Three steps, no guesswork</h2>
        <ol className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Tell us your list",
              d: "Send your venue or shop, the styles you need, and your price bands. No account or minimum required to ask.",
            },
            {
              n: "02",
              t: "Taste the shortlist",
              d: "We come to you with 6–8 bottles chosen against that brief, usually within two weeks of your enquiry.",
            },
            {
              n: "03",
              t: "Place the order",
              d: "Trade orders go through Connect Logistics on standard Alberta terms; we handle the paperwork and follow the delivery.",
            },
          ].map((s) => (
            <li key={s.n} className="cell-hover bg-background p-7">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-primary">{s.n}</p>
              <h3 className="mt-3 text-2xl leading-tight">{s.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
