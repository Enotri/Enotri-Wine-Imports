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
    <section className="relative overflow-hidden border-y border-border bg-ink">
      <div className="glow-halo mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between md:py-28">
        <div>
          <h2 className="max-w-xl text-4xl leading-[1.05] text-sand md:text-5xl">
            Try six bottles against your list
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-sand/75 md:text-base">
            Send your venue, the styles you need and your price bands. Rawlings replies within two
            business days with a proposed line-up and dates — no account, no minimum order, and no
            obligation to buy anything you taste.
          </p>
        </div>
        <Link
          to="/contact"
          className="shrink-0 rounded-sm border border-primary/70 px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.24em] text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Request a tasting
        </Link>
      </div>
    </section>
  );
}
