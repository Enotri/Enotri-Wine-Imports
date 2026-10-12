const roncatheImg = { url: "/images/site/roncathe_soave.webp" };
const granettoImg = { url: "/images/site/granetto-pinot-grigio.webp" };
const carmenereImg = { url: "/images/site/carmenere.webp" };
const roncatheSheet = { url: "/docs/roncathe-soave-tech-sheet.pdf" };
const granettoSheet = { url: "/docs/granetto.pdf" };
const calcareoSheet = { url: "/docs/calcareo.pdf" };
const calcareo3Sheet = { url: "/docs/calcareo-3.pdf" };
const corteMoschinaLogo = { url: "/images/site/image002.webp" };
const ferreroImg = { url: "/images/site/federico-ferrero.webp" };
const ferreroPortraitImg = { url: "/images/site/federico-ferrero-2.webp" };
const ferreroFamilyImg = { url: "/images/site/federico-ferrero-family.webp" };
const ferreroBottleImg = { url: "/images/site/langhe-nebbiolo-nvie-wines.webp" };
const pasettiTeamImg = { url: "/images/site/pasetti-team.webp" };
const pasettiFamilyImg = { url: "/images/site/pasetti-family.webp" };
const pasettiHeroImg = { url: "/images/site/pasetti-hero.webp" };
const zaccagniniVineyardImg = { url: "/images/site/zaccagnini-vineyard.webp" };
const zaccagniniTeamImg = { url: "/images/site/zaccagnini-team.webp" };
const argonautaImg = { url: "/images/site/argonauta-verdicchio.webp" };
const passerinaImg = { url: "/images/site/zaccagnini-passerina.webp" };
const verdicchioClassicoImg = { url: "/images/site/zaccagnini-verdicchio-classico.webp" };
const herasCordonReservaImg = { url: "/images/site/heras-cordon-reserva.webp" };
const herasCordonVendimiaImg = { url: "/images/site/heras-cordon-vendimia-seleccionada.webp" };
const herasCordonTrioImg = { url: "/images/site/heras-cordon-trio.webp" };
const elPropositoImg = { url: "/images/site/el-proposito.webp" };
const lapueblaGalacticoImg = { url: "/images/site/lapuebla-galactico.webp" };
const viticultoresBarrelsImg = { url: "/images/site/viticultores-barrels.webp" };
const viticultoresVineyardImg = { url: "/images/site/viticultores-vineyard.webp" };
const chateauCaractereImg = { url: "/images/site/chateau-caractere.webp" };
const chateauGrainsFinsImg = { url: "/images/site/chateau-grains-fins.webp" };
const chateauLesChosesALEnversImg = { url: "/images/site/chateau-les-choses-a-lenvers.webp" };
const chateauLesChosesEnRoseImg = { url: "/images/site/chateau-les-choses-en-rose.webp" };
const chateauLesChosesQuOnAimeImg = { url: "/images/site/chateau-les-choses-quon-aime.webp" };
const chateauNectarImg = { url: "/images/site/chateau-nectar.webp" };
const chateauVineyardImg = { url: "/images/site/chateau-de-la-grave-vineyard.webp" };
const chateauCaractereSheet = { url: "/docs/chateau-caractere.pdf" };
const chateauGrainsFinsSheet = { url: "/docs/chateau-grains-fins.pdf" };
const chateauLesChosesALEnversSheet = { url: "/docs/chateau-les-choses-a-lenvers.pdf" };

export type Wine = {
  name: string;
  producer: string;
  producerUrl?: string;
  region: string;
  country: string;
  colour: "Red" | "White" | "Rosé" | "Sparkling" | "Sweet";
  grapes: string;
  note: string;
  image?: string;
  techSheet?: string;
};

export type Producer = {
  name: string;
  logo?: string;
  logoClassName?: string;
  logoContainsName?: boolean;
  tileFullBleed?: boolean;
  heroImage?: { src: string; alt: string; caption?: string };
  gallery?: { src: string; alt: string; caption: string; group?: string }[];
  region: string;
  country: string;
  farming: string;
  summary: string;
  story: string[];
};

export function producerSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function producerByName(name: string): Producer | undefined {
  return producers.find((p) => p.name === name);
}

