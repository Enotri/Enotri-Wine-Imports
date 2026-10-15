import { createFileRoute } from "@tanstack/react-router";
const sheepGrazingAsset = { url: "/images/site/sustainabilty.webp" };
const certAbAsset = { url: "/images/site/cert-ab.webp" };
const certHveAsset = { url: "/images/site/cert-hve.webp" };
const certWietaAsset = { url: "/images/site/cert-wieta.webp" };
const certSwsaAsset = { url: "/images/site/cert-swsa.webp" };
const certEuOrganicAsset = { url: "/images/site/cert-eu-organic.webp" };
import { CtaBand, Section } from "@/components/page-parts";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Enotri Wine Imports" },
      {
        name: "description",
        content:
          "How Enotri Wine Imports chooses producers who farm responsibly, and what the organic, biodynamic, labour and environmental certifications in the portfolio actually check.",
      },
      { property: "og:title", content: "Sustainability at Enotri Wine Imports" },
      {
        property: "og:description",
        content:
          "Crafted by growers. Guided by responsibility. Environmental, social and economic stewardship.",
      },
    ],
  }),
  component: Sustainability,
});

const pillars = [
  {
    title: "Environmental Stewardship",
    body: "Protecting soils, water resources, and ecosystems for future generations.",
  },
  {
    title: "Social Responsibility",
    body: "Ensuring fair wages, safe working conditions, housing, education, and opportunities for workers and their families.",
  },
  {
    title: "Economic Viability",
    body: "Supporting family businesses that can continue investing in their vineyards, communities, and quality over the long term.",
  },
];

const certifications = [
  {
    logo: certAbAsset.url,
    name: "Organic Winemaking",
    body: "Certified organic vineyards may use only fertilisers and plant treatments from an authorised list, such as compost, copper and sulphur. In the cellar, organic rules restrict additives and cap sulphites below conventional limits: 100 mg/L for a dry red, against 150 mg/L. Each estate is inspected by an independent, approved certifier.",
  },
  {
    logo: certHveAsset.url,
    name: "HVE — Haute Valeur Environnementale",
    body: "Haute Valeur Environnementale is the top tier of France's state environmental certification for farms. Accredited, independent auditors assess Level 3 on measured results in four areas: biodiversity, plant protection, fertiliser use and water management. HVE is separate from organic certification.",
  },
  {
    logo: certWietaAsset.url,
    name: "WIETA — Wine and Agricultural Ethical Trade Association",
    body: "WIETA is a non-profit body founded in 2002 to promote ethical trade in South African wine. Independent third-party auditors check members on labour and human rights, working conditions, health and safety, and worker housing, through site inspections and worker interviews. A wine carries WIETA's Fair Labour Practice seal only when every grower, cellar and bottler in its chain has passed.",
  },
  {
    logo: certSwsaAsset.url,
    name: "Integrity & Sustainability Certified — Wine Certification Authority",
    body: "Issued by South Africa's Wine Certification Authority (formerly the Wine and Spirit Board), this seal certifies a wine's origin, vintage and grape variety. It also confirms that every vineyard, cellar and bottling facility involved meets the Integrated Production of Wine (IPW) environmental guidelines. Each seal carries a unique number, and since 2025 a QR code, linking the bottle to its certified source. Labour standards are certified separately, by WIETA or Fairtrade.",
  },
  {
    logo: certEuOrganicAsset.url,
    name: "EU Organic Certification",
    body: "The EU organic logo, twelve white stars forming a leaf on a green background, may appear only on certified organic products in which at least 95% of the agricultural ingredients are organic. It is compulsory on pre-packaged organic food made in the EU and optional on imports, and is always shown with the certifier's code and where the ingredients were farmed. EU organic rules exclude GMOs and limit farming inputs to an authorised list.",
  },
];

