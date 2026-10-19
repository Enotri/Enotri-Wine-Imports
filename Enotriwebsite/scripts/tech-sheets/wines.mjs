// Content for the Enotri two-page wine info sheets (layout cloned from the
// Château de la Grave "Les Choses En Rosé" sheet).
//
// Facts come from the producer's own technical sheets in media-library/producers/<producer>/.
// Leave a field out (or null) when it is not known: the sheet then skips that row
// rather than printing a guess.

// Organic farming and native fermentations follow the Enotri website (Rallings, Oct 2026),
// not Pasetti's own sheets, which list selected yeasts.
const PASETTI_STORY = [
  "The Pasetti family's roots in Abruzzo reach back to the early 1900s, in the mountains around Pescosansonesco, in the shadow of the Gran Sasso massif. What began as a small family holding has grown, over five generations, into one of the region's benchmark estates: still family-run, still farmed by the people whose name is on the label.",
  "The vineyards climb between 450 and 600 metres, among the highest in the region, where cool nights and constant mountain breezes keep the fruit bright and aromatic even in warm years. Montepulciano is the heart of the estate, bottled as Madonnella and the riserva Testarossa, alongside Pecorino, seen at its best in Collecivetta.",
];

const PASETTI_PHOTOS = {
  landscape: "public/images/site/pasetti-vineyard.webp",
  family: "public/images/site/pasetti-team.webp",
};

const GADAIS_STORY = [
  "For many years, Muscadet seemed a wine long out of fashion, its name worn down by thin commercial bottlings. Yet like all great classics, the signature white of the Loire estuary, the traditional partner to oysters, is finding new expression in the hands of gifted growers, and Domaine Gadais Père et Fils is at the forefront.",
  "The family has farmed in Saint-Fiacre-sur-Maine for five generations. Louis Gadais was one of the first growers around Nantes to bottle his own wine. Today Christophe, who trained in Sancerre and abroad, and his son Pierre-Henri farm more than 50 hectares in around a hundred plots, all Melon de Bourgogne, with minimal treatments to protect the life of the soil.",
];

const GADAIS_PHOTOS = {
  landscape: "public/images/producers/gadais/5.jpg",
  family: "public/images/producers/gadais/1.jpg",
};

const GADAIS_ORANGE = "#f99d2a";

const HERAS_STORY = [
  "The Heras Cordón family has made Rioja since the 19th century, when they dug their first cellars into the earth and rock of Lapuebla de Labarca, in Rioja Alavesa. In the 1970s the family began selling its crianza and reserva wines across Spain, and in the 1990s bought a vineyard in Fuenmayor, Rioja Alta, the site of today's winery.",
  "The cellar was dug ten metres underground and built from the stone of abandoned 19th-century railway stations, behind a door rescued from a ruined Segovia convent. The family owns 50 hectares and advises the growers of another 60, all in Rioja Alta (Fuenmayor, Cenicero, Navarrete) and Rioja Alavesa (Laguardia, Elciego, Lapuebla de Labarca).",
];

const HERAS_PHOTOS = {
  landscape: "public/images/site/vineyard-rioja.webp",
  family: "public/images/producers/bodegas-heras-cordon/2.webp",
};

const LAPUEBLA_STORY = [
  "Viticultores de Lapuebla is the project of José Luis Heras and Noelia Rodríguez, from the family behind Bodegas Heras Cordón. Their aim is to rescue small, ancestral vineyards in and around Lapuebla de Labarca, in Rioja Alavesa, before they disappear, some of them planted as far back as 1920.",
  "Each wine comes from a single parcel or a small group of old-vine plots, picked by hand into 20-kilo boxes and made in small volumes, from 10,000 bottles down to a few hundred. The goal is finesse and a sense of place: a tribute to the families and the winegrowing tradition of Lapuebla.",
];

const LAPUEBLA_PHOTOS = {
  landscape: "public/images/producers/viticultores-de-lapuebla/1.webp",
  family: "public/images/site/viticultores-vineyard.webp",
  familyPosition: "85% center",
};

const HERAS_RED = "#a51d40";
const LAPUEBLA_GOLD = "#b8973f";

// Page-1 story and viticulture intro are Enotri's own text from the Les Choses En Rosé sheet.
// Every Grave wine is in conversion to organic (confirmed by Rallings, Oct 2026), not yet certified.
const GRAVE_STORY = [
  "Nestled in a 14th-century castle, Château de la Grave is an exceptional addition to the enotri community, offering a stunning collection of Bordeaux wines faithful to the traditions of this celebrated region of France. Guiding principles include respect for the environment, quality control in the vineyards, and vinification and maturing in the pure Bordeaux tradition.",
  "On the banks of the Bourg, the oldest Roman vineyards on the Atlantic coast of France, the estate is well recognized in French wine guides as an emerging star of the region. The Bassereau family blend Sémillon and Colombard in an exquisite white, while the Merlot-dominated reds are spiced with Cabernet Sauvignon and Malbec.",
];