export const producers: Producer[] = [
  {
    name: "Corte Moschina",
    logo: corteMoschinaLogo.url,
    logoContainsName: true,
    heroImage: {
      src: "/images/site/corte-moschina-family.webp",
      alt: "The Corte Moschina family standing among the vines in Roncà",
      caption: "The Corte Moschina family in their Roncà vineyards",
    },
    gallery: [
      {
        src: "/images/producers/corte-moschina/2.webp",
        alt: "Rolling hills of vineyards and woodland under a hazy sky",
        caption: "The vineyard hills around Corte Moschina",
      },
      {
        src: "/images/producers/corte-moschina/4.webp",
        alt: "Vines turning gold in autumn, with terraced hills behind",
        caption: "Autumn colour in the vineyards",
      },
      {
        src: "/images/producers/corte-moschina/3.webp",
        alt: "Close-up of dark volcanic rock flecked with yellow lichen",
        caption: "Volcanic basalt, the rock beneath the estate's soils",
      },
    ],
    region: "Roncà, Veneto",
    country: "Italy",
    farming: "Organic",
    summary:
      "Viticoltori in Roncà: an organic family estate working basalt-rich volcanic soils at the foot of the Monti Lessini and the limestone slopes of the Colli Berici.",
    story: [
      "Corte Moschina farms in Roncà, in the eastern hills of Veneto, where ancient volcanic activity left behind basalt-rich soils that give the estate's Soave its unmistakable flinty, savoury edge. The family have been viticoltori in Roncà for generations, and the name on every label is a statement of place rather than a brand.",
      "The estate works organically, with trellised vines, low yields and a preference for slow, even ripening. Alongside the volcanic Roncà parcels, Corte Moschina farms limestone-rich sites in the Colli Berici, where excellent drainage and a wide day-to-night temperature swing build elegance, fine structure and clear mineral character.",
      "In the cellar the wines are handled quietly: cool, patient fermentations for the whites and gentle skin contact for the reds. The result is a range — Roncathe Soave, Granetto Pinot Grigio and Calcàreo Carménère — that tastes precisely of the soils it comes from.",
    ],
  },
  {
    name: "Ferrero Federico",
    logo: ferreroPortraitImg.url,
    logoClassName: "max-h-24 w-auto object-contain",
    tileFullBleed: true,
    gallery: [
      {
        src: ferreroImg.url,
        alt: "Federico Ferrero in the tasting room with the estate's wines",
        caption: "Federico Ferrero with the estate's range in Mango",
      },
      {
        src: ferreroFamilyImg.url,
        alt: "The Ferrero family among their vineyards in the Langhe hills",
        caption: "Four generations of the Ferrero family in the vineyards of Mango",
      },
      {
        src: "/images/producers/ferrero-federico/1.webp",
        alt: "A grassy track between vine rows leading to a small chapel with a bell tower",
        caption: "Between the rows, looking up to the chapel",
      },
      {
        src: "/images/producers/ferrero-federico/2.webp",
        alt: "A brick farmhouse with a tiled roof behind a flowering garden",
        caption: "At the estate in Mango",
      },
    ],
    region: "Mango, Piedmont",
    country: "Italy",
    farming: "Sustainable",
    summary:
      "A fourth-generation family estate in Mango, in the heart of the Langhe, farming Nebbiolo and the classic Piedmontese varieties on the hills between the Langhe and Monferrato.",
    story: [
      "The Ferrero family have farmed the hills of Mango since 1905, when the estate was founded on the steep, south-facing slopes where the Langhe meets Monferrato. Four generations on, the winery is led by Federico Ferrero, who has brought a modern, precise touch to the cellar while keeping the family's deep respect for the land intact.",
      "The vineyards sit at altitude on marl and limestone soils, worked by hand with a sustainable approach: cover crops between the rows, careful canopy management and low yields to concentrate the character of each site. Nebbiolo is the soul of the estate, flanked by Barbera, Dolcetto and the white varieties of the region.",
      "In the cellar the philosophy is restraint — long, gentle macerations and patient ageing in large cask for the Barolo, so that tar, rose petal and the firm, noble tannin of Nebbiolo speak clearly. The result is a range of wines that are unmistakably Mango: structured, fragrant and built for the table.",
    ],
  },
  {
    name: "Pasetti",
    logo: pasettiTeamImg.url,
    tileFullBleed: true,
    heroImage: {
      src: pasettiHeroImg.url,
      alt: "The Pasetti family at the estate",
      caption: "The Pasetti family — five generations of Abruzzo winegrowers",
    },
    gallery: [
      {
        src: pasettiFamilyImg.url,
        alt: "Barrels in the Pasetti cellar",
        caption: "The Pasetti barrel cellar",
      },
      {
        src: "/images/site/pasetti-estate.webp",
        alt: "The stone Pasetti estate building and its brick staircase",
        caption: "The Pasetti estate in Pescosansonesco",
      },
      {
        src: "/images/site/pasetti-vineyard.webp",
        alt: "Pasetti vineyards at sunset beneath a hilltop village",
        caption: "Vineyards at dusk in the Abruzzo hills",
      },
      {
        src: "/images/producers/pasetti/1.webp",
        alt: "Vineyard blocks on a green hillside below rocky mountain peaks",
        caption: "Pasetti vineyards at Capestrano",
      },
      {
        src: "/images/producers/pasetti/2.webp",
        alt: "Rows of oak barrels stamped Pasetti in a vaulted cellar",
        caption: "Barrels ageing in the Pasetti cellar",
      },
      {
        src: "/images/producers/pasetti/3.webp",
        alt: "A gloved hand holding a bunch of dark red grapes on the vine",
        caption: "Picking red grapes at harvest",
      },
      {
        src: "/images/producers/pasetti/4.webp",
        alt: "Bunches of pale green grapes hanging among vine leaves",
        caption: "White grapes on the vine at harvest time",
      },
    ],
    region: "Pescosansonesco, Abruzzo",
    country: "Italy",
    farming: "Organic",
    summary:
      "A historic Abruzzo estate on the slopes of the Gran Sasso, where the Pasetti family has farmed Montepulciano and Pecorino at altitude for five generations.",
    story: [
      "The Pasetti family's roots in Abruzzo reach back to the early 1900s, in the mountains around Pescosansonesco, in the shadow of the Gran Sasso massif. What began as a small family holding has grown, over five generations, into one of the region's benchmark estates — still family-run, still farmed by the people whose name is on the label.",
      "The vineyards climb between 450 and 600 metres, among the highest in the region, where cool nights and constant mountain breezes keep the fruit bright and aromatic even in warm years. Montepulciano is the heart of the estate — bottled as Madonnella and the riserva Testarossa — alongside Pecorino, the once-forgotten white variety the family helped revive, seen at its best in Collecivetta.",
      "In the cellar the approach mirrors the vineyards: organic farming, native fermentations and long, patient élevage so the mountain character — dark cherry, violet and a savoury herbal edge — comes through unvarnished. These are wines of altitude and attitude, unmistakably Abruzzo.",
    ],
  },
  {
    name: "Zaccagnini",
    logo: zaccagniniTeamImg.url,
    tileFullBleed: true,
    heroImage: {
      src: zaccagniniVineyardImg.url,
      alt: "Zaccagnini vineyards in Bolognano, framed by an old tree",
      caption: "The Zaccagnini vineyards in Bolognano, between the Majella and the Adriatic",
    },
    gallery: [
      {
        src: zaccagniniVineyardImg.url,
        alt: "Vineyard rows at Zaccagnini under a spreading tree",
        caption: "Old vines and olive trees in the hills of Bolognano",
      },
    ],
    region: "Bolognano, Abruzzo",
    country: "Italy",
    farming: "Sustainable",
    summary:
      "A landmark Abruzzo estate in Bolognano, farming Montepulciano and Trebbiano on the clay hills between the Majella mountains and the Adriatic since 1978.",
    story: [
      "Zaccagnini was founded in 1978 in Bolognano, a small village in the Pescara valley where the Majella massif meets the rolling hills that run down to the Adriatic. From a modest family holding, Marcello Zaccagnini built the estate into one of the reference names of Abruzzo, proving that Montepulciano from these clay hills could stand with the great reds of Italy.",
      "The vineyards spread across more than 300 hectares of hillsides, farmed with a sustainable approach that respects the rhythms of the land between mountain and sea. Cold air descending from the Majella meets warm Adriatic breezes, a constant natural ventilation that keeps the fruit healthy and builds the freshness that marks every Zaccagnini wine.",
      "The estate's signature is the tralcetto — the small vine shoot tied by hand around the neck of every bottle, a gesture from the vineyards themselves. In the cellar, Montepulciano d'Abruzzo and Trebbiano are handled with the same care as in the vines: ripe red berry fruit, white pepper and soft, drinkable tannins, made to bring the character of Bolognano to tables everywhere.",
    ],
  },
  {
    name: "Stellenrust Family Vineyards",
    logo: "/images/producers/stellenrust-family-vineyards/1.webp",
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/stellenrust-family-vineyards/1.webp",
      alt: "Aerial view of a tractor and pickers working between long rows of vines at harvest",
    },
    gallery: [
      {
        src: "/images/producers/stellenrust-family-vineyards/2.webp",
        alt: "Two men holding glasses of white wine, standing waist-deep in the vines",
        caption: "Tasting in the vineyard",
      },
      {
        src: "/images/producers/stellenrust-family-vineyards/3.webp",
        alt: "A bunch of pale green grapes hanging among sunlit vine leaves",
        caption: "White grapes ripening on the vine",
      },
    ],
    region: "Stellenbosch",
    country: "South Africa",
    farming: "WIETA & IPW certified",
    summary:
      "Fourth-generation growers farming old-vine Chenin Blanc on decomposed granite, with one of the Cape's most respected ethical-labour records.",
    story: [
      "Stellenrust is a fourth-generation family estate in the Bottelary Hills of Stellenbosch, where the mantle passed from father to son and the vineyards grew older with every handover. Today the farm guards some of the Cape's most treasured old bush vines, Chenin Blanc planted as far back as the 1960s on decomposed granite that drains fast and ripens slowly.",
      "What sets Stellenrust apart is not only the age of its vines but the way the estate treats the people who tend them. With WIETA and IPW certification and one of the most respected ethical-labour records in the Cape, the family has long argued that great wine and fair farming are inseparable.",
      "In the cellar the approach is deliberately quiet: native fermentations, gentle handling and a preference for texture over make-up. The result is Chenin Blanc of real depth and a range of reds that speak clearly of Stellenbosch granite.",
    ],
  },
  {
    name: "Bosman Family",
    logo: "/images/producers/bosman-family/2.webp",
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/bosman-family/2.webp",
      alt: "Curving rows of young vines on a hillside at sunset, with mountains in the distance",
    },
    gallery: [
      {
        src: "/images/producers/bosman-family/1.webp",
        alt: "A grower in leather boots checking bunches of black grapes on a bush vine",
        caption: "Checking the grapes on bush vines",
      },
      {
        src: "/images/producers/bosman-family/3.webp",
        alt: "A person standing on a fynbos-covered hillside as the sun sets behind the mountains",
        caption: "Fynbos and mountains at sunset",
      },
    ],
    region: "Wellington",
    country: "South Africa",
    farming: "Fairtrade, employee-owned",
    summary:
      "Eight generations of vine growers and South Africa's largest vine nursery, with a landmark worker equity scheme at the heart of the estate.",
    story: [
      "The Bosman family have been growing vines in Wellington since before South Africa had a wine industry worth the name. Eight generations on, their farm Lelienfontein is also home to the country's largest vine nursery, supplying plant material to estates across the Cape — a quiet reminder that the Bosmans understand the vine from the root up.",
      "In 2007 the family completed a landmark transaction: a 26% share of the business was transferred to the Adama Workers Trust, giving the people who farm the land a real stake in its future. It remains one of the most significant worker equity schemes in South African wine, and it shapes every decision the estate makes.",
      "The wines follow the same philosophy of patience and fairness. From high, dry-farmed slopes come Chenin Blanc and reds that favour freshness and honesty over extraction — wines made to be drunk generously and shared widely.",
    ],
  },
  {
    name: "Reyneke",
    gallery: [
      {
        src: "/images/producers/reyneke/1.webp",
        alt: "Hands sorting freshly picked black grapes on a sorting table",
        caption: "Sorting the harvest by hand",
      },
    ],
    region: "Polkadraai Hills",
    country: "South Africa",
    farming: "Biodynamic (Demeter)",
    summary:
      "Pioneers of biodynamic viticulture in the Cape, making Syrah and Cabernet of unusual clarity from decomposed granite slopes.",
    story: [
      "Johan Reyneke took over his family's farm in the Polkadraai Hills in the late 1990s and almost immediately began asking uncomfortable questions about how the Cape's vineyards were being farmed. His answer was biodynamics, and Reyneke became one of the first estates in South Africa to be certified by Demeter — long before it was fashionable.",
      "The farm's vineyards sit on decomposed granite slopes overlooking False Bay, farmed with cover crops, compost and preparations, with native yeasts doing the work of fermentation. Nothing is added to disguise the site; the goal is a wine that could come from nowhere else.",
      "Syrah and Cabernet Sauvignon are the signatures, and they show an unusual clarity and restraint for the Cape. Reyneke's wines are proof that biodynamic farming, practised seriously, belongs in the conversation about South Africa's finest estates.",
    ],
  },
  {
    name: "Domaine des Ardoisières",
    region: "Savoie",
    country: "France",
    farming: "Organic, hand-terraced",
    summary:
      "Terraced schist vineyards reclaimed from the alpine hillside, planted to Jacquère, Mondeuse and Persan on impossible gradients.",
    story: [
      "Domaine des Ardoisières began with a bet that few would have taken: to reclaim the abandoned schist terraces above the village of Fréterive in Savoie, slopes so steep they had been left to the forest for decades. Brice Omont and his partners cleared, rebuilt and replanted them by hand.",
      "The vineyards are farmed organically on gradients that make machinery impossible and even walking difficult. Jacquère, Mondeuse and the near-lost Persan grow here on pure alpine schist, at altitudes where ripening is a season-long negotiation with the mountains.",
      "The wines are some of the most distinctive in France: electric, stony whites and perfumed, light-footed reds that taste unmistakably of altitude. Ardoisières has become the benchmark for what Savoie can achieve.",
    ],
  },
  {
    name: "Château Lestignac",
    region: "Bergerac",
    country: "France",
    farming: "Organic, low intervention",
    summary:
      "A young family estate reviving old Sémillon and Merlot plots with native yeasts and minimal sulphur.",
    story: [
      "Château Lestignac is the story of Mathias Marquet and Camille Rivière, who took over a family property in the hills south of Bergerac and chose the harder road. Where the region's old vineyards were being pulled up or farmed conventionally, they converted to organics and began nursing old Sémillon and Merlot plots back to health.",
      "The cellar work is as gentle as the farming: native yeasts, long, slow fermentations, and sulphur used sparingly or not at all. Nothing is rushed, and wines are released only when they are ready rather than when the market asks.",
      "The result is a range that has quietly become a reference for the southwest — whites of waxy depth and reds of unusual poise, made in tiny quantities by a family who answered the question of what Bergerac could be.",
    ],
  },
  {
    name: "Cantina Giardino",
    region: "Campania",
    country: "Italy",
    farming: "Old vines, no additions",
    summary:
      "Guardians of ungrafted Fiano, Greco and Aglianico vines from the hills of Irpinia, vinified in amphora and old chestnut.",
    story: [
      "Cantina Giardino was founded in the hills of Irpinia, inland from Naples, by a group of friends determined to save the region's oldest vines from abandonment. Many of the parcels they work hold ungrafted Fiano, Greco and Aglianico — living archives of Campanian viticulture, some well over a century old.",
      "Each parcel is vinified separately in a cellar of amphorae, old chestnut casks and weathered oak, with no additions and no corrections. The wines are held back, sometimes for years, until they have settled into themselves.",
      "These are not polished wines, and they are not meant to be. They are fierce, savoury and deeply rooted in volcanic Irpinian soil — bottles that carry the character of the hills and the stubbornness of the people who refused to let the old vines go.",
    ],
  },
  {
    name: "Bodegas Cauzón",
    region: "Granada",
    country: "Spain",
    farming: "Organic, high altitude",
    summary:
      "Vineyards at 1,200 metres in the Sierra Nevada foothills, producing bright Tempranillo and Garnacha with mountain freshness.",
    story: [
      "Bodegas Cauzón is the work of Ramón Saavedra, who farms small parcels in the Sierra Nevada foothills near Granada at around 1,200 metres — among the highest vineyards in Europe. At this altitude the growing season is short, the nights are cold, and every vintage is earned.",
      "The vineyards are worked organically, by hand, on poor mountain soils of slate and clay. Tempranillo, Garnacha and a scattering of white varieties are vinified with native yeasts and a minimum of intervention.",
      "Altitude is the signature in the glass: bright, lifted wines with mountain freshness and moderate alcohol, a style almost impossible to find elsewhere in southern Spain. Cauzón proves that Granada's high country deserves a place on any serious wine list.",
    ],
  },
  {
    name: "Viticultores de Lapuebla",
    logo: viticultoresBarrelsImg.url,
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/viticultores-de-lapuebla/1.webp",
      alt: "Rows of low bush vines across a valley, with a long mountain ridge in the distance",
    },
    gallery: [
      {
        src: viticultoresVineyardImg.url,
        alt: "A viticultor standing among old vines in Lapuebla de Labarca",
        caption: "Old vines in the clay-limestone soils of Lapuebla de Labarca",
      },
      {
        src: "/images/producers/viticultores-de-lapuebla/2.webp",
        alt: "Bush vines on a dry, rolling hillside dotted with trees",
        caption: "Old bush vines in Rioja Alavesa",
      },
      {
        src: "/images/producers/viticultores-de-lapuebla/3.webp",
        alt: "Gnarled bush vines in spring leaf beneath a mountain ridge",
        caption: "Fresh growth on the old vines",
      },
    ],
    region: "Rioja Alavesa",
    country: "Spain",
    farming: "Old-vine parcels, manual harvest",
    summary:
      "Growers in Lapuebla de Labarca working clay-limestone and alluvial parcels at 550 metres, with vines planted between 1940 and 1960. Classic Rioja coupages alongside single-parcel bottlings.",
    story: [
      "Viticultores de Lapuebla is a growers' project based in Lapuebla de Labarca, in the heart of Rioja Alavesa, working old family parcels that sit at around 550 metres on clay-limestone and alluvial soils. Many of the vines were planted between 1940 and 1960 and have been farmed by the same families for generations.",
      "The cellar works two registers in parallel: classic Rioja coupages — Crianza and Reserva aged in American and French oak in the traditional style — and single-parcel bottlings that isolate the character of individual old-vine sites, such as El Propósito, built almost entirely on Tempranillo with a seasoning of Viura.",
      "Harvest is manual, fermentations are patient, and oak is used as seasoning rather than flavouring. The wines carry the tension typical of Alavesa: ripe red fruit held in check by altitude and limestone, with the polish that only genuine old vines bring.",
    ],
  },
  {
    name: "Bodegas Heras Cordón",
    logo: herasCordonTrioImg.url,
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/bodegas-heras-cordon/2.webp",
      alt: "A man reading a bottle label among stacked Heras Cordón barrels",
    },
    gallery: [
      {
        src: "/images/producers/bodegas-heras-cordon/4.webp",
        alt: "A lone holm oak above rows of vines, with a mountain ridge behind",
        caption: "The holm oak among the Heras Cordón vines",
      },
      {
        src: "/images/producers/bodegas-heras-cordon/1.webp",
        alt: "A bottle of Heras Cordón Vendimia Seleccionada Rioja standing on a barrel in the cellar",
        caption: "Vendimia Seleccionada in the cellar",
      },
      {
        src: "/images/producers/bodegas-heras-cordon/3.webp",
        alt: "A man in a scarf studying a glass of red wine in the cellar",
        caption: "Tasting in the cellar",
      },
    ],
    region: "Fuenmayor, Rioja Alta",
    country: "Spain",
    farming: "Traditional, family-owned",
    summary:
      "A family-owned Rioja Alta estate in Fuenmayor, crafting classic Reserva and Vendimia Seleccionada from Tempranillo and traditional Rioja varieties.",
    story: [
      "Bodegas Heras Cordón is rooted in Fuenmayor, in the heart of Rioja Alta, where the Cordón family has been linked to wine for generations. The estate takes its name from the family itself — a statement that what goes into each bottle is personal, and that the label is a promise rather than a brand.",
      "The vineyards sit on the characteristic clay-limestone and alluvial soils of the upper Ebro valley, where Atlantic influence tempers the warmth and Tempranillo reaches its fullest expression. The family farms traditionally, with careful canopy work, low yields and hand-harvesting to preserve the freshness that defines the best Rioja Alta wines.",
      "In the cellar the approach is classic Rioja: long macerations, ageing in American and French oak, and the patience to release Reservas only when the wine has settled into itself. The result is a range of structured, food-friendly reds — polished, honest and unmistakably Rioja.",
    ],
  },

  {
    name: "Quinta da Palmirinha",
    region: "Vinho Verde",
    country: "Portugal",
    farming: "Certified organic",
    summary:
      "A one-man estate on granite in the Lima valley, making textural Loureiro and Avesso far removed from commercial Vinho Verde.",
    story: [
      "Quinta da Palmirinha is effectively a one-man estate: Fernando Paiva farms a few hectares of granite soils in the Lima valley, in the heart of Vinho Verde country, and does nearly everything himself. He was among the first growers in the region to be certified organic, and among the first anywhere in Portugal to work without added sulphur.",
      "The varieties are the local classics — Loureiro, Arinto, Avesso, Vinhão — but the wines have nothing in common with the light, fizzy commercial style the region is known for. Fernando's are textural, dry and deeply flavoured, made with chestnut-flower protection in place of sulphur and bottled without filtration.",
      "Palmirinha has become a quiet reference for natural wine in Portugal: proof that Vinho Verde's granite and Atlantic climate can produce whites of real seriousness and reds of startling character.",
    ],
  },
  {
    name: "Weingut Brand",
    gallery: [
      {
        src: "/images/producers/weingut-brand/1.webp",
        alt: "Two cupped hands holding dark, crumbly soil with a small root trailing below",
        caption: "A handful of vineyard soil",
      },
      {
        src: "/images/producers/weingut-brand/2.webp",
        alt: "Two men spraying sparkling wine in front of a wall painted with the words Pet Nat Party Wagon",
        caption: "Daniel and Jonas Brand. Photo: Peter Bender",
      },
    ],
    region: "Pfalz",
    country: "Germany",
    farming: "Organic, native yeasts",
    summary:
      "Two brothers farming sandstone and limestone parcels for chiselled Riesling and Weissburgunder.",
    story: [
      "Weingut Brand is run by brothers Daniel and Jonas Brand, the fifth generation of their family to farm in Bockenheim, in the northern Pfalz. When they took over from their father they pushed the estate fully into organic farming — certified, not just claimed — and simplified everything in the cellar.",
      "The vineyards range across the varied geology of the northern Pfalz: coloured sandstone, limestone, loess and marl. Each soil is vinified separately, with native yeasts and no fining, so that the differences arrive intact in the glass.",
      "Riesling is the heart of the estate, joined by Weissburgunder, Silvaner and a handful of old Pfalz varieties. The wines are chiselled and dry, with a clarity that has made Brand a reference point for the new generation of German organic growers.",
    ],
  },
  {
    name: "Domaine Rougeot",
    logo: "/images/producers/domaine-rougeot/1.webp",
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/domaine-rougeot/1.webp",
      alt: "A grassy farm track running between dry-stone walls through Burgundy vineyards",
    },
    gallery: [
      {
        src: "/images/producers/domaine-rougeot/2.webp",
        alt: "Rows of staked vines on stony soil under a heavy, clouded sky",
        caption: "Vines under a heavy sky",
      },
    ],
    region: "Bourgogne",
    country: "France",
    farming: "Organic conversion",
    summary:
      "Meursault-based family domaine working village and lieu-dit parcels with restraint and remarkable value.",
    story: [
      "Domaine Rougeot is a Meursault family estate with roots going back generations, brought to wider attention by Pierre-Henri Rougeot, who returned to the family domaine after working in the wine trade and set about rethinking how it farmed and vinified.",
      "The vineyards — village and lieu-dit parcels across Meursault, Pommard, Volnay and Monthélie — are in organic conversion, worked by hand with a focus on soil life. In the cellar Pierre-Henri favours native yeasts, long élevage and a deliberately light hand with sulphur, bottling many cuvées with none at all.",
      "The wines have become some of the most sought-after honest bottles in the Côte de Beaune: pure, unforced expressions of their villages, at prices that remain remarkable for Burgundy of this quality.",
    ],
  },
  {
    name: "Château de la Grave",
    logo: chateauVineyardImg.url,
    tileFullBleed: true,
    heroImage: {
      src: "/images/grave/people-famille-bassereau.webp",
      alt: "The Château de la Grave family in their vineyard",
      caption: "The Bassereau family, Château de la Grave — farming the Côtes de Bourg since 1906",
    },
    gallery: [
      {
        src: "/images/grave/estate-bordeaux.webp",
        group: "The estate",
        alt: "Château de la Grave under a dramatic sky beside a vineyard track",
        caption: "The château on its Côtes de Bourg slope",
      },
      {
        src: "/images/grave/estate-dji202608022204300058d.webp",
        group: "The estate",
        alt: "Château de la Grave seen from above at dusk",
        caption: "Evening light over the estate",
      },
      {
        src: "/images/grave/estate-017.webp",
        group: "The estate",
        alt: "Turreted façade of Château de la Grave against blue sky",
        caption: "The turreted façade",
      },
      {
        src: "/images/grave/estate-chateau.webp",
        group: "The estate",
        alt: "Château de la Grave framed by trees on its drive",
        caption: "The drive to the château",
      },
      {
        src: "/images/grave/estate-chateaux.webp",
        group: "The estate",
        alt: "Château de la Grave beside a gravel road through the vines",
        caption: "The road through the vines",
      },
      {
        src: "/images/grave/estate-welcomechateaux.webp",
        group: "The estate",
        alt: "Open iron gates leading toward the vineyards",
        caption: "The gates to the vines",
      },
      {
        src: "/images/grave/estate-img-20230712-wa0005.webp",
        group: "The estate",
        alt: "Stone wing of the château with climbing vines",
        caption: "The stone wing in autumn",
      },
      {
        src: "/images/grave/estate-poz0245.webp",
        group: "The estate",
        alt: "Château rising over green vine rows",
        caption: "Summer vines below the château",
      },
      {
        src: "/images/grave/vineyard-img9867-2.webp",
        group: "Vineyards",
        alt: "Château de la Grave behind a tree-lined hillside",
        caption: "Gravel and clay-limestone slopes",
      },
      {
        src: "/images/grave/vineyard-img-20260903-wa0056.webp",
        group: "Vineyards",
        alt: "Château skyline behind a bank of vines",
        caption: "Merlot and Malbec parcels",
      },
      {
        src: "/images/grave/vineyard-20260411111828.webp",
        group: "Vineyards",
        alt: "Sheep grazing a green Bordeaux hillside in spring",
        caption: "Grazing between the rows",
      },
      {
        src: "/images/grave/vineyard-20260625072404.webp",
        group: "Vineyards",
        alt: "A horse grazing in the dry grass of the vineyard",
        caption: "A horse at work on the estate",
      },
      {
        src: "/images/grave/vineyard-20260903074413.webp",
        group: "Vineyards",
        alt: "Wildflowers in front of the vines at sunrise",
        caption: "Wildflowers at first light",
      },
      {
        src: "/images/grave/vineyard-europe-2017-0841ps.webp",
        group: "Vineyards",
        alt: "A cluster of ripe blue grapes among green leaves",
        caption: "Ripe red grapes",
      },
      {
        src: "/images/grave/vineyard-img-20260718-wa0000.webp",
        group: "Vineyards",
        alt: "Grapes colouring at véraison",
        caption: "Véraison in July",
      },
      {
        src: "/images/grave/vineyard-img-20220528-wa0024.webp",
        group: "Vineyards",
        alt: "Sheep resting beneath the château walls",
        caption: "Sheep beneath the walls",
      },
      {
        src: "/images/grave/harvest-harvestwhitegrapes.webp",
        group: "Harvest",
        alt: "Crates of white grapes on a trailer with pickers behind",
        caption: "White grapes arriving from the vines",
      },
      {
        src: "/images/grave/harvest-2025harvest.webp",
        group: "Harvest",
        alt: "Two pickers carrying a red crate through the vines",
        caption: "Picking by hand",
      },
      {
        src: "/images/grave/harvest-beautifulphoto.webp",
        group: "Harvest",
        alt: "Hand holding a bunch of dark grapes",
        caption: "The first bunches",
      },
      {
        src: "/images/grave/harvest-image00015.webp",
        group: "Harvest",
        alt: "A picker emptying a crate of grapes",
        caption: "Emptying the crate",
      },
      {
        src: "/images/grave/harvest-image00025.webp",
        group: "Harvest",
        alt: "Grapes tipped into a tub at sunset",
        caption: "Tipping into the bin",
      },
      {
        src: "/images/grave/harvest-20210930084336.webp",
        group: "Harvest",
        alt: "Grapes pouring from a harvester under a blue sky",
        caption: "Machine harvest",
      },
      {
        src: "/images/grave/harvest-img-20260828-wa0001.webp",
        group: "Harvest",
        alt: "A hand offering a bunch of white grapes",
        caption: "White grapes at ripeness",
      },
      {
        src: "/images/grave/harvest-img-20260828-wa0005.webp",
        group: "Harvest",
        alt: "Winemaker standing among the vines at harvest",
        caption: "Walking the rows",
      },
      {
        src: "/images/grave/people-famille-bassereau.webp",
        group: "The family",
        alt: "Three members of the Bassereau family smiling together",
        caption: "The Bassereau family",
      },
      {
        src: "/images/grave/people-lou-bassereau-3.webp",
        group: "The family",
        alt: "Lou Bassereau standing among the vine rows",
        caption: "Lou in the vines",
      },
      {
        src: "/images/grave/people-lou-bassereau-4.webp",
        group: "The family",
        alt: "Lou Bassereau pruning a vine",
        caption: "Pruning in winter",
      },
      {
        src: "/images/grave/people-20250721174902.webp",
        group: "The family",
        alt: "A father and child picking grapes together",
        caption: "Picking together",
      },
      {
        src: "/images/grave/people-family.webp",
        group: "The family",
        alt: "A winemaker sitting in the grass with a white guard dog",
        caption: "With the estate dog",
      },
      {
        src: "/images/grave/people-20220727214346.webp",
        group: "The family",
        alt: "A relaxed moment on a bench with the dog",
        caption: "A moment of rest",
      },
      {
        src: "/images/grave/cellar-2.webp",
        group: "The cellar",
        alt: "Terracotta amphorae glowing in warm light",
        caption: "Terracotta jars for Dolia",
      },
      {
        src: "/images/grave/cellar-img-20260903-wa0036.webp",
        group: "The cellar",
        alt: "Terracotta jars in the dim cellar",
        caption: "Amphorae in the cellar",
      },
      {
        src: "/images/grave/cellar-20260907160119.webp",
        group: "The cellar",
        alt: "Rows of oak barrels beneath wooden beams",
        caption: "The barrel hall",
      },
      {
        src: "/images/grave/cellar-img-20260903-wa0011.webp",
        group: "The cellar",
        alt: "Stacked barrels in warm light",
        caption: "Barrels in warm light",
      },
      {
        src: "/images/grave/cellar-img-20260903-wa0030.webp",
        group: "The cellar",
        alt: "Large oak foudres lining the cellar",
        caption: "Large foudres",
      },
      {
        src: "/images/grave/cellar-img-20260903-wa0052.webp",
        group: "The cellar",
        alt: "Barrel stacks and a ladder in the cellar",
        caption: "Cellar racks",
      },
    ],
    region: "Côtes de Bourg",
    country: "France",
    farming: "Certified organic (Ecocert) & in conversion",
    summary:
      "The Bassereau family have farmed this Côtes de Bourg estate on the Bordeaux right bank since 1906, working Merlot, Cabernet Sauvignon, Malbec, Sémillon and Colombard in foudre, barrel, concrete and terracotta jars.",
    story: [
      "Château de la Grave has been in the Bassereau family since 1906, when the estate on the right bank of the Gironde, in the Côtes de Bourg, was first purchased. Five generations have farmed these gravel and clay-limestone slopes, and today the château is both a working vineyard and a family home.",
      "The estate is certified organic by Ecocert, with further parcels in conversion. Merlot, Cabernet Sauvignon and Malbec drive the reds; Sémillon and Colombard the whites. The cellar is unusually diverse for Bordeaux: foudres, barrels, concrete vats and terracotta jars are all used, chosen per cuvée rather than by habit.",
      "The range runs from the classic Château de la Grave Rouge and the deep, malbec-driven Caractère to the barrel-fermented Grains Fins blanc, the amphora-aged Dolia, the experimental Les Choses series and the estate's méthode traditionnelle sparklers. It is one of the most complete and characterful estates on Bordeaux's right bank.",
    ],
  },
];

