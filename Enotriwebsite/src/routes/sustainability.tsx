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
          "How Enotri Wine Imports selects producers who farm responsibly: organic and biodynamic estates, independently certified for fair labour and environmental care.",
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
    body: "Organic certification verifies that grapes are grown without synthetic herbicides, pesticides, or fertilisers, and that winemaking follows strict limits on additives and sulphites. Certified estates build soil fertility through composting, cover crops, and natural pest control. For buyers, it is a clear, audited guarantee that the wine in the glass comes from a vineyard farmed in balance with its ecosystem.",
  },
  {
    logo: certHveAsset.url,
    name: "HVE — Haute Valeur Environnementale",
    body: "HVE is France's highest level of environmental certification for farms, established by the Ministry of Agriculture. Level 3 certification is based on measured performance across biodiversity, plant protection, fertilisation, and water management — not just intentions. It signals a French estate that can demonstrate, through independent audit, that its environmental results rank among the best in the country.",
  },
  {
    logo: certWietaAsset.url,
    name: "WIETA — Wine and Agricultural Ethical Trade Association",
    body: "The WIETA Code of Conduct promotes fair labour practices and social responsibility within South Africa's wine and agricultural sectors. It addresses fair wages, working conditions, health and safety, workers' rights, and environmental sustainability. Certification requires regular independent audits, so a WIETA seal on a wine means the people behind it were treated fairly — verified, not merely claimed.",
  },
  {
    logo: certSwsaAsset.url,
    name: "Integrity & Sustainability Certified — Wine and Spirit Board",
    body: "Administered by South Africa's Wine and Spirit Board, this seal guarantees both certified origin under the Wine of Origin scheme and compliance with sustainability standards throughout the production chain. Each numbered seal is fully traceable from vineyard to bottle. It is one of the wine world's most rigorous proofs that what is on the label is genuinely what is in the bottle.",
  },
  {
    logo: certEuOrganicAsset.url,
    name: "EU Organic Certification",
    body: "The green leaf of stars is the European Union's mandatory logo for certified organic products. It confirms that at least 95% of agricultural ingredients were produced under EU organic rules — no synthetic chemicals, no GMOs, and strict controls at every stage of production and bottling. For European wines in our portfolio, it is the baseline mark of verified organic farming.",
  },
  {
    logo: certEuOrganicAsset.url,
    name: "PT-BIO-03 (European Regulation)",
    body: "PT-BIO-03 is a certification standard under EU Regulation (EC) No 834/2007 for organic food and agricultural production. It ensures products are grown without synthetic chemicals, GMOs, or artificial additives, with a focus on biodiversity, soil fertility, and environmental health through methods like crop rotation and organic fertilisers. Certified products meet EU organic standards and are traceable from farm to table.",
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
            <h2 className="mt-4 text-3xl md:text-4xl">A global leader in sustainable wine</h2>
          </div>
          <div className="prose-enotri max-w-2xl">
            <p>
              South Africa is one of the most progressive wine-producing countries in the world when
              it comes to sustainability, ethical trade, and social transformation.
            </p>
            <p>
              Having worked in South African vineyards and cellars, our founder has seen firsthand
              how many producers combine exceptional winemaking with a deep commitment to
              environmental stewardship and worker empowerment.
            </p>
            <p>
              The country has developed some of the wine industry's most comprehensive certification
              systems, providing consumers with confidence that the wines they enjoy are produced
              responsibly.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          <img
            src="/images/site/vineyard-rioja.webp"
            alt="Young vines under a mountain ridge in Rioja"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
          <img
            src="/images/site/winery-aerial.webp"
            alt="Aerial view of a winery surrounded by its own vineyards"
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
      </Section>

      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="eyebrow">Certifications</p>
          <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">Verified, not merely claimed</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
            Enotri partners with producers who hold internationally recognised certifications for
            environmental and social responsibility — independent proof behind the promises on the
            label.
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
                Avoids synthetic herbicides, pesticides, and fertilizers while promoting soil health
                through composting, cover crops, and natural pest control.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-2xl">Biodynamic Farming</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Builds on organic principles and views the vineyard as a self-sustaining ecosystem,
                integrating biodiversity, compost preparations, and natural rhythms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Better grapes produce more distinctive wines
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Sustainable farming produces better grapes. For our customers, this means wines with:
            </p>
            <ul className="prose-enotri mt-4">
              <li>Greater authenticity</li>
              <li>Stronger sense of place</li>
              <li>Long-term quality consistency</li>
              <li>Transparent provenance</li>
              <li>Positive social and environmental impact</li>
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
