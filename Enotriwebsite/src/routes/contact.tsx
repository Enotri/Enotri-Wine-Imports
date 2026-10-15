import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section } from "@/components/page-parts";

const EMAIL = "rallings@enotri.ca";

const fieldClass =
  "mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary";
const labelClass = "text-xs uppercase tracking-[0.18em] text-foreground";

function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    venue: "",
    role: "Restaurant / bar",
    message: "",
  });

  const href =
    `mailto:${EMAIL}?subject=` +
    encodeURIComponent(`Tasting enquiry — ${form.venue || form.name || "Enotri"}`) +
    "&body=" +
    encodeURIComponent(
      `Name: ${form.name}\nVenue: ${form.venue}\nType: ${form.role}\n\n${form.message}`,
    );

  return (
    <form
      className="mt-6 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <div>
        <label className={labelClass} htmlFor="name">
          Your name
        </label>
        <input
          id="name"
          required
          className={fieldClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="venue">
          Venue or business
        </label>
        <input
          id="venue"
          className={fieldClass}
          value={form.venue}
          onChange={(e) => setForm({ ...form, venue: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="role">
          You are a
        </label>
        <select
          id="role"
          className={fieldClass}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Restaurant / bar</option>
          <option>Retailer</option>
          <option>Sommelier / buyer</option>
          <option>Private client</option>
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="message">
          What are you looking for?
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="e.g. two by-the-glass whites under $22 wholesale, plus a Nebbiolo for the fall list."
          className={fieldClass}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="rounded-sm border border-primary px-7 py-3 text-label uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Send enquiry
      </button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Opens your email app with the details filled in. Prefer to write directly?{" "}
        <a className="underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </p>
    </form>
  );
}

export const Route = createFileRoute("/contact")({
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
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a tasting"
        intro="Tell us what you pour and what you need. We reply within two business days with a proposed line-up and dates — no account or minimum order required to start."
      />

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Enotri Wine Imports</h2>
            <dl className="mt-8 space-y-6 text-sm">
              <div className="border-t border-border pt-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground">Email</dt>
                <dd className="mt-2 text-muted-foreground">
                  <a className="hover:opacity-70" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground">
                  Response time
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  Within two business days, from a person — Rawlings answers the trade enquiries
                  himself.
                </dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground">Based in</dt>
                <dd className="mt-2 text-muted-foreground">Edmonton, Alberta, Canada</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground">Ordering</dt>
                <dd className="mt-2 text-muted-foreground">
                  Licensed trade orders are placed through Connect Logistics on standard Alberta
                  terms. Private clients can enquire about allocation and availability directly.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="eyebrow">Enquiry</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Send the brief</h2>
            <EnquiryForm />
          </div>
        </div>
      </Section>

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