export const wines: Wine[] = [
  {
    name: "Roncathe Soave DOC 2024",
    producer: "Corte Moschina",
    producerUrl: "https://www.cortemoschina.it",
    region: "Roncà",
    country: "Italy",
    colour: "White",
    grapes: "Soave DOC — 100% Garganega",
    note: "Organic, basalt-rich volcanic soils of the Roncà hills; crisp citrus, almond and a flinty savoury edge.",
    image: roncatheImg.url,
    techSheet: roncatheSheet.url,
  },
  {
    name: "Granetto Pinot Grigio 2025",
    producer: "Corte Moschina",
    producerUrl: "https://www.cortemoschina.it",
    region: "Colli Berici, Veneto",
    country: "Italy",
    colour: "White",
    grapes: "Colli Berici — 100% Pinot Grigio",
    note: "Limestone slopes with a stony substrate; bright, elegant fruit with real mineral lift and character.",
    image: granettoImg.url,
    techSheet: granettoSheet.url,
  },
  {
    name: "Calcàreo Carménère 2021",
    producer: "Corte Moschina",
    producerUrl: "https://www.cortemoschina.it",
    region: "Colli Berici, Veneto",
    country: "Italy",
    colour: "Red",
    grapes: "Colli Berici DOC — 100% Carménère",
    note: "Organic viticulture on limestone; structured and elegant, with ripe fruit and subtle spice.",
    image: carmenereImg.url,
    techSheet: calcareo3Sheet.url,
  },

  {
    name: "I Tarai",
    producer: "Corte Moschina",
    producerUrl: "https://www.cortemoschina.it",
    region: "Roncà",
    country: "Italy",
    colour: "White",
    grapes: "Soave Superiore — Garganega",
    note: "Volcanic soils at the foot of the Monti Lessini; ripe stone fruit, almond and a mineral edge.",
  },
  {
    name: "Barolo",
    producer: "Ferrero Federico",
    producerUrl: "https://www.ferrerofederico.it/en/",
    region: "Mango",
    country: "Italy",
    colour: "Red",
    grapes: "Barolo D.O.C.G. — Nebbiolo",
    note: "Fourth-generation family estate in Mango since 1905; tar and rose petal with firm, structured tannins.",
  },
  {
    name: "Nvie Langhe Nebbiolo",
    producer: "Ferrero Federico",
    producerUrl: "https://www.ferrerofederico.it/en/",
    region: "Mango",
    country: "Italy",
    colour: "Red",
    grapes: "Langhe D.O.C. — Nebbiolo",
    note: "The estate's approachable Nebbiolo: bright cherry, rose petal and fine, silky tannins.",
    image: ferreroBottleImg.url,
  },
  {
    name: "Passerina IGT",
    producer: "Zaccagnini",
    region: "Bolognano",
    country: "Italy",
    colour: "White",
    grapes: "Passerina IGT — Passerina",
    note: "Abruzzo's bright native white; white flowers, green pear and a crisp, salty finish.",
    image: passerinaImg.url,
  },

  {
    name: "Argonauta Verdicchio Classico Superiore 2021",
    producer: "Zaccagnini",
    region: "Castelli di Jesi, Marche",
    country: "Italy",
    colour: "White",
    grapes: "Verdicchio dei Castelli di Jesi Classico Superiore — Verdicchio",
    note: "From the classic hills around Jesi; crisp green apple, almond and a subtle saline finish.",
    image: argonautaImg.url,
  },
  {
    name: "Verdicchio dei Castelli di Jesi Classico DOC",
    producer: "Zaccagnini",
    region: "Castelli di Jesi, Marche",
    country: "Italy",
    colour: "White",
    grapes: "Verdicchio dei Castelli di Jesi Classico DOC — Verdicchio",
    note: "Classic Jesi Verdicchio; lemon zest, white almond and a clean, mineral close.",
    image: verdicchioClassicoImg.url,
  },

  {
    name: "Argile Rouge",
    producer: "Domaine des Ardoisières",
    region: "Savoie",
    country: "France",
    colour: "Red",
    grapes: "Gamay, Mondeuse, Persan",
    note: "Crunchy red fruit, iron and alpine herbs; a mountain red of real detail.",
  },
  {
    name: "Paski Fiano",
    producer: "Cantina Giardino",
    region: "Campania",
    country: "Italy",
    colour: "White",
    grapes: "Fiano",
    note: "Ungrafted vines, skin contact in amphora, chestnut ageing.",
  },
  {
    name: "Le Fole Aglianico",
    producer: "Cantina Giardino",
    region: "Campania",
    country: "Italy",
    colour: "Red",
    grapes: "Aglianico",
    note: "Volcanic soils and centenarian vines; savoury, tannic, long-lived.",
  },
  {
    name: "Cauzón Tinto",
    producer: "Bodegas Cauzón",
    region: "Granada",
    country: "Spain",
    colour: "Red",
    grapes: "Tempranillo",
    note: "1,200 metres in the Sierra Nevada; bright, aromatic, mountain-cool Tempranillo.",
  },
  {
    name: "Rosado de la Sierra",
    producer: "Bodegas Cauzón",
    region: "Granada",
    country: "Spain",
    colour: "Rosé",
    grapes: "Garnacha",
    note: "Direct press, pale copper, wild strawberry and salt.",
  },
  {
    name: "Marqués del Hueco Crianza 2020",
    producer: "Viticultores de Lapuebla",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "80% Tempranillo, 10% Mazuelo, 10% Graciano",
    note: "13 months in American oak Bordeaux barrels. Raspberry and black plum with pepper, clove and vanilla; silky tannins and a long finish.",
  },
  {
    name: "Marqués del Hueco Reserva 2016",
    producer: "Viticultores de Lapuebla",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "90% Tempranillo, 5% Mazuelo, 5% Graciano",
    note: "18 months in French and American oak from 35–40 year-old vines. Red cherry, cassis and menthol, closing on toffee and coffee.",
  },
  {
    name: "El Propósito 2023",
    producer: "Viticultores de Lapuebla",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "95% Tempranillo, 5% Viura",
    note: "10,000 bottles from 1940s–60s vines; whole-bunch fermentation in French oak vats, 7 months in barrel. Strawberry, raspberry and rose, delicate and fine.",
    image: elPropositoImg.url,
  },
  {
    name: "Galáctico",
    producer: "Viticultores de Lapuebla",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "100% Tempranillo",
    note: "A single-parcel bottling from old vines in Lapuebla de Labarca; dark cherry, liquorice and fine mountain tannins.",
    image: lapueblaGalacticoImg.url,
  },
  {
    name: "Heras Cordón Reserva",
    producer: "Bodegas Heras Cordón",
    region: "Rioja Alta",
    country: "Spain",
    colour: "Red",
    grapes: "Rioja DOCa — Tempranillo",
    note: "Classic Reserva from Rioja Alta; ripe black cherry, vanilla and sweet spice, with polished tannins and a long, savoury finish.",
    image: herasCordonReservaImg.url,
  },
  {
    name: "Heras Cordón Vendimia Seleccionada",
    producer: "Bodegas Heras Cordón",
    region: "Rioja Alta",
    country: "Spain",
    colour: "Red",
    grapes: "Rioja DOCa — Tempranillo",
    note: "A selected-harvest Rioja; bright red berry, plum and gentle oak, framed by supple tannins and fresh acidity.",
    image: herasCordonVendimiaImg.url,
  },

  {
    name: "Loureiro",
    producer: "Quinta da Palmirinha",
    region: "Vinho Verde",
    country: "Portugal",
    colour: "White",
    grapes: "Loureiro",
    note: "Organic granite-grown Loureiro with bay leaf, citrus blossom and grip.",
  },
  {
    name: "Avesso",
    producer: "Quinta da Palmirinha",
    region: "Vinho Verde",
    country: "Portugal",
    colour: "White",
    grapes: "Avesso",
    note: "Fuller, orchard-fruited and textural; a serious northern Portuguese white.",
  },
  {
    name: "Wilder Satz",
    producer: "Weingut Brand",
    region: "Pfalz",
    country: "Germany",
    colour: "White",
    grapes: "Field blend",
    note: "Co-planted, co-fermented field blend from sandstone; wild and gulpable.",
  },
  {
    name: "Riesling Trocken",
    producer: "Weingut Brand",
    region: "Pfalz",
    country: "Germany",
    colour: "White",
    grapes: "Riesling",
    note: "Dry, high-tension Riesling with lime leaf and crushed rock.",
  },
  {
    name: "Meursault 'Les Durots'",
    producer: "Domaine Rougeot",
    region: "Bourgogne",
    country: "France",
    colour: "White",
    grapes: "Chardonnay",
    note: "Classical Meursault: hazelnut, white peach, quietly persistent.",
  },
  {
    name: "Bourgogne Rouge",
    producer: "Domaine Rougeot",
    region: "Bourgogne",
    country: "France",
    colour: "Red",
    grapes: "Pinot Noir",
    note: "Village-adjacent parcels, whole-bunch inflected, exceptional value.",
  },
  {
    name: "Straw Wine",
    producer: "Stellenrust Family Vineyards",
    region: "Stellenbosch",
    country: "South Africa",
    colour: "Sweet",
    grapes: "Chenin Blanc",
    note: "Air-dried bunches; apricot, honeycomb and a bright acid spine.",
  },
  {
    name: "Nectar",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "100% Merlot, old vines",
    note: "Aged 18–24 months in foudre. Candied black fruit and balanced spicy oak over a velvet, warm and round structure.",
    image: chateauNectarImg.url,
  },
  {
    name: "Caractère",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "80% Merlot, 20% Cabernet Sauvignon",
    note: "Twelve months in oak barrel. Blueberry and blackcurrant with a fine woody note; rich, velvety and harmonious. 91 pts James Suckling.",
    image: chateauCaractereImg.url,
    techSheet: chateauCaractereSheet.url,
  },
  {
    name: "Classic",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "80% Merlot, 10% Cabernet Sauvignon, 10% Malbec",
    note: "Traditional ageing in concrete vat. Ripe red and black fruit, fleshy and fresh — a claret to drink young.",
  },
  {
    name: "Rouge Terre",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "90% Merlot, 10% Cabernet Sauvignon",
    note: "Organic and concrete-aged. Bright red fruit and fresh mint, lively acidity and a liquorice note on a crisp finish.",
  },
  {
    name: "Grains Fins",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "60% Sémillon, 40% Colombard",
    note: "Fermented and aged in oak barrel. Citrus, exotic fruit and white acacia; full and round with fine freshness.",
    image: chateauGrainsFinsImg.url,
    techSheet: chateauGrainsFinsSheet.url,
  },
  {
    name: "Dolia",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "50% Sémillon, 50% Colombard",
    note: "Fermented and aged in terracotta jars. Pure nose of white flowers, citrus and pepper; mineral, balanced and long.",
  },
  {
    name: "Les Choses qu'on Aime",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "90% Malbec, 10% Merlot",
    note: "Barrel-aged organic Malbec. Blackcurrant, blueberry and blackberry; round and velvety with a fresh, slightly acid close.",
    image: chateauLesChosesQuOnAimeImg.url,
  },
  {
    name: "Les Choses à l'Envers",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "80% Cabernet Sauvignon, 20% Merlot",
    note: "Right-bank Cabernet aged in oak. Ripe fruit, violet and pepper on a silky tannic frame. One star, Guide Hachette 2026.",
    image: chateauLesChosesALEnversImg.url,
    techSheet: chateauLesChosesALEnversSheet.url,
  },
  {
    name: "Les Choses Autrement",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "100% Merlot",
    note: "A different approach in the cellar: airy, fruity and tense with very fine tannins. Bordeaux to drink now.",
  },
  {
    name: "Les Choses sans S",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "50% Malbec, 50% Merlot",
    note: "No added sulphites, native yeast, no oak. Black cherry, fresh blackcurrant and mint; silky and immediate. 91 pts James Suckling.",
  },
  {
    name: "Les Choses en Rose",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Rosé",
    grapes: "100% Cabernet Sauvignon",
    note: "Barrel-fermented rosé of salmon hue; red fruit and subtle spice, fleshy and gastronomic with a long finish.",
    image: chateauLesChosesEnRoseImg.url,
  },
  {
    name: "Les Choses qui Pétillent Rosé",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Sparkling",
    grapes: "Pétillant naturel, rosé",
    note: "Ancestral-method pét-nat with no additions or sulphites. Fine bubbles, intense fruit and a thoroughly refreshing palate.",
  },
  {
    name: "Villa Ida Rouge",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "100% Merlot",
    note: "Aged in jar. Complex fruit aromas and a delicate palate carried by fine minerality — far from a classic Bordeaux.",
  },
  {
    name: "Villa Ida Blanc",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "70% Chenin, 30% Colombard",
    note: "Fermented and aged in jar. Exotic fruit and citrus young, floral with age; subtle acidity and beautiful minerality.",
  },
  {
    name: "Villa Ida Rosé",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Rosé",
    grapes: "100% Cabernet Sauvignon",
    note: "Jar-fermented, pale rose-petal colour. Crunchy tangy red fruit, soft attack and a vivacity that holds to the finish.",
  },
  {
    name: "Villa Ida Orange",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "100% Colombard, skin macerated",
    note: "Whole-berry skin fermentation in jar. Straw-orange hue, citrus and passion fruit, rich and fleshy with delicious astringency.",
  },
  {
    name: "Bulles de Campagne Brut Nature",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Sparkling",
    grapes: "Sémillon, Colombard",
    note: "Traditional method, zero dosage. An ancestral cuvée made by the Bassereau family since 1906.",
  },
];

export const legendary = wines.filter((w) =>
  ["I Tarai", "Le Fole Aglianico", "Meursault 'Les Durots'"].includes(w.name),
);
