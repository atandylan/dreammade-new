import type { ProductEdition, ProductExperience, ProductMediaOption, ProductNarrative, ProductStorySlide } from "./productExperience";

export type SyokBarGalleryKind = "none" | "fifa" | "camo" | "target";

export type SyokBarEdition = ProductEdition & {
  gallery: SyokBarGalleryKind;
  bento: {
    heading: string;
    body: string;
    lineup: ProductMediaOption[];
    metrics: { value: string; label: string }[];
  };
};

export type SyokBarExperience = Omit<ProductExperience, "id" | "editions"> & {
  id: "syokbar" | "syokbar-special-editions" | "syokbar-fifa" | "syokbar-camo-edition" | "syokbar-target";
  family: "syokbar";
  heroImages: string[];
  target?: boolean;
  editions: SyokBarEdition[];
};

const syokbarSpecs = [
  { label: "Battery", value: "600 mAh" },
  { label: "Charging Port", value: "Type-C" },
  { label: "Screen", value: "LED" }
];

const syokbarMetrics = [
  { value: "600 mAh", label: "Battery" },
  { value: "Type-C", label: "Charging" },
  { value: "LED", label: "Screen" },
  { value: "Syok", label: "Disposable series" }
];

const standardOptions: ProductMediaOption[] = [
  { id: "magma-red", name: "Magma Red", displayName: "Magma Red", colour: "#d31922", images: ["/products/syokbar/SYOKBAR/syokbar-red-01.webp", "/products/syokbar/SYOKBAR/syokbar-red-02.webp", "/products/syokbar/SYOKBAR/syokbar-red-03.webp"] },
  { id: "volt-green", name: "Volt Green", displayName: "Volt Green", colour: "#8ddb34", images: ["/products/syokbar/SYOKBAR/syokbar-green-01.webp", "/products/syokbar/SYOKBAR/syokbar-green-02.webp", "/products/syokbar/SYOKBAR/syokbar-green-03.webp"] },
  { id: "bolide-blue", name: "Bolide Blue", displayName: "Bolide Blue", colour: "#1f55a8", images: ["/products/syokbar/SYOKBAR/syokbar-blue-01.webp", "/products/syokbar/SYOKBAR/syokbar-blue-02.webp", "/products/syokbar/SYOKBAR/syokbar-blue-03.webp"] },
  { id: "lava-orange", name: "Lava Orange", displayName: "Lava Orange", colour: "#ef651d", images: ["/products/syokbar/SYOKBAR/syokbar-orange-01.webp", "/products/syokbar/SYOKBAR/syokbar-orange-02.webp", "/products/syokbar/SYOKBAR/syokbar-orange-03.webp"] },
  { id: "crayon-grey", name: "Crayon Grey", displayName: "Crayon Grey", colour: "#bfc0bc", images: ["/products/syokbar/SYOKBAR/syokbar-grey-01.webp", "/products/syokbar/SYOKBAR/syokbar-grey-02.webp", "/products/syokbar/SYOKBAR/syokbar-grey-03.webp"] }
];

