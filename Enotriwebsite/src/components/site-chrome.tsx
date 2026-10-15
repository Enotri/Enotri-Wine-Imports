import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/about", label: "About" },
  { to: "/wines", label: "Wines" },
  { to: "/producers", label: "Producers" },
  { to: "/sustainability", label: "Sustainability" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto flex min-h-[88px] max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-10 md:min-h-[100px] md:px-14 lg:px-20">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center"
          aria-label="Enotri Wine Imports, Roots Matter — home"
        >
          <img
            src="/enotri-logo-master.svg"
            alt="Enotri Wine Imports — Roots Matter"
            className="h-14 w-auto md:h-[66px]"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex lg:gap-9">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="py-2 text-sm text-foreground transition-colors hover:opacity-70"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Trade enquiries
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-border text-foreground hover:border-primary md:hidden"
        >
          <span className="block h-px w-5 bg-current" aria-hidden="true" />
          <span className="block h-px w-5 bg-current" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Main navigation"
          className="border-t border-border bg-background px-6 py-4 md:hidden"
        >
          {[...nav, { to: "/contact", label: "Trade enquiries" }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 text-sm text-foreground last:border-0 hover:opacity-70"
              activeProps={{ className: "text-foreground" }}
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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-14 md:px-14 md:py-20 lg:px-20">
        <div>
          <img
            src="/enotri-logo-master.svg"
            alt="Enotri Wine Imports — Roots Matter"
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            A boutique wine agency in Edmonton, Alberta, representing grower-led estates from South
            Africa and Europe.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Contact</p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Edmonton, Alberta, Canada
            <br />
            <a className="hover:opacity-70" href="mailto:rallings@enotri.ca">
              rallings@enotri.ca
            </a>
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-foreground hover:underline"
          >
            Get in touch
          </Link>
          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            Please enjoy responsibly. Trade enquiries welcome.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Enotri Wine Imports
      </div>
    </footer>
  );
}
