import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/enotri-logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/wines", label: "Our Wines" },
  { to: "/producers", label: "Producers" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Enotri Wine Imports — home"
        >
          <img
            src={logo.url}
            alt="Enotri Wine Imports — Roots Matter"
            className="h-16 w-auto rounded-sm"
          />
          <span className="mark-dot" aria-hidden="true" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.7rem] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm uppercase tracking-[0.16em] text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 md:py-28">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo.url} alt="Enotri Wine Imports" className="h-9 w-auto rounded-sm" />
            <span className="mark-dot" aria-hidden="true" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A boutique wine agency in Edmonton, Alberta, representing grower-led estates from South
            Africa and Europe.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2">
            {nav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Edmonton, Alberta, Canada
            <br />
            rallings@enotri.ca
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            Please enjoy responsibly. Trade enquiries welcome.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-8 text-center text-xs tracking-[0.18em] text-muted-foreground uppercase">
        © {new Date().getFullYear()} Enotri Wine Imports — Roots Matter
      </div>
    </footer>
  );
}
