const roncatheImg = { url: "/images/site/roncathe_soave.webp" };
const granettoImg = { url: "/images/site/granetto-pinot-grigio.webp" };
const carmenereImg = { url: "/images/site/carmenere.webp" };
const granettoSheet = { url: "/docs/granetto.pdf" };
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
  cutout?: string;
  techSheet?: string;
};

export type Producer = {
  name: string;
  logo?: string;
  logoClassName?: string;
  logoContainsName?: boolean;
  tileFullBleed?: boolean;
  tileImage?: string;
  heroImage?: { src: string; alt: string; caption?: string };
  gallery?: { src: string; alt: string; caption: string; group?: string }[];
  /** Short portrait film shown beside the story (9:16, muted, looping). */
  film?: { src: string; poster: string; label: string; caption: string };
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
      "A small growers' project in Lapuebla de Labarca, Rioja Alavesa, rescuing ancestral vineyards, some planted in 1920, and bottling them parcel by parcel.",
    story: [
      "Viticultores de Lapuebla is a growers' project based in Lapuebla de Labarca, in the heart of Rioja Alavesa, working old family parcels that sit at around 550 metres on clay-limestone and alluvial soils. Many of the vines were planted between 1940 and 1960 and have been farmed by the same families for generations.",
      "The project is the work of José Luis Heras and Noelia Rodríguez, from the family behind Bodegas Heras Cordón. Each wine is a single-parcel or old-vine bottling that isolates the character of its site: El Propósito, built almost entirely on Tempranillo with a seasoning of Viura, and Galáctico, just 700 bottles of Garnacha planted in 1920 at 700 metres in Alesón.",
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
        src: "/images/producers/bodegas-heras-cordon/3.webp",
        alt: "A man in a scarf studying a glass of red wine in the cellar",
        caption: "Tasting in the cellar",
      },
      {
        src: "/images/site/vineyard-rioja.webp",
        alt: "Vineyard rows beneath the mountains of Rioja Alta",
        caption: "Vineyards in Rioja Alta",
      },
      {
        src: "/images/site/winery-aerial.webp",
        alt: "Aerial view of the Heras Cordón winery surrounded by vineyards",
        caption: "The Heras Cordón winery among its vineyards, Fuenmayor",
      },
    ],
    region: "Fuenmayor, Rioja Alta",
    country: "Spain",
    farming: "Hand-picked, native-yeast fermentation",
    summary:
      "A Rioja family that has been digging cellars since the 19th century. Today their Reserva is made ten metres beneath the vines in Fuenmayor, Rioja Alta.",
    story: [
      "The Heras Cordón story starts underground. In the 19th century the family dug its first cellars into the earth and rock of Lapuebla de Labarca, in Rioja Alavesa. By the 1970s their crianzas and reservas were selling across Spain, and in the 1990s they bought a vineyard in Fuenmayor, Rioja Alta, where the winery stands today.",
      "When it came to building it, they went underground again. The cellar sits ten metres below the vineyard, built from the stone of abandoned 19th-century railway stations, and you walk in through a door rescued from a ruined convent in Segovia.",
      "The family owns 50 hectares and advises the growers of another 60, across Rioja Alta (Fuenmayor, Cenicero, Navarrete) and Rioja Alavesa (Laguardia, Elciego, Lapuebla de Labarca). The vines grow at around 550 metres on stony clay-limestone. The team thins the crop twice each summer, picks by hand into 20-kilo boxes and ferments with native yeasts. The Reserva then spends 18 months in French and American oak.",
    ],
  },
  {
    name: "Château de la Grave",
    logo: chateauVineyardImg.url,
    tileImage: "/images/producers/chateau-de-la-grave.jpg",
    tileFullBleed: true,
    heroImage: {
      src: "/images/grave/people-famille-bassereau.webp",
      alt: "The Château de la Grave family in their vineyard",
      caption: "The Bassereau family, Château de la Grave — farming the Côtes de Bourg since 1906",
    },
    film: {
      src: "/videos/chateau-de-la-grave-harvest.mp4",
      poster: "/videos/chateau-de-la-grave-harvest-poster.webp",
      label:
        "Château de la Grave, Bordeaux: a short film of the estate, its vineyards and the hand harvest",
      caption: "A short film from the estate. Harvest photos © Pierre-Marc.",
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
    farming: "In conversion to organic",
    summary:
      "The Bassereau family have farmed this Côtes de Bourg estate on the Bordeaux right bank since 1906, working Merlot, Cabernet Sauvignon, Malbec, Sémillon and Colombard in foudre, barrel, concrete and terracotta jars.",
    story: [
      "Château de la Grave has been in the Bassereau family since 1906, when the estate on the right bank of the Gironde, in the Côtes de Bourg, was first purchased. Five generations have farmed these gravel and clay-limestone slopes, and today the château is both a working vineyard and a family home.",
      "The estate is in conversion to organic farming. Merlot, Cabernet Sauvignon and Malbec drive the reds; Sémillon and Colombard the whites. The cellar is unusually diverse for Bordeaux: foudres, barrels, concrete vats and terracotta jars are all used, chosen per cuvée rather than by habit.",
      "The range runs from the classic Château de la Grave Rouge and the deep, malbec-driven Caractère to the barrel-fermented Grains Fins blanc, the amphora-aged Dolia, the experimental Les Choses series and the estate's méthode traditionnelle sparklers. It is one of the most complete and characterful estates on Bordeaux's right bank.",
    ],
  },
  {
    name: "Domaine Gadais",
    logo: "/images/producers/gadais/1.jpg",
    tileFullBleed: true,
    heroImage: {
      src: "/images/producers/gadais/1.jpg",
      alt: "Two generations of the Gadais family in the garden at the estate",
      caption: "Domaine Gadais Père et Fils, Saint-Fiacre-sur-Maine",
    },
    gallery: [
      {
        src: "/images/producers/gadais/2.jpg",
        alt: "A bottle of Domaine de la Tourmaline Muscadet lying on a stone surface",
        caption: "Domaine de la Tourmaline, the estate's Muscadet Sèvre et Maine sur Lie",
      },
      {
        src: "/images/producers/gadais/3.jpg",
        alt: "Weathered hands holding pieces of dark metamorphic rock beside vine leaves",
        caption: "The old metamorphic rock beneath the vines",
      },
      {
        src: "/images/producers/gadais/4.jpg",
        alt: "A hoe turning the soil between young vines in sunlight",
        caption: "Working the soil between the rows",
      },
      {
        src: "/images/producers/gadais/5.jpg",
        alt: "Green vine canopy and wildflowers in the grass between rows",
        caption: "Vines in summer",
      },
      {
        src: "/images/producers/gadais/6.jpg",
        alt: "Black-and-white archive photo of people planting a vineyard by hand",
        caption: "Planting by hand, from the Gadais family archive",
      },
    ],
    region: "Saint-Fiacre-sur-Maine, Loire",
    country: "France",
    farming: "Sustainable, minimal treatments",
    summary:
      "A five-generation family estate in Saint-Fiacre-sur-Maine, at the heart of Muscadet Sèvre et Maine, growing nothing but Melon de Bourgogne.",
    story: [
      "The Gadais family has farmed in Saint-Fiacre-sur-Maine, where the Sèvre and Maine rivers meet south-east of Nantes, for five generations. In 1947 Louis Gadais decided to concentrate on wine, and he became one of the first growers around Nantes to bottle his own rather than sell it in bulk to the cooperative. In 1958 the American importer Frank Schoonmaker came to buy, and the following year Gadais Muscadet was on tables in New York.",
      "Louis's sons Michel and Marcel developed the estate, adding the prized La Faubretière vineyard in 1973 and keeping yields low when the trend ran the other way. Christophe Gadais took over in 1994 after working in Sancerre and abroad, and built a range of single-terroir cuvées, among them Les Perrières Monopole, first made in 2009. His son Pierre-Henri returned in 2016 after studying in Burgundy and Bordeaux and working in California, Australia, England, New Zealand and Switzerland, and has moved the wines towards fewer interventions and less added sulphur.",
      "The estate grows only Melon de Bourgogne, on more than 50 hectares split into around a hundred plots. The soils are old metamorphic rock (orthogneiss, mica schist and amphibolite) with a sandy structure that drains naturally and sends the roots deep. A semi-underground cellar works by gravity, and every wine is aged on its lees, from six months for the classic cuvées to far longer for Les Perrières.",
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
    cutout: "/bottles/roncathe-soave.webp",
    techSheet: "/docs/corte-moschina-roncathe.pdf",
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
    cutout: "/bottles/granetto-pinot-grigio.webp",
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
    techSheet: "/docs/corte-moschina-calcareo.pdf",
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
    image: "/bottles/moschina-i-tarai.webp",
    cutout: "/bottles/moschina-i-tarai.webp",
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
    image: "/bottles/ferrero-barolo.webp",
    cutout: "/bottles/ferrero-barolo.webp",
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
    cutout: "/bottles/nvie-langhe-nebbiolo.webp",
  },
  {
    name: "Madonnella Montepulciano d'Abruzzo",
    producer: "Pasetti",
    region: "Abruzzo",
    country: "Italy",
    colour: "Red",
    grapes: "Montepulciano d'Abruzzo DOP — 100% Montepulciano",
    note: "Grown at 550 m in the Gran Sasso National Park; morello cherry, blackberry, liquorice and black pepper with smooth, ripe tannins.",
    image: "/images/site/madonnella.webp",
    cutout: "/bottles/madonnella-montepulciano.webp",
    techSheet: "/docs/pasetti-madonnella.pdf",
  },
  {
    name: "Testarossa Montepulciano d'Abruzzo Riserva 2019",
    producer: "Pasetti",
    region: "Abruzzo",
    country: "Italy",
    colour: "Red",
    grapes: "Montepulciano d'Abruzzo Riserva DOP — 100% Montepulciano",
    note: "Hand-picked riserva aged 24 months in French barriques; plum, sour cherry, liquorice, chocolate and tobacco with elegant tannins.",
    image: "/images/site/testarossa_montepulciano_2019.webp",
    cutout: "/bottles/testarossa-montepulciano.png",
    techSheet: "/docs/pasetti-testarossa.pdf",
  },
  {
    name: "Collecivetta Pecorino",
    producer: "Pasetti",
    region: "Abruzzo",
    country: "Italy",
    colour: "White",
    grapes: "Pecorino d'Abruzzo DOP — 100% Pecorino",
    note: "Mountain Pecorino matured on fine lees in steel; dried yellow flowers, citrus and bread crust with lively acidity and minerality.",
    image: "/images/site/collecivetta.webp",
    cutout: "/bottles/collecivetta-pecorino.webp",
    techSheet: "/docs/pasetti-collecivetta.pdf",
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
    cutout: "/bottles/argonauta-verdicchio.webp",
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
    name: "Marqués del Hueco Crianza 2020",
    producer: "Bodegas Heras Cordón",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "80% Tempranillo, 10% Mazuelo, 10% Graciano",
    note: "13 months in American oak Bordeaux barrels. Raspberry and black plum with pepper, clove and vanilla; silky tannins and a long finish.",
    image: "/bottles/marques-del-hueco-crianza.png",
    cutout: "/bottles/marques-del-hueco-crianza.png",
    techSheet: "/docs/marques-del-hueco-crianza.pdf",
  },
  {
    name: "Marqués del Hueco Reserva 2016",
    producer: "Bodegas Heras Cordón",
    region: "Rioja Alavesa",
    country: "Spain",
    colour: "Red",
    grapes: "90% Tempranillo, 5% Mazuelo, 5% Graciano",
    note: "18 months in French and American oak from 35–40 year-old vines. Red cherry, cassis and menthol, closing on toffee and coffee.",
    image: "/bottles/marques-del-hueco-reserva.png",
    cutout: "/bottles/marques-del-hueco-reserva.png",
    techSheet: "/docs/marques-del-hueco-reserva.pdf",
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
    cutout: "/bottles/el-proposito.webp",
    techSheet: "/docs/lapuebla-el-proposito.pdf",
  },
  {
    name: "Galáctico 2022",
    producer: "Viticultores de Lapuebla",
    region: "Alesón, Rioja",
    country: "Spain",
    colour: "Red",
    grapes: "Rioja DOCa — 100% Garnacha Tinta",
    note: "Just 700 bottles from a single Garnacha vineyard planted in 1920 at 700 m in Alesón; orange blossom, strawberry, cherry and soft spice, powerful yet fresh.",
    image: lapueblaGalacticoImg.url,
    cutout: "/bottles/galactico.webp",
    techSheet: "/docs/lapuebla-galactico.pdf",
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
    cutout: "/bottles/heras-cordon-reserva.webp",
    techSheet: "/docs/heras-cordon-reserva.pdf",
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
    name: "Domaine de la Tourmaline 2024",
    producer: "Domaine Gadais",
    producerUrl: "https://www.domainegadais.com/",
    region: "Saint-Fiacre-sur-Maine, Loire",
    country: "France",
    colour: "White",
    grapes: "Muscadet Sèvre et Maine sur Lie — 100% Melon de Bourgogne",
    note: "A blend of about 50 steep orthogneiss plots in Saint-Fiacre, aged on its lees until July; citrus on the nose, fresh, ample and well balanced.",
    image: "/bottles/gadais-tourmaline.png",
    cutout: "/bottles/gadais-tourmaline.png",
    techSheet: "/docs/gadais-tourmaline.pdf",
  },
  {
    name: "Les Perrières Monopole 2023",
    producer: "Domaine Gadais",
    producerUrl: "https://www.domainegadais.com/",
    region: "Saint-Fiacre-sur-Maine, Loire",
    country: "France",
    colour: "White",
    grapes: "Muscadet AOP — 100% Melon de Bourgogne",
    note: "1.1 ha of 40-year-old vines on a south-facing gneiss slope, fermented with natural yeast in 300-litre barrels; brioche, roast and vanilla notes, rich and long.",
    image: "/bottles/gadais-perrieres.png",
    cutout: "/bottles/gadais-perrieres.png",
    techSheet: "/docs/gadais-perrieres-monopole.pdf",
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
    techSheet: "/docs/grave-nectar.pdf",
    cutout: "/bottles/grave-nectar.webp",
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
    techSheet: "/docs/grave-caractere.pdf",
    cutout: "/bottles/grave-caractere.webp",
  },
  {
    name: "Classic",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "80% Merlot, 10% Cabernet Sauvignon, 10% Malbec",
    note: "Traditional ageing in concrete vat. Ripe red and black fruit, fleshy and fresh — a claret to drink young.",
    image: "/bottles/grave-classic.webp",
    cutout: "/bottles/grave-classic.webp",
  },
  {
    name: "Rouge Terre",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "90% Merlot, 10% Cabernet Sauvignon",
    note: "Concrete-aged, from vines in conversion to organic. Bright red fruit and fresh mint, lively acidity and a liquorice note on a crisp finish.",
    image: "/bottles/grave-rouge-terre.webp",
    cutout: "/bottles/grave-rouge-terre.webp",
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
    techSheet: "/docs/grave-grains-fins.pdf",
    cutout: "/bottles/grave-grains-fins.webp",
  },
  {
    name: "Dolia",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "50% Sémillon, 50% Colombard",
    note: "Fermented and aged in terracotta jars. Pure nose of white flowers, citrus and pepper; mineral, balanced and long.",
    image: "/bottles/grave-dolia.webp",
    cutout: "/bottles/grave-dolia.webp",
  },
  {
    name: "Les Choses qu'on Aime",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "90% Malbec, 10% Merlot",
    note: "Barrel-aged Malbec, in conversion to organic. Blackcurrant, blueberry and blackberry; round and velvety with a fresh, slightly acid close.",
    image: chateauLesChosesQuOnAimeImg.url,
    techSheet: "/docs/grave-les-choses-quon-aime.pdf",
    cutout: "/bottles/grave-les-choses-quon-aime.webp",
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
    techSheet: "/docs/grave-les-choses-a-lenvers.pdf",
    cutout: "/bottles/grave-les-choses-a-lenvers.webp",
  },
  {
    name: "Les Choses Autrement",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "100% Merlot",
    note: "A different approach in the cellar: airy, fruity and tense with very fine tannins. Bordeaux to drink now.",
    image: "/bottles/grave-les-choses-autrement.webp",
    cutout: "/bottles/grave-les-choses-autrement.webp",
  },
  {
    name: "Les Choses sans S",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "50% Malbec, 50% Merlot",
    note: "No added sulphites, native yeast, no oak. Black cherry, fresh blackcurrant and mint; silky and immediate. 91 pts James Suckling.",
    image: "/bottles/grave-les-choses-sans-s.webp",
    cutout: "/bottles/grave-les-choses-sans-s.webp",
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
    techSheet: "/docs/grave-les-choses-en-rose.pdf",
    cutout: "/bottles/grave-les-choses-en-rose.webp",
  },
  {
    name: "Les Choses qui Pétillent Rosé",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Sparkling",
    grapes: "Pétillant naturel, rosé",
    note: "Ancestral-method pét-nat with no additions or sulphites. Fine bubbles, intense fruit and a thoroughly refreshing palate.",
    image: "/bottles/grave-les-choses-qui-petillent.webp",
    cutout: "/bottles/grave-les-choses-qui-petillent.webp",
  },
  {
    name: "Villa Ida Rouge",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Red",
    grapes: "100% Merlot",
    note: "Aged in jar. Complex fruit aromas and a delicate palate carried by fine minerality — far from a classic Bordeaux.",
    image: "/bottles/grave-villa-ida-rouge.webp",
    cutout: "/bottles/grave-villa-ida-rouge.webp",
  },
  {
    name: "Villa Ida Blanc",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "70% Chenin, 30% Colombard",
    note: "Fermented and aged in jar. Exotic fruit and citrus young, floral with age; subtle acidity and beautiful minerality.",
    image: "/bottles/grave-villa-ida-blanc.webp",
    cutout: "/bottles/grave-villa-ida-blanc.webp",
  },
  {
    name: "Villa Ida Rosé",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "Rosé",
    grapes: "100% Cabernet Sauvignon",
    note: "Jar-fermented, pale rose-petal colour. Crunchy tangy red fruit, soft attack and a vivacity that holds to the finish.",
    image: "/bottles/grave-villa-ida-rose.webp",
    cutout: "/bottles/grave-villa-ida-rose.webp",
  },
  {
    name: "Villa Ida Orange",
    producer: "Château de la Grave",
    region: "Bordeaux",
    country: "France",
    colour: "White",
    grapes: "100% Colombard, skin macerated",
    note: "Whole-berry skin fermentation in jar. Straw-orange hue, citrus and passion fruit, rich and fleshy with delicious astringency.",
    image: "/bottles/grave-villa-ida-orange.webp",
    cutout: "/bottles/grave-villa-ida-orange.webp",
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
  ["I Tarai", "Barolo", "Galáctico 2022"].includes(w.name),
);
