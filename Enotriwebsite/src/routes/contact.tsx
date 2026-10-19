import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Clock, Mail, MapPin, Truck } from "lucide-react";
import { useState } from "react";

const EMAIL = "rallings@enotri.ca";

const HELP_OPTIONS = ["Restaurant / bar", "Retailer", "Sommelier / buyer", "Private client"];

function Field({
  id,
  label,
  required = false,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="contact-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

function EnquiryForm({ producer }: { producer?: string | undefined }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "",
    help: "",
    message: producer ? `I'd like to know more about ${producer} and their wines.` : "",
  });
  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent(`Enquiry: ${form.company || form.name || "Enotri"}`) +
    "&body=" +
    encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Company or venue: ${form.company}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `City: ${form.city}`,
        `Enquiring as: ${form.help}`,
        "",
        form.message,
      ].join("\n"),
    );

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required>
          <input
            id="name"
            required
            autoComplete="name"
            placeholder="Full name"
            className="contact-input"
            value={form.name}
            onChange={set("name")}
          />
        </Field>
        <Field id="company" label="Company or venue">
          <input
            id="company"
            autoComplete="organization"
            placeholder="Company or venue"
            className="contact-input"
            value={form.company}
            onChange={set("company")}
          />
        </Field>
        <Field id="email" label="Email address" required>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            className="contact-input"
            value={form.email}
            onChange={set("email")}
          />
        </Field>
        <Field id="phone" label="Phone number">
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            className="contact-input"
            value={form.phone}
            onChange={set("phone")}
          />
        </Field>
        <Field id="city" label="City">
          <input
            id="city"
            autoComplete="address-level2"
            placeholder="City"
            className="contact-input"
            value={form.city}
            onChange={set("city")}
          />
        </Field>
        <Field id="help" label="How can we help?" required>
          <div className="relative">
            <select
              id="help"
              required
              className="contact-input appearance-none pr-12"
              value={form.help}
              onChange={set("help")}
            >
              <option value="" disabled>
                Choose one
              </option>
              {HELP_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 fill-none stroke-navy stroke-[2.5]"
            >
              <path d="M5 9l7 7 7-7" />
            </svg>
          </div>
        </Field>
        <Field id="message" label="Message" required wide>
          <textarea
            id="message"
            rows={5}
            required
            placeholder="e.g. two by-the-glass whites under $22 wholesale, plus a Nebbiolo for the fall list."
            className="contact-input min-h-36 py-3"
            value={form.message}
            onChange={set("message")}
          />
        </Field>
      </div>
      <p className="mt-4 text-right text-sm text-foreground/70">* Required fields</p>
      <div className="mt-4 flex justify-end">
        <button type="submit" className="enquire-button">
          Send
          <ChevronRight className="enquire-button__icon" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-6 text-right text-xs leading-relaxed text-foreground/70">
        Opens your email app with the details filled in.
      </p>
    </form>
  );
}

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { producer?: string } =>
    typeof search["producer"] === "string" ? { producer: search["producer"] } : {},
  head: () => ({
    meta: [
      { title: "Contact & Tastings — Enotri Wine Imports, Edmonton" },
      {
        name: "description",
        content:
          "Book a trade or private tasting with Enotri Wine Imports in Edmonton, Alberta, or enquire about the portfolio.",
      },
      { property: "og:title", content: "Contact Enotri Wine Imports" },
      {
        property: "og:description",
        content: "Trade enquiries, portfolio requests and tastings across Alberta.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { producer } = Route.useSearch();
  return (
    <>
      <section
        id="contact-form"
        className="mx-auto max-w-[1360px] scroll-mt-24 px-6 py-14 md:py-20"
      >
        <div className="contact-layout">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none uppercase tracking-[0.04em]">
              Get in touch
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-foreground/80 md:text-lg">
              Tell us what you pour and what you need. We reply within two business days with a
              proposed line-up and dates. No account or minimum order required to start.
            </p>
            <EnquiryForm producer={producer} />
          </div>

          <span className="contact-layout__rule" aria-hidden="true" />

          <aside className="space-y-10">
            <div>
              <h2 className="producer-heading">Enotri Wine Imports</h2>
              <ul className="mt-4 space-y-4">
                <li className="contact-line">
                  <MapPin aria-hidden="true" />
                  Edmonton, Alberta, Canada
                </li>
                <li className="contact-line">
                  <Mail aria-hidden="true" />
                  <a className="hover:underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </li>
                <li className="contact-line">
                  <img
                    src="/images/social/instagram-glyph-gradient.png"
                    alt=""
                    className="contact-line__brand"
                  />
                  <a
                    className="hover:underline"
                    href="https://www.instagram.com/enotriwines/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @enotriwines on Instagram
                  </a>
                </li>
                <li className="contact-line">
                  <img
                    src="/images/social/linkedin-in-bug.png"
                    alt=""
                    className="contact-line__brand"
                  />
                  <a
                    className="hover:underline"
                    href="https://www.linkedin.com/in/enotri-wines-1800b8443/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enotri Wines on LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="producer-heading">Response time</h2>
              <p className="contact-line mt-4">
                <Clock aria-hidden="true" />
                Within two business days, from a person. Rallings answers the trade enquiries
                himself.
              </p>
            </div>
            <div>
              <h2 className="producer-heading">Ordering</h2>
              <p className="contact-line mt-4">
                <Truck aria-hidden="true" />
                Licensed trade orders are placed through Connect Logistics on standard Alberta
                terms. Private clients can enquire about allocation and availability directly.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="eyebrow">Before you write</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">The questions we get asked most</h2>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            {[
              {
                q: "Do I need an account or a minimum order?",
                a: "No. You can ask for pricing, samples or a tasting with no account and no commitment. Accounts only come into play once you decide to order.",
              },
              {
                q: "How do orders actually get to me?",
                a: "Licensed trade orders are placed through Connect Logistics on standard Alberta terms. We handle the paperwork and follow the delivery through.",
              },
              {
                q: "Can I buy as a private individual?",
                a: "Private clients can enquire about allocation and availability directly, and we will point you to where the wine can be bought.",
              },
              {
                q: "What does a tasting involve?",
                a: "We come to you with six to eight bottles chosen against the brief you send, usually within two weeks of your enquiry. It takes about an hour.",
              },
            ].map((item) => (
              <article key={item.q} className="cell-hover bg-background p-7">
                <h3 className="text-xl leading-tight">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