const fifaOptions: ProductMediaOption[] = [
  { id: "england", name: "England", displayName: "England", colour: "#f7f3ee", images: ["/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-01.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-03.webp"] },
  { id: "portugal", name: "Portugal", displayName: "Portugal", colour: "#d31922", images: ["/products/syokbar/SYOKBAR FIFA/syokbar-fifa-portugal-01.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-portugal-02.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-portugal-03.webp"] },
  { id: "france", name: "France", displayName: "France", colour: "#1f55a8", images: ["/products/syokbar/SYOKBAR FIFA/syokbar-fifa-france-01.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-france-02.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-france-03.webp"] },
  { id: "spain", name: "Spain", displayName: "Spain", colour: "#efc247", images: ["/products/syokbar/SYOKBAR FIFA/syokbar-fifa-esp-01.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-esp-02.webp", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-esp-03.webp"] }
];

const camoOptions: ProductMediaOption[] = [
  { id: "camo", name: "Camo", displayName: "Camo", colour: "#41533a", images: ["/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-01.webp", "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-02.webp", "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-03.webp"] }
];

const targetOptions: ProductMediaOption[] = [
  { id: "lava-orange", name: "Lava Orange", displayName: "Lava Orange", colour: "#ef651d", images: ["/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-01.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-02.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-03.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-04.webp"] },
  { id: "ghost-green", name: "Ghost Green", displayName: "Ghost Green", colour: "#bcefa1", images: ["/products/syokbar/SYOKBAR TARGET/syokbar-target-green-01.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-green-02.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-green-03.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-green-04.webp"] },
  { id: "magma-red", name: "Magma Red", displayName: "Magma Red", colour: "#d31922", images: ["/products/syokbar/SYOKBAR TARGET/syokbar-target-red-01.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-red-02.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-red-03.webp", "/products/syokbar/SYOKBAR TARGET/syokbar-target-red-04.webp"] }
];

const edition = (
  input: Omit<SyokBarEdition, "specs" | "defaultViewIndex" | "bento"> & { specs?: SyokBarEdition["specs"]; defaultViewIndex?: number; bento?: SyokBarEdition["bento"] }
): SyokBarEdition => ({
  ...input,
  specs: input.specs ?? syokbarSpecs,
  defaultViewIndex: input.defaultViewIndex ?? 1,
  bento: input.bento ?? {
    heading: input.headline,
    body: input.description,
    lineup: input.options,
    metrics: syokbarMetrics
  }
});

const standardEdition = edition({
  id: "standard",
  name: "SyokBar",
  eyebrow: "Disposable System / Syok Series",
  headline: "Made to move. Built to stand out.",
  description: "Disposable convenience shaped through bold colour, a compact screen, and the fast-moving Syok lifestyle.",
  options: standardOptions,
  viewLabels: ["COLOUR FACE", "THREE-QUARTER", "SCREEN"],
  gallery: "none"
});

const fifaEdition = edition({
  id: "fifa",
  name: "SyokBar FIFA",
  eyebrow: "Collector edition",
  headline: "Four countries. One match-day energy.",
  description: "A sport-coded SyokBar collection built around country colour, collector identity, and event culture.",
  options: fifaOptions,
  viewLabels: ["COUNTRY FACE", "THREE-QUARTER", "SCREEN"],
  gallery: "fifa"
});

const camoEdition = edition({
  id: "camo",
  name: "SyokBar Camo Edition",
  eyebrow: "Utility edition",
  headline: "Field tone. Street energy.",
  description: "A utility-led SyokBar expression shaped through layered camouflage and an outdoor campaign attitude.",
  options: camoOptions,
  viewLabels: ["CAMO FACE", "THREE-QUARTER", "SCREEN"],
  gallery: "camo"
});

const targetSpecs = [
  { label: "Device Size", value: "83 x 25 x 47.1 mm" },
  { label: "Battery", value: "650 mAh" },
  { label: "Voltage", value: "3.5 V" },
  { label: "Charging Port", value: "Type-C" },
  { label: "Coil", value: "Mesh Coil" },
  { label: "Resistance", value: "0.8ohm" },
  { label: "Screen", value: "LCD" },
  { label: "Colours", value: "Magma Red, Lava Orange, Ghost Green" }
];

const targetEdition = edition({
  id: "standard",
  name: "SyokBar Target",
  eyebrow: "Open System / Syok Series",
  headline: "Refill. Switch. Stay in rhythm.",
  description: "Open-system flexibility built into a compact body with bold colour, an LCD screen, and everyday control.",
  options: targetOptions,
  specs: targetSpecs,
  viewLabels: ["DISPLAY FRONT", "REAR PANEL", "TARGET SIDE", "DEVICE INFO"],
  defaultViewIndex: 0,
  gallery: "target",
  bento: {
    heading: "Refill control. Pocket rhythm.",
    body: "Three bold Target colourways shaped for daily movement, LCD clarity, and open-system flexibility.",
    lineup: targetOptions,
    metrics: [
      { value: "650 mAh", label: "Battery" },
      { value: "LCD", label: "Screen" },
      { value: "Mesh Coil", label: "Coil" },
      { value: "Type-C", label: "Charging" }
    ]
  }
});

const syokbarCollectionLinks = [
  { eyebrow: "Disposable", label: "SyokBar", href: "/products/syokbar" },
  { eyebrow: "Collector", label: "SyokBar Special Editions", href: "/products/syokbar-special-editions" },
  { eyebrow: "Open system", label: "SyokBar Target", href: "/products/syokbar-target" }
];

const viewerFor = (headline: string, body: string[]) => ({
  headline,
  body,
  notes: [
    { label: "Design note", value: "Bold colour with compact screen attitude" },
    { label: "Experience note", value: "Colour and angle controls sit below the image" }
  ]
});

const story = (images: string[], title: string, body: string, tone: "cream" | "red" | "dark" = "cream"): ProductStorySlide[] => ([
  { eyebrow: "01 / Form", title, body, image: images[0], imageAlt: title, tone },
  { eyebrow: "02 / Interface", title: "Screen-led and easy to read.", body: "The compact face keeps the device useful while the colour system does the loud work.", image: images[1] ?? images[0], imageAlt: title },
  { eyebrow: "03 / Finish", title: "A clear product signal.", body: "Every finish is tuned for fast recognition and a premium catalogue presence.", image: images[2] ?? images[0], imageAlt: title, tone: "red" }
]);

const designNarrative = (title: string, paragraphs: string[]): ProductNarrative => ({
  eyebrow: "02 / DESIGN LANGUAGE",
  title,
  tone: "dark",
  paragraphs
});

const withNarratives = <T extends SyokBarExperience>(experience: T, second: ProductNarrative): T => ({
  ...experience,
  narratives: [experience.narrative, second].filter(Boolean) as ProductNarrative[]
});

export const syokbarExperience: SyokBarExperience = withNarratives({
  id: "syokbar",
  family: "syokbar",
  name: "SyokBar",
  eyebrow: "Disposable System / Syok Series",
  statement: "Disposable convenience with a stronger lifestyle attitude.",
  description: standardEdition.description,
  compatibility: "Compatible with KOHS K3000.",
  editions: [standardEdition],
  heroImages: standardOptions.map((option) => option.images[0]),
  viewer: viewerFor("Five disposable colourways with a louder product face.", [
    "SyokBar stays focused on its standard range here: red, green, blue, orange and grey.",
    "A compact screen, bold colours and disposable convenience keep the rhythm direct."
  ]),
  narrative: {
    eyebrow: "01 / Product Philosophy",
    title: "COLOUR BUILT FOR MOVEMENT.",
    paragraphs: [
      "SyokBar turns a compact disposable format into a clearer lifestyle object through bold colour faces, a visible screen and a direct product silhouette.",
      "The range is designed for fast recognition. Every colour changes the personality of the device without changing the simplicity of the experience."
    ]
  },
  storySlides: story(standardOptions[0].images, "Made to move. Built to stand out.", "A compact disposable system with colour, screen attitude and grab-and-go energy.", "red"),
  collectionLinks: syokbarCollectionLinks
}, designNarrative("BUILT TO BE\nSEEN IN MOTION.", [
  "Five bold colours, a compact screen and disposable convenience keep the SyokBar rhythm direct.",
  "Each colour changes the personality of the device while the product face stays easy to read."
]));

export const syokbarSpecialEditionsExperience: SyokBarExperience = withNarratives({
  id: "syokbar-special-editions",
  family: "syokbar",
  name: "SyokBar Special Editions",
  eyebrow: "Edition Culture / SyokBar",
  statement: "Two visual worlds. One SyokBar platform.",
  description: "FIFA and Camo move the SyokBar platform into match-day identity and outdoor utility.",
  compatibility: "Compatible with KOHS K3000.",
  editions: [fifaEdition, camoEdition],
  heroImages: [fifaOptions[0].images[0], camoOptions[0].images[0]],
  viewer: viewerFor("Move between match-day identity and utility-led surface.", [
    "FIFA and Camo give SyokBar two different edition cultures while keeping the same disposable-system foundation.",
    "Choose the edition first, then move through country or finish views."
  ]),
  narrative: {
    eyebrow: "01 / Edition Culture",
    title: "TWO VISUAL WORLDS. ONE SYOKBAR PLATFORM.",
    paragraphs: [
      "FIFA and Camo move the SyokBar platform into two different visual worlds: match-day identity and outdoor utility.",
      "The editions share the same product foundation, while colour, surface and campaign imagery give each collection a distinct cultural character."
    ]
  },
  collectionLinks: syokbarCollectionLinks
}, designNarrative("COLOUR CREATES\nTHE CULTURE.", [
  "FIFA and Camo give SyokBar two different edition cultures while keeping the same disposable-system foundation.",
  "Country colour, layered camouflage and campaign imagery give each collection a distinct visual character."
]));

export const syokbarFifaExperience: SyokBarExperience = withNarratives({
  id: "syokbar-fifa",
  family: "syokbar",
  name: "SyokBar FIFA",
  eyebrow: "Collector Edition / SyokBar",
  statement: "Four countries. One match-day energy.",
  description: fifaEdition.description,
  compatibility: "Compatible with KOHS K3000.",
  editions: [fifaEdition],
  heroImages: fifaOptions.map((option) => option.images[0]),
  viewer: viewerFor("Country colour built as a collector moment.", [
    "England, Portugal, France and Spain are arranged as a dedicated match-day collection.",
    "Country colour and collector identity give the device a strong event-ready presence."
  ]),
  storySlides: story(fifaOptions[0].images, "Match-day identity in four colour codes.", "A sport-coded product story for event culture, collector rhythm and national colour.", "dark"),
  narrative: {
    eyebrow: "01 / Collector Edition",
    title: "FOUR COUNTRIES. ONE MATCH-DAY ENERGY.",
    paragraphs: [
      "England, Portugal, France and Spain are arranged as a dedicated match-day collection.",
      "Country colour and collector identity give the device a strong event-ready presence."
    ]
  },
  collectionLinks: syokbarCollectionLinks
}, designNarrative("COLOUR CREATES\nTHE CULTURE.", [
  "Country colour builds the FIFA edition into a clearer collector moment across the SyokBar platform.",
  "The product story stays focused on national colour, collector rhythm and match-day identity."
]));

export const syokbarCamoExperience: SyokBarExperience = withNarratives({
  id: "syokbar-camo-edition",
  family: "syokbar",
  name: "SyokBar Camo Edition",
  eyebrow: "Utility Edition / SyokBar",
  statement: "Field tone. Street energy.",
  description: camoEdition.description,
  compatibility: "Compatible with KOHS K3000.",
  editions: [camoEdition],
  heroImages: camoOptions[0].images,
  viewer: viewerFor("A utility-led colour story with outdoor campaign attitude.", [
    "Camo Edition gives SyokBar a field-tone finish with a tougher visual language.",
    "Campaign imagery carries the utility mood while the product cutout remains accurate and undistorted."
  ]),
  storySlides: story(camoOptions[0].images, "Layered camouflage, clean product read.", "A field-tone expression that moves from outdoor campaign energy back into the SyokBar body.", "dark"),
  narrative: {
    eyebrow: "01 / Utility Edition",
    title: "FIELD TONE. STREET ENERGY.",
    paragraphs: [
      "Camo Edition gives SyokBar a field-tone finish with a tougher visual language.",
      "Campaign imagery carries the utility mood while the product cutout remains accurate and undistorted."
    ]
  },
  collectionLinks: syokbarCollectionLinks
}, designNarrative("COLOUR CREATES\nTHE CULTURE.", [
  "Layered camouflage moves the SyokBar body into a utility-led colour story.",
  "The expression moves from outdoor campaign energy back into the same clean product foundation."
]));

export const syokbarTargetExperience: SyokBarExperience = withNarratives({
  id: "syokbar-target",
  family: "syokbar",
  target: true,
  name: "SyokBar Target",
  eyebrow: "Open System / Syok Series",
  statement: "Open-system flexibility with a compact body and bold flavour control.",
  description: targetEdition.description,
  compatibility: "Compatible with KOHS E-Liquid.",
  editions: [targetEdition],
  heroImages: targetOptions.map((option) => option.images[0]),
  viewer: viewerFor("Refill control with a compact Target body.", [
    "Target stays in the SyokBar family but shifts the system into refillable, open-system control.",
    "The colour order runs orange, green, red for a brighter editorial rhythm."
  ]),
  narrative: {
    eyebrow: "01 / Product Philosophy",
    title: "REFILLABLE CONTROL. COMPACT BY DESIGN.",
    paragraphs: [
      "SyokBar Target shifts the family into refillable open-system control with a shorter, wider body and a clear LCD-led interface.",
      "The three colourways keep the product expressive while the refillable format introduces a different daily rhythm within the Syok range."
    ]
  },
  storySlides: story(targetOptions[0].images, "Refill. Switch. Stay in rhythm.", "Target combines LCD clarity, Mesh Coil control and campaign-led daily movement.", "red"),
  collectionLinks: syokbarCollectionLinks
}, designNarrative("SHORTER FORM.\nREFILLABLE RHYTHM.", [
  "Target stays in the SyokBar family but shifts the system into refillable, open-system control.",
  "The colour order runs orange, green and red for a brighter editorial rhythm across the shorter, wider body."
]));

export const syokbarExperiences: Record<string, SyokBarExperience> = {
  syokbar: syokbarExperience,
  "syokbar-special-editions": syokbarSpecialEditionsExperience,
  "syokbar-fifa": syokbarFifaExperience,
  "syokbar-camo-edition": syokbarCamoExperience,
  "syokbar-target": syokbarTargetExperience
};