function Sustainability() {
  return (
    <>
      <section className="film-hero h-[78vh] min-h-[480px] border-b border-border">
        <img
          src={sheepGrazingAsset.url}
          alt="Sheep grazing on a green hillside below terraced vines and trees"
          width={1800}
          height={1350}
          className="hero-media"
          // The flock sits in the lower third of this 4:3 shot; keep it in frame
          // when the wide hero crops the top and bottom.
          style={{ objectPosition: "center 68%" }}
        />
        <div className="hero-scrim" />
        <div className="hero-inner">
          <p className="hero-kicker">Sustainability</p>
          <h1 className="hero-title">Crafted by Growers. Guided by Responsibility.</h1>
        </div>
      </section>

      <Section>
        <div className="prose-enotri max-w-3xl">
          <p>
            At Enotri Wine Imports, sustainability is not a marketing trend. It is a core principle
            that shapes the wines we choose and the producers we represent.
          </p>
          <p>
            We work with family-owned estates and independent growers who understand that great wine
            begins with healthy vineyards, thriving communities, and long-term stewardship of the
            land. Our role is to connect Alberta restaurants, retailers, and wine lovers with
            producers whose practices respect both people and place.
          </p>
          <p>
            Many of the producers in our portfolio farm organically, biodynamically, or according to
            rigorous sustainability standards. They reduce chemical inputs, conserve water, protect
            biodiversity, and invest in the wellbeing of the people who make their wines possible.
          </p>
        </div>
      </Section>

      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="eyebrow">Three pillars</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">
            Sustainability means more than farming
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.title} className="card-lift border-t border-border pt-5">
                <span className="text-xs tracking-[0.2em] text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl leading-relaxed text-muted-foreground">
            When these three pillars are in balance, vineyards become healthier, communities become
            stronger, and wines more faithfully express their provenance.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="eyebrow">South Africa</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Checked from vineyard to bottle</h2>
          </div>
          <div className="prose-enotri max-w-2xl">
            <p>
              South Africa built industry-wide checks early: an environmental scheme, Integrated
              Production of Wine (IPW), since 1998; a national ethical-trade body, WIETA, since
              2002; and, since the 2010 harvest, a bottle seal that certifies both origin and
              sustainable production.
            </p>
            <p>
              Having worked in South African vineyards and cellars, our founder has seen firsthand
              how many producers combine exceptional winemaking with a deep commitment to
              environmental stewardship and worker empowerment.
            </p>
            <p>
              On a certified bottle, the seal's number can be checked with the certifying authority
              and traced back to the vineyard the wine came from.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          <img
            src="/images/sustainability/sustainability-1.jpg"
            alt="Sheep grazing below a turreted stone château"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-[center_45%]"
          />
          <img
            src="/images/sustainability/sustainability-2.jpg"
            alt="A horse in a sunlit meadow above vineyard rows"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-[center_80%]"
          />
        </div>
      </Section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="eyebrow">Certifications</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">Verified, not merely claimed</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
            Several of our producers hold independent certifications for how they farm and how they
            treat the people who work for them. Here is what each one checks, and who checks it.
          </p>
          <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <article key={c.name} className="text-center">
                <img
                  src={c.logo}
                  alt={`${c.name} certification logo`}
                  className="mx-auto h-36 w-auto max-w-[180px] object-contain"
                  loading="lazy"
                />
                <h3 className="mt-6 text-lg font-semibold underline decoration-primary/40 underline-offset-4">
                  {c.name}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow">In the vineyard</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Organic and biodynamic farming</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Many of our producers practice organic or biodynamic viticulture. Both approaches
              encourage healthier vineyards and wines that more transparently reflect their terroir.
            </p>
          </div>
          <div className="grid gap-8">
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">Organic Farming</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Builds soil health with compost, cover crops and natural pest control, and limits
                vine treatments to an authorised list, such as copper and sulphur.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">Biodynamic Farming</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Builds on organic principles and views the vineyard as a self-sustaining ecosystem,
                integrating biodiversity, compost preparations, and natural rhythms. Certification
                is private, awarded by bodies such as Demeter and Biodyvin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Know how every wine is farmed</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We tell you how each estate farms, and whether that farming is certified. For your
              list, that means wines with:
            </p>
            <ul className="prose-enotri mt-4">
              <li>A clear sense of place</li>
              <li>Origin you can trace on certified bottles</li>
              <li>Farming described plainly, estate by estate</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Our commitment</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Growers who think beyond the next harvest</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              At Enotri Wine Imports, we actively seek producers who:
            </p>
            <ul className="prose-enotri mt-4">
              <li>Farm responsibly</li>
              <li>Protect biodiversity</li>
              <li>Support workers and local communities</li>
              <li>Preserve family ownership</li>
              <li>Produce wines of integrity and character</li>
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We believe the finest wines are created by growers who work to leave their land in
              better condition for future generations.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="eyebrow text-gold">Drink With Purpose</p>
          <h2 className="mt-5 text-3xl text-sand md:text-5xl">Every bottle tells a story</h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-sand/85">
            When you choose wines from Enotri Wine Imports, you support growers and families who are
            committed to protecting the vineyards, landscapes, and communities that make great wine
            possible.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