const GRAVE_ESTATE =
  "Since 1990, Philippe and Valérie Bassereau have run Château de la Grave, mixing tradition and modernity: 45 hectares of vines all around the château, farmed organically and biodynamically, with ploughing, grass cover and no chemical fertilizers or insecticides.";

const GRAVE_PHOTOS = {
  landscape: "public/images/grave/estate-chateau.webp",
  family: "public/images/grave/people-famille-bassereau.webp",
};

// Corte Moschina facts come from Enotri's earlier one-page sheets in
// media-library/producers/corte-moschina/technical-sheets/. Their pH (4.14 on both wines) is
// left off until confirmed: it is implausible beside a TA of 6.5 g/l.
const CORTE_STORY = [
  "Corte Moschina farms in Roncà, in the eastern hills of Veneto, where ancient volcanic activity left behind basalt-rich soils that give the estate's Soave its flinty, savoury edge.",
  "The estate works organically, with trellised vines, low yields and a preference for slow, even ripening. Alongside the volcanic Roncà parcels, Corte Moschina farms limestone-rich sites in the Colli Berici, where excellent drainage and a wide day-to-night temperature swing build elegance, fine structure and clear mineral character.",
];

const CORTE_PHOTOS = {
  landscape: "public/images/producers/corte-moschina/2.webp",
  family: "public/images/site/corte-moschina-family.webp",
};

export const sheets = [
  {
    file: "pasetti-madonnella",
    name: "Pasetti Madonnella",
    sku: "883921",
    bonVivant:
      "Dark cherry and black pepper over soft, ripe tannins. A Sunday-table red: pour it with lasagna, timballo or lamb skewers off the grill.",
    vibe: "Family table",
    occasions: ["Comfort", "Sharing"],
    story: PASETTI_STORY,
    photos: PASETTI_PHOTOS,
    bottle: "public/bottles/madonnella-montepulciano.webp",
    specs: [
      ["Region", "Pescosansonesco, Abruzzo"],
      ["Classification", "Montepulciano d'Abruzzo DOP"],
      ["Vintage", "2024"],
      ["Grapes", "100% Montepulciano"],
      ["Soil Composition", "Loam, clay and limestone, rich in organic matter; sloping, northeast-facing"],
      ["Elevation", "550 m"],
      ["Density/Yield", "4,200 vines/ha; maximum 150 q/ha"],
      ["Harvest", "By machine, around mid-October"],
      ["Fermentation", "8–10 days in stainless steel, native yeasts, 22–24 °C. Spontaneous malolactic."],
      ["Ageing", "Cement tanks, then large oak barrels (20 hl and 60 hl), then bottle"],
      ["Alcohol", "14.0–14.5%"],
      ["Residual Sugar", "3.0–4.5 g/l"],
      ["pH", "3.40–3.60"],
      ["TA", "5.0–5.5 g/l"],
      ["Volatile Acidity", "0.30–0.40 g/l"],
      ["Farming", "Organic"],
    ],
    viticulture: [
      "The vineyards lie in the municipality of Pescosansonesco at 550 metres above sea level, within the Gran Sasso and Monti della Laga National Park. The soil is a loam, clay and limestone mix, rich in organic matter, on northeast-facing slopes, with dry, well-ventilated summers.",
      "Montepulciano is Abruzzo's own grape. It thrives in clay, tolerates drought and ripens late, and its concentration of anthocyanins is among the highest of any variety. Rich in tannin and intense in red fruit, it shows morello cherry, currant and blackberry here, with liquorice, cinnamon and black pepper. Best kept at 14–16 °C and drunk within 10 years of the vintage.",
    ],
    salesFacts: [
      "Grown at 550 m inside the Gran Sasso and Monti della Laga National Park",
      "100% Montepulciano, Abruzzo's indigenous red grape",
      "Aged in cement, then large 20 hl and 60 hl oak barrels",
    ],
  },
  {
    file: "pasetti-testarossa",
    name: "Pasetti Testarossa Montepulciano Riserva",
    sku: "800054",
    bonVivant:
      "Plum, sour cherry, liquorice and tobacco, warm and robust with years ahead of it. Open it for braised meats, game or a long dinner that ends with aged cheese.",
    vibe: "Fireside",
    occasions: ["Celebration", "Contemplation"],
    story: PASETTI_STORY,
    photos: PASETTI_PHOTOS,
    bottle: "public/bottles/testarossa-montepulciano.png",
    specs: [
      ["Region", "Pescosansonesco, Abruzzo"],
      ["Classification", "Montepulciano d'Abruzzo Riserva DOP"],
      ["Vintage", "2019"],
      ["Grapes", "100% Montepulciano"],
      ["Soil Composition", "Clay, loam and limestone, rich in organic matter; sloping, northeast-facing"],
      ["Elevation", "550 m"],
      ["Density/Yield", "4,200 vines/ha; 135 q/ha"],
      ["Harvest", "By hand, in crates, late October to early November"],
      ["Fermentation", "8–10 days in stainless steel, native yeasts, 22–24 °C. Spontaneous malolactic."],
      ["Ageing", "Cement vats, then 24 months in 2nd- and 3rd-passage French barriques, then bottle"],
      ["Alcohol", "14.5–15.0%"],
      ["Residual Sugar", "2.0–2.5 g/l"],
      ["pH", "3.50–3.60"],
      ["TA", "5.0–5.5 g/l"],
      ["Volatile Acidity", "0.30–0.50 g/l"],
      ["Farming", "Organic"],
    ],
    viticulture: [
      "The vineyards lie in the municipality of Pescosansonesco at 550 metres above sea level, within the Gran Sasso and Monti della Laga National Park, on sloping, northeast-facing clay, loam and limestone rich in organic matter. Summers are dry and well-ventilated.",
      "Montepulciano is Abruzzo's own grape: late-ripening, drought-tolerant, deeply coloured and rich in tannin. In the riserva it gives ripe red fruit, withered violet and forest floor, with tertiary notes of eucalyptus, liquorice, chocolate and tobacco. Best kept at 14–16 °C and drunk within 20 years of the harvest.",
    ],
    salesFacts: [
      "The estate's riserva Montepulciano, from 550 m in the Gran Sasso National Park",
      "Hand-harvested in crates from late October",
      "24 months in French barriques; will cellar for up to 20 years",
    ],
  },
  {
    file: "pasetti-collecivetta",
    name: "Pasetti Collecivetta Pecorino",
    sku: "121793",
    bonVivant:
      "Citrus, dried yellow flowers and a mineral snap. Bright enough for an aperitivo, with the body for fish, white lasagna or roast chicken.",
    vibe: "Long lunch",
    occasions: ["Fresh", "Convivial"],
    story: PASETTI_STORY,
    photos: PASETTI_PHOTOS,
    bottle: "public/bottles/collecivetta-pecorino.webp",
    specs: [
      ["Region", "Pescosansonesco and Capestrano, Abruzzo"],
      ["Classification", "Pecorino d'Abruzzo DOP"],
      ["Vintage", "2025"],
      ["Grapes", "100% Pecorino"],
      ["Elevation", "550 m (Pescosansonesco) and 450 m (Capestrano)"],
      ["Density/Yield", "4,200 vines/ha; maximum 140 q/ha"],
      ["Harvest", "By machine, first ten days of September"],
      ["Fermentation", "Soft pressing, static settling, cold fermentation; lees stirring to mature on fine lees"],
      ["Ageing", "Stainless steel only, on fine lees"],
      ["Alcohol", "13.0–13.5%"],
      ["Residual Sugar", "3.5–4.5 g/l"],
      ["pH", "3.20–3.30"],
      ["TA", "6.0–7.0 g/l"],
      ["Volatile Acidity", "0.20–0.30 g/l"],
      ["Farming", "Organic"],
    ],
    viticulture: [
      "The vineyards lie in the municipalities of Pescosansonesco, at 550 metres, and Capestrano, at 450 metres, both within the Gran Sasso and Monti della Laga National Park.",
      "Pecorino is a native Abruzzo variety, rediscovered in recent years thanks to a few dedicated growers. It prefers fertile soils with good water and gives pronounced citrus and freshness, balanced by good body and a persistent finish. Here it shows dried yellow flowers, citrus, dried fruit and bread crust, with lively acidity and marked minerality. Best kept at 14–16 °C and drunk within 6 years of the harvest.",
    ],
    salesFacts: [
      "Pecorino, a native Abruzzo grape brought back from near-obscurity",
      "Mountain vineyards at 450–550 m in the Gran Sasso National Park",
      "Stainless steel only, matured on fine lees",
    ],
  },
  {
    file: "gadais-tourmaline",
    name: "Gadais Muscadet Domaine de la Tourmaline",
    sku: "765288",
    accent: GADAIS_ORANGE,
    bonVivant:
      "Bright citrus and a fresh, ample palate with a lift of acidity. Pour it with sea bream ceviche or fish straight off the grill.",
    vibe: "Summer",
    occasions: ["Fresh", "Easy-going"],
    story: GADAIS_STORY,
    photos: GADAIS_PHOTOS,
    bottle: "public/bottles/gadais-tourmaline.png",
    specs: [
      ["Region", "Saint-Fiacre-sur-Maine, Loire Valley"],
      ["Classification", "Muscadet Sèvre et Maine sur Lie AOP"],
      ["Vintage", "2024"],
      ["Grapes", "100% Melon de Bourgogne"],
      ["Soil Composition", "Orthogneiss"],
      ["Vine Age", "35 years on average"],
      ["Area/Production", "24 ha; 96,000 bottles"],
      ["Yield", "30 hl/ha"],
      ["Fermentation", "Low-pressure pneumatic pressing, 24 hours' cold settling, then 15–20 days at 16–18 °C with selected yeasts"],
      ["Ageing", "On the lees in stainless steel until July; bottled under inert gas to keep added sulphites to a minimum"],
      ["Serving", "8–10 °C"],
      ["Cellaring", "3–5 years"],
    ],
    viticulture: [
      "Domaine de la Tourmaline is a blend from around 50 plots, all in the commune of Saint-Fiacre. The hillsides here are steep and the ground arid and hard to work. This is the land where Michel and Marcel Gadais were born and grew up, and they gave the wine the name of a semi-precious stone, Tourmaline, as a refined and poetic touch.",
      "Splitting the estate into so many plots lets the family vinify by terroir and then blend, combining minerality, silky texture and finesse. Pale yellow with green glints, it shows citrus on the nose and a fresh, ample, well-balanced palate.",
    ],
    salesFacts: [
      "A blend of around 50 plots, all in Saint-Fiacre",
      "Family owned and run for five generations",
      "Aged sur lie; bottled to keep added sulphites to a minimum",
    ],
  },
  {
    file: "gadais-perrieres-monopole",
    name: "Gadais Muscadet Les Perrières Monopole",
    sku: "790886",
    accent: GADAIS_ORANGE,
    bonVivant:
      "Fall vibes. Enjoy with family and friends with a great meal and reflective conversation. A versatile wine that even stands up to a rib-eye steak and other roasted meats.",
    vibe: "Fall",
    occasions: ["Reflection", "Family"],
    story: GADAIS_STORY,
    photos: GADAIS_PHOTOS,
    bottle: "public/bottles/gadais-perrieres.png",
    specs: [
      ["Region", "Saint-Fiacre-sur-Maine, Loire Valley"],
      ["Classification", "Muscadet AOP"],
      ["Vintage", "2023"],
      ["Grapes", "100% Melon de Bourgogne, mass selection"],
      ["Soil Composition", "Gneiss bedrock under just 20–30 cm of soil"],
      ["Vine Age", "40 years on average"],
      ["Area/Production", "1.1 ha; 5,600 bottles"],
      ["Yield", "40 hl/ha"],
      ["Fermentation", "Low-pressure pneumatic pressing, 12 hours' cold settling, then about 20 days with natural yeast in 300-litre barrels"],
      ["Ageing", "14 months on the lees, with frequent stirring in the first weeks"],
      ["Serving", "12–14 °C; decant when young"],
      ["Cellaring", "12 years and more"],
    ],
    viticulture: [
      "Les Perrières lies on a fully south-facing hillside above the Petite Maine river, at the gates of Saint-Fiacre. Louis Gadais established his Domaine des Perrières here in the 1950s, making his wine in 600-litre demi-muids. Several growers once shared this exceptional clos; today the Gadais family alone farms it. In old French, perrières means quarry.",
      "The 300-litre barrels are not there for oak flavour but for gentle micro-oxygenation, which brings out the Burgundian side of Melon. Almost crystal-clear pale yellow, it shows brioche, roasted notes and vanilla, with richness, length and great persistence.",
    ],
    salesFacts: [
      "A monopole: only the Gadais family farms Les Perrières",
      "Family owned and run for five generations",
      "The family grows nothing but Melon de Bourgogne",
    ],
  },
  {
    file: "heras-cordon-reserva",
    name: "Heras Cordón Reserva",
    sku: "141067",
    accent: HERAS_RED,
    bonVivant:
      "Red cherry, cassis and a touch of pink pepper, silky and long with a whisper of coffee. Open it for game, stews or a board of cured meats.",
    vibe: "Classic",
    occasions: ["Celebration", "Family"],
    story: HERAS_STORY,
    photos: HERAS_PHOTOS,
    bottle: "public/bottles/heras-cordon-reserva.webp",
    specs: [
      ["Region", "Rioja Alavesa (Laguardia, Elciego, Lapuebla) and Rioja Alta (Cenicero, Fuenmayor)"],
      ["Classification", "Rioja DOCa Reserva"],
      ["Vintage", "2019"],
      ["Grapes", "90% Tempranillo (46-year-old vines), 5% Mazuelo, 5% Graciano"],
      ["Soil Composition", "Clay-limestone, very stony"],
      ["Elevation", "550 m"],
      ["Yield", "Green-harvested to a maximum of 3,000 kg/ha"],
      ["Harvest", "By hand, into 20 kg boxes, then sorted on a table"],
      ["Fermentation", "Native yeasts at 30 °C in 28,000-litre stainless steel, with daily pump-overs; malolactic in tank"],
      ["Ageing", "18 months in French and American oak barrels"],
      ["Alcohol", "13.5%"],
      ["Serving", "18 °C"],
    ],
    viticulture: [
      "The vines grow at 550 metres on clay-limestone, very stony soils across Rioja Alavesa and Rioja Alta. The team green-prunes twice, in early June and early August, opening the canopy so the grapes breathe and dropping any bunches above 3,000 kg per hectare.",
      "Cherry red with blue glints. Red cherry, forest fruits, redcurrant and cassis over a fresh, acidic core, opening to fine roasted notes and pink pepper. Silky red fruit on the palate, fresh and balanced, with well-integrated tannins and a long finish of coffee and toffee.",
    ],
    salesFacts: [
      "Family winery making Rioja since the 19th century",
      "Hand-picked, native-yeast fermentation",
      "18 months in French and American oak",
    ],
  },
  {
    file: "marques-del-hueco-crianza",
    name: "Marqués del Hueco Crianza",
    sku: "141056",
    accent: HERAS_RED,
    bonVivant:
      "Raspberry, black plum and a little vanilla spice. A friendly weeknight Rioja: pour it with burgers, tapas or roast chicken.",
    vibe: "Weeknight",
    occasions: ["Casual", "Sharing"],
    story: HERAS_STORY,
    photos: HERAS_PHOTOS,
    bottle: "public/bottles/marques-del-hueco-crianza.png",
    specs: [
      ["Region", "Rioja Alavesa (Laguardia, Elciego, Lapuebla)"],
      ["Classification", "Rioja DOCa Crianza"],
      ["Vintage", "2020"],
      ["Grapes", "80% Tempranillo, 10% Mazuelo, 10% Graciano"],
      ["Vine Age", "24–37 years"],
      ["Soil Composition", "Clay-limestone and alluvial; south-facing"],
      ["Elevation", "550 m"],
      ["Harvest", "End of October"],
      ["Fermentation", "2–3 days' cold soak at 12 °C, then native yeasts at 25 °C in stainless steel with daily pump-overs"],
      ["Ageing", "13 months in American oak Bordeaux barrels"],
      ["Alcohol", "14%"],
      ["Style", "Dry red"],
    ],
    viticulture: [
      "Marqués del Hueco is bottled for Bodegas Heras Cordón from south-facing vineyards at 550 metres in Laguardia, Elciego and Lapuebla, on clay-limestone and alluvial soils. It is a classic Rioja coupage: Tempranillo for aroma and colour, Mazuelo for colour, acidity and structure, and Graciano for freshness.",
      "Cherry red with brick rims. Raspberry, black plum and caramel, with pepper, clove and vanilla. Silky, with pleasant tannins and marked acidity, and a long finish.",
    ],
    salesFacts: [
      "Classic Rioja Alavesa blend of three native grapes",
      "Native-yeast fermentation",
      "13 months in American oak",
    ],
  },
  {
    file: "marques-del-hueco-reserva",
    name: "Marqués del Hueco Reserva",
    sku: "141057",
    accent: HERAS_RED,
    bonVivant:
      "Red cherry, cassis, liquorice and a finish of toffee and coffee. Made for lamb chops, roast meats and a slow dinner.",
    vibe: "Dinner party",
    occasions: ["Celebration", "Conversation"],
    story: HERAS_STORY,
    photos: HERAS_PHOTOS,
    bottle: "public/bottles/marques-del-hueco-reserva.png",
    specs: [
      ["Region", "Rioja Alavesa (Laguardia, Elciego, Lapuebla)"],
      ["Classification", "Rioja DOCa Reserva"],
      ["Vintage", "2016"],
      ["Grapes", "90% Tempranillo, 5% Mazuelo, 5% Graciano"],
      ["Vine Age", "35–40 years"],
      ["Soil Composition", "Clay-limestone and alluvial; south-facing"],
      ["Elevation", "550 m"],
      ["Harvest", "End of October"],
      ["Fermentation", "2–3 days' cold soak at 12 °C, then native yeasts at 25 °C in stainless steel with daily pump-overs"],
      ["Ageing", "18 months in French and American oak Bordeaux barrels"],
      ["Alcohol", "14%"],
      ["Style", "Dry red"],
    ],
    viticulture: [
      "Marqués del Hueco is bottled for Bodegas Heras Cordón from south-facing vineyards at 550 metres in Laguardia, Elciego and Lapuebla, on clay-limestone and alluvial soils. The Reserva comes from older vines, 35 to 40 years, and the classic coupage of Tempranillo, Mazuelo and Graciano gives it the structure to age.",
      "Ruby red with brick rims. Red cherry, redcurrant and cassis over a fresh background, with menthol, white pepper and liquorice. Intense and fruity, with silky, well-knit tannins, good freshness and a long finish of toffee and coffee.",
    ],
    salesFacts: [
      "Old vines, 35–40 years, in Rioja Alavesa",
      "Native-yeast fermentation",
      "18 months in French and American oak",
    ],
  },
  {
    file: "lapuebla-el-proposito",
    name: "Viticultores de Lapuebla El Propósito",
    sku: "141058",
    accent: LAPUEBLA_GOLD,
    bonVivant:
      "Strawberry, raspberry and a breath of rose, fine and elegant. A Rioja for people who think they don't like Rioja: try it with roast pork or mushrooms.",
    vibe: "Discovery",
    occasions: ["Curiosity", "Friends"],
    story: LAPUEBLA_STORY,
    photos: LAPUEBLA_PHOTOS,
    bottle: "public/bottles/el-proposito.webp",
    specs: [
      ["Region", "Lapuebla de Labarca, Rioja Alavesa"],
      ["Classification", "Rioja DOCa"],
      ["Vintage", "2023"],
      ["Grapes", "95% Tempranillo, 5% Viura"],
      ["Vine Age", "Planted 1940–1960"],
      ["Soil Composition", "Limestone-clay and alluvial"],
      ["Harvest", "By hand into 20 kg boxes, 29 September 2023"],
      ["Fermentation", "90% destemmed uncrushed, 10% whole bunch; 15 days in French oak vats and open tubs"],
      ["Ageing", "Malolactic and 7 months in 225 and 500-litre French oak barrels"],
      ["Production", "10,000 bottles"],
      ["Alcohol", "14%"],
      ["Serving", "16–18 °C"],
    ],
    viticulture: [
      "El Propósito comes from vineyards in the lower parts of Lapuebla de Labarca, a mix of grapes, soils and growing conditions, with vines planted between 1940 and 1960 on limestone-clay and alluvial soils. A little Viura is co-fermented with the Tempranillo, in the old local way.",
      "Cherry red with violet rims. An elegant, floral nose of strawberry, raspberry and rose. Very fine on the palate, with delicate tannins even when young.",
    ],
    salesFacts: [
      "Old vines planted 1940–1960",
      "Hand-picked; part whole-bunch fermentation",
      "Only 10,000 bottles",
    ],
  },
  {
    file: "lapuebla-galactico",
    name: "Viticultores de Lapuebla Galáctico",
    sku: "141059",
    accent: LAPUEBLA_GOLD,
    bonVivant:
      "Orange blossom, ripe strawberry and cherry with a hint of cardamom; powerful but fresh. Save it for a special dinner or a collector friend.",
    vibe: "Rare find",
    occasions: ["Celebration", "Contemplation"],
    story: LAPUEBLA_STORY,
    photos: LAPUEBLA_PHOTOS,
    bottle: "public/bottles/galactico.webp",
    specs: [
      ["Region", "Alesón (Alto de San Antón), Rioja"],
      ["Classification", "Rioja DOCa"],
      ["Vintage", "2022"],
      ["Grapes", "100% Garnacha Tinta"],
      ["Vine Age", "Planted in 1920"],
      ["Soil Composition", "Argillo-ferrous (iron-rich clay)"],
      ["Elevation", "700 m"],
      ["Harvest", "By hand into 20 kg boxes, 5 October"],
      ["Fermentation", "80% destemmed, 20% whole bunch; spontaneous fermentation in open tubs with daily punch-downs"],
      ["Ageing", "Malolactic and 11 months in 500-litre French oak, then 6 months in bottle"],
      ["Production", "700 bottles"],
      ["Alcohol", "14.5%"],
      ["Serving", "16–18 °C"],
    ],
    viticulture: [
      "Galáctico comes from a single vineyard of Garnacha planted in 1920 at Alto de San Antón, in Alesón, 700 metres above sea level, on iron-rich clay. Only 700 bottles were made.",
      "Deep, bright ruby with violet edges. Orange blossom, strawberry and cherry with soft spice, cardamom and cinnamon. Powerful and structured, with ripe, integrated tannins, refreshing acidity and a long, persistent finish.",
    ],
    salesFacts: [
      "Century-old Garnacha, planted 1920",
      "700 m vineyard; spontaneous fermentation",
      "Just 700 bottles made",
    ],
  },
  {
    file: "grave-les-choses-en-rose",
    name: "Château de la Grave Les Choses En Rosé",
    sku: "874936",
    bonVivant:
      "Summer vibes, playful in its individuality. Enjoy and explore with friends. Pair with salads, seafood, Indian dishes and other Asian inspired cuisine.",
    vibe: "Summer",
    occasions: ["Playful", "Excitement"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-les-choses-en-rose.png",
    specs: [
      ["Region", "Bordeaux (estate in Bourg)"],
      ["Classification", "Vin de France rosé"],
      ["Vintage", "2025"],
      ["Grapes", "100% Cabernet Sauvignon, plot selection"],
      ["Soil Composition", "Fine clay-silt"],
      ["Fermentation", "Destemmed, pressed rosé; settled, then fermented in barrel"],
      ["Ageing", "6 months in barrel on fine lees with stirring; light fining"],
      ["Alcohol", "12.5%"],
      ["Cellaring", "5 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "Formerly the Hommage rosé, this is a plot selection of pure Cabernet Sauvignon. Pale salmon, with wild strawberry, spice and pepper on the nose; fleshy and airy, with surprising roundness, great finesse and a persistent finish with a hint of vanilla. Proof that rosé can be a great food wine.",
    ],
    salesFacts: [
      "In conversion to organic, farmed biodynamically",
      "A singular expression of Cabernet Sauvignon: a full-bodied, barrel-aged rosé",
      "From a 14th-century château in Bourg, Bordeaux",
    ],
  },
  {
    file: "grave-caractere",
    name: "Château de la Grave Caractère",
    sku: "757554",
    bonVivant:
      "Savoury depth, liquorice and fine tannins. The estate's emblematic red: pour it with steak frites, grilled duck breast or a spiced veal stew.",
    vibe: "Bistro",
    occasions: ["Gathering", "Tradition"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-caractere.png",
    specs: [
      ["Region", "Côtes de Bourg, Bordeaux"],
      ["Classification", "Côtes de Bourg AOP red"],
      ["Vintage", "2020"],
      ["Grapes", "80% Merlot, 20% Cabernet Sauvignon"],
      ["Soil Composition", "Clay and limestone"],
      ["Fermentation", "Destemmed, uncrushed; concrete tanks, 2–3 weeks' maceration with gentle extraction"],
      ["Ageing", "12 months in once- and twice-used barrels; light fining"],
      ["Alcohol", "14%"],
      ["Cellaring", "10 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "The wine of the château and the history of the family, mostly Merlot from clay-limestone slopes, with Cabernet Sauvignon for spice and freshness. Deep ruby; frank, fruity and spicy on the nose with discreet oak; fleshy and generous, with lively acidity and a long liquorice finish.",
    ],
    salesFacts: [
      "2020 vintage: 91 points, James Suckling",
      "The emblematic wine of the estate",
      "Organically farmed, 12 months in barrel",
    ],
  },
  {
    file: "grave-nectar",
    name: "Château de la Grave Nectar",
    sku: "757557",
    bonVivant:
      "Candied black fruit, spice and velvet. A wine for the big occasions: rack of lamb, duck breast or wild boar stew.",
    vibe: "Fireside",
    occasions: ["Celebration", "Contemplation"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-nectar.png",
    specs: [
      ["Region", "Côtes de Bourg, Bordeaux"],
      ["Classification", "Côtes de Bourg AOP red"],
      ["Vintage", "2019"],
      ["Grapes", "100% Merlot, old vines over 50 years"],
      ["Soil Composition", "Clay-limestone and clay-silt hillside"],
      ["Fermentation", "Destemmed, uncrushed; concrete tanks, maceration adjusted to the vintage"],
      ["Ageing", "18 months in 50 hl oak tuns; light fining"],
      ["Alcohol", "14%"],
      ["Cellaring", "10 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "Made since 1995 from a selection of Merlot vines over 50 years old, giving small yields on a clay-limestone and clay-silt hillside. Intense garnet; candied black fruit and well-judged spicy oak; tannic and powerful yet fresh, with a soft, velvety texture and a warm, full-bodied finish.",
    ],
    salesFacts: [
      "Old-vine Merlot, first vintage 1995",
      "18 months in large oak tuns",
      "Built to age: 10 years and more",
    ],
  },
  {
    file: "grave-grains-fins",
    name: "Château de la Grave Grains Fins",
    sku: "757556",
    bonVivant:
      "White peach, apricot and a toasty, brioche edge. A white with real presence: scallops, prawn risotto or a plate of refined cheeses.",
    vibe: "Dinner party",
    occasions: ["Discovery", "Elegance"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-grains-fins.png",
    specs: [
      ["Region", "Côtes de Bourg, Bordeaux"],
      ["Classification", "Côtes de Bourg AOP white"],
      ["Vintage", "2025"],
      ["Grapes", "60% Sémillon, 40% Colombard"],
      ["Soil Composition", "Fine clay and silt, red gravel"],
      ["Fermentation", "Destemmed and pressed; settled, then fermented in barrel"],
      ["Ageing", "6 months in barrel on fine lees with stirring; light fining"],
      ["Alcohol", "13%"],
      ["Cellaring", "7 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "An unusual Bordeaux blend of Sémillon and Colombard, unique in the Côtes de Bourg. Straw yellow with golden glints; white peach, apricot and flowers over lightly toasted brioche; full-bodied with a lively attack, rich texture and a long finish, fleshy but never heavy.",
    ],
    salesFacts: [
      "In conversion to organic",
      "A rare Sémillon and Colombard blend",
      "Barrel-fermented and aged on its lees",
    ],
  },
  {
    file: "grave-les-choses-quon-aime",
    name: "Château de la Grave Les Choses qu'on Aime",
    sku: "846298",
    bonVivant:
      "Blackcurrant, blueberry and wild blackberry, round and velvety. Malbec with a Bordeaux accent: try it with herbed pork, mushrooms or blue cheese.",
    vibe: "Adventure",
    occasions: ["Curiosity", "Friends"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-les-choses-quon-aime.png",
    specs: [
      ["Region", "Côtes de Bourg, Bordeaux"],
      ["Classification", "Côtes de Bourg AOP red"],
      ["Vintage", "2023"],
      ["Grapes", "90% Malbec, 10% Merlot"],
      ["Soil Composition", "Fine earth, sandy silt and red gravel"],
      ["Fermentation", "Destemmed, uncrushed; concrete tanks, 2–3 weeks' maceration; malolactic in barrel"],
      ["Ageing", "12 months in barrel; light fining"],
      ["Alcohol", "13%"],
      ["Cellaring", "7 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "Mostly Malbec, the historic grape of the appellation, from a plot of red gravel whose free-draining soil and small yields give a velvety, intensely fruity wine with an atypical profile. Intense ruby; blackcurrant, blueberry and wild blackberry with delicate oak; round and supple, ending full and suave.",
    ],
    salesFacts: [
      "Malbec, the historic grape of Bourg",
      "In conversion to organic",
      "A single plot on red gravel",
    ],
  },
  {
    file: "grave-les-choses-a-lenvers",
    name: "Château de la Grave Les Choses à l'Envers",
    sku: "120862",
    bonVivant:
      "Stewed forest fruit, spice and a touch of liquorice, full and frank. Made for grilled rib of beef, duck with orange or a wedge of old Gouda.",
    vibe: "Backyard grill",
    occasions: ["Bold", "Sharing"],
    story: GRAVE_STORY,
    photos: GRAVE_PHOTOS,
    bottle: "public/bottles/chateau-les-choses-a-lenvers.png",
    specs: [
      ["Region", "Côtes de Bourg, Bordeaux"],
      ["Classification", "Côtes de Bourg AOP red"],
      ["Vintage", "2023"],
      ["Grapes", "80% Cabernet Sauvignon, 20% Merlot"],
      ["Soil Composition", "Fine clay and sand"],
      ["Fermentation", "Destemmed, uncrushed; concrete tanks, 2–3 weeks' maceration; malolactic in barrel"],
      ["Ageing", "12 months in barrel; light fining"],
      ["Alcohol", "14%"],
      ["Cellaring", "10 years"],
      ["Certification", "In conversion to organic"],
    ],
    viticulture: [
      GRAVE_ESTATE,
      "The estate turns things upside down: a Cabernet Sauvignon-led blend, more typical of Bordeaux's left bank, from a sandy-clay rise. Deep red; stewed forest fruit, spice and liquorice; full and frank, with a soft, rounded texture, elegant tannins and a generous finish.",
    ],
    salesFacts: [
      "Left-bank style Cabernet Sauvignon from the right bank",
      "In conversion to organic",
      "12 months in barrel",
    ],
  },  {
    file: "corte-moschina-roncathe",
    name: "Corte Moschina Roncathe Soave",
    sku: "141052",
    bonVivant:
      "Crisp citrus and almond with a flinty, savoury snap from the volcanic soil. Pour it as an aperitivo, or with grilled fish and a seafood risotto.",
    vibe: "Aperitivo",
    occasions: ["Fresh", "Easy-going"],
    story: CORTE_STORY,
    photos: CORTE_PHOTOS,
    bottle: "public/bottles/roncathe-soave.webp",
    specs: [
      ["Region", "Roncà, Veneto"],
      ["Classification", "Soave DOC"],
      ["Vintage", "2024"],
      ["Grapes", "100% Garganega"],
      ["Soil Composition", "Basalt-rich volcanic soils of the Roncà hills"],
      ["Vineyard Training", "Trellised vines"],
      ["Yield", "25 hl/ha"],
      ["Fermentation", "Stainless steel tanks at 15 °C"],
      ["Alcohol", "12.5%"],
      ["Residual Sugar", "2.2 g/l"],
      ["TA", "6.5 g/l"],
      ["Free SO2", "15 mg/l"],
      ["Total SO2", "79 mg/l"],
      ["Farming", "Organic"],
    ],
    viticulture: [
      "Roncathe comes from organically farmed, trellised Garganega on the basalt-rich volcanic soils of the Roncà hills, with yields held to 25 hl/ha.",
      "It is a crisp, fresh Soave with citrus and almond, and the volcanic soil adds a subtle, flinty and savoury twist.",
    ],
    salesFacts: [
      "Organic, sustainable viticulture",
      "A crisp, fresh organic Soave with citrus, almond and a subtle volcanic twist",
      "Volcanic Roncà soils give it a flinty, savoury edge",
    ],
  },
  {
    file: "corte-moschina-calcareo",
    name: "Corte Moschina Calcàreo Carménère",
    sku: "136421",
    bonVivant:
      "Ripe dark fruit and subtle spice, structured but elegant. Open it with grilled steak, roast lamb or a board of aged cheeses.",
    vibe: "Dinner party",
    occasions: ["Elegance", "Conversation"],
    story: CORTE_STORY,
    photos: CORTE_PHOTOS,
    bottle: "public/bottles/calcareo-carmenere.png",
    specs: [
      ["Region", "Colli Berici, Veneto"],
      ["Classification", "Colli Berici DOC"],
      ["Vintage", "2021"],
      ["Grapes", "100% Carménère"],
      ["Soil Composition", "Rich in limestone, with a stony substrate"],
      ["Vineyard Training", "Trellised vines"],
      ["Yield", "35 hl/ha"],
      ["Fermentation", "On the skins for 7–10 days"],
      ["Ageing", "24 months in French barriques"],
      ["Alcohol", "14%"],
      ["Residual Sugar", "1.0 g/l"],
      ["TA", "6.5 g/l"],
      ["Free SO2", "15 mg/l"],
      ["Total SO2", "79 mg/l"],
      ["Farming", "Organic"],
    ],
    viticulture: [
      "The vineyards are planted on the limestone-rich slopes of the Colli Berici DOC in Veneto, where excellent drainage and a significant day-to-night temperature difference promote slow, even ripening.",
      "The calcareous soils give elegance, fine structure and a distinctive mineral character.",
    ],
    salesFacts: [
      "Organic viticulture",
      "A structured, elegant Carménère with ripe fruit and subtle spice",
      "24 months in French barriques",
    ],
  },
];
