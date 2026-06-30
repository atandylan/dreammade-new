import type { ProductEdition, ProductExperience, ProductNarrative } from "./productExperience";

export type SyokPodEdition = ProductEdition;

export type SyokPodExperience = ProductExperience & {
  id: "syokpod-v2" | "syokpod-pro" | "syokpod-special-editions" | "syokpod-gt-edition" | "syokpod-2-years-anniversary" | "lush-limited-edition";
  heroImages: string[];
  bento: {
    mainHeading: string;
    mainBody: string;
    secondaryHeading: string;
    metrics: { value: string; label: string }[];
  };
};

const kohsCompatibility = "Compatible with KOHS K1000 and KOHS Xero.";
const syokpodCollectionLinks = [
  { eyebrow: "Closed system", label: "SyokPod V2", href: "/products/syokpod-v2" },
  { eyebrow: "Collector", label: "SyokPod Special Editions", href: "/products/syokpod-special-editions" },
  { eyebrow: "Closed system", label: "SyokPod Pro", href: "/products/syokpod-pro" }
];

const syokpodSpecs = [
  { label: "Battery", value: "450 mAh" },
  { label: "Charging", value: "Type-C" },
  { label: "Display", value: "LCD" },
  { label: "Dimensions", value: "9.7 x 16.5 x 101.8 mm" }
];

export const syokpodV2Standard: SyokPodEdition = {
  id: "standard",
  name: "SyokPod V2",
  eyebrow: "Core colourways",
  headline: "Five colours. One daily system.",
  description: "A closed-system device built for smooth sessions, standout colourways, and the SyokGeng way of life.",
  options: [
    { id: "ruby-red", name: "Ruby Red", displayName: "Ruby Red", colour: "#c31822", images: ["/products/syokpod/v2/syokpod-v2-red-01.webp", "/products/syokpod/v2/syokpod-v2-red-02.webp"] },
    { id: "pistachio-green", name: "Pistachio Green", displayName: "Pistachio Green", colour: "#a8c56f", images: ["/products/syokpod/v2/syokpod-v2-green-01.webp", "/products/syokpod/v2/syokpod-v2-green-02.webp"] },
    { id: "graphite-grey", name: "Graphite Grey", displayName: "Graphite Grey", colour: "#575d61", images: ["/products/syokpod/v2/syokpod-v2-grey-01.webp", "/products/syokpod/v2/syokpod-v2-grey-02.webp"] },
    { id: "midnight-blue", name: "Midnight Blue", displayName: "Midnight Blue", colour: "#172d4e", images: ["/products/syokpod/v2/syokpod-v2-blue-01.webp", "/products/syokpod/v2/syokpod-v2-blue-02.webp"] },
    { id: "raven-black", name: "Raven Black", displayName: "Raven Black", colour: "#070707", images: ["/products/syokpod/v2/syokpod-v2-black-01.webp", "/products/syokpod/v2/syokpod-v2-black-02.webp"] }
  ],
  specs: syokpodSpecs,
  viewLabels: ["FRONT", "SIDE PROFILE"],
  defaultViewIndex: 0
};

export const syokpodProEdition: SyokPodEdition = {
  id: "standard",
  name: "SyokPod Pro",
  eyebrow: "Core colourways",
  headline: "More control. Stronger silhouette.",
  description: "Built for users who want a bolder SyokPod experience without losing everyday comfort.",
  options: [
    { id: "obsidian", name: "Obsidian", displayName: "Obsidian", colour: "#050505", images: ["/products/syokpod/pro/syokpod-pro-obsidian-01.webp"] },
    { id: "iridium", name: "Iridium", displayName: "Iridium", colour: "#b9c0c8", images: ["/products/syokpod/pro/syokpod-pro-lightgrey-01.webp"] },
    { id: "midas", name: "Midas", displayName: "Midas", colour: "#caa24d", images: ["/products/syokpod/pro/syokpod-pro-gold-01.webp"] },
    { id: "graphite", name: "Graphite", displayName: "Graphite", colour: "#4b4f52", images: ["/products/syokpod/pro/syokpod-pro-gray-01.webp"] },
    { id: "forest", name: "Forest", displayName: "Forest", colour: "#234634", images: ["/products/syokpod/pro/syokpod-pro-green-01.webp"] }
  ],
  specs: [
    { label: "Battery", value: "600 mAh" },
    { label: "Charging", value: "Type-C" },
    { label: "Modes", value: "ECO / LOW / HIGH" },
    { label: "Display", value: "LED" },
    { label: "Dimensions", value: "20.2 x 118.9 x 11 mm" }
  ]
};

export const syokpodGtEdition: SyokPodEdition = {
  id: "gt-edition",
  name: "SyokPod GT Edition",
  eyebrow: "Collector edition",
  headline: "Metallic finish. Collector energy.",
  description: "A performance-led SyokPod expression shaped through metallic finishes and a sharper collector mood.",
  viewLabels: ["FRONT", "ANGLED", "BODY DETAIL"],
  defaultViewIndex: 1,
  options: [
    { id: "copper", name: "Copper", displayName: "Copper", colour: "#a95e3d", images: ["/products/syokpod/gt/syokpod-gt-copper-01.webp", "/products/syokpod/gt/syokpod-gt-cooper-04.webp", "/products/syokpod/gt/syokpod-gt-copper-body.webp"] },
    { id: "silver", name: "Silver", displayName: "Silver", colour: "#b9bec4", images: ["/products/syokpod/gt/syokpod-gt-silver-01.webp", "/products/syokpod/gt/syokpod-gt-silver-02.webp", "/products/syokpod/gt/syokpod-gt-silver-body.webp"] }
  ],
  specs: syokpodSpecs
};

export const syokpod2YearsEdition: SyokPodEdition = {
  id: "2-years-anniversary",
  name: "2 Years Anniversary",
  eyebrow: "Commemorative edition",
  headline: "Two years in. Still moving.",
  description: "A commemorative SyokPod expression marking two years of product culture, community, and the SyokGeng journey.",
  viewLabels: ["FRONT", "ANGLED", "DETAIL"],
  defaultViewIndex: 1,
  options: [{
    id: "anniversary",
    name: "2 Years Anniversary",
    displayName: "Anniversary",
    colour: "#e9e3d8",
    images: ["/products/syokpod/2years/syokpod-2years-01.webp", "/products/syokpod/2years/syokpod-2years-02.webp", "/products/syokpod/2years/syokpod-2years-03.webp"]
  }],
  specs: syokpodSpecs
};

export const syokpodLushEdition: SyokPodEdition = {
  id: "lush-limited-edition",
  name: "Lush Limited Edition",
  eyebrow: "Limited edition",
  headline: "Softer colour. Same Syok attitude.",
  description: "A fresh limited-edition colour story that brings a softer visual edge into the SyokPod line.",
  viewLabels: ["FRONT", "ANGLED", "DETAIL"],
  defaultViewIndex: 1,
  options: [{
    id: "lush",
    name: "Lush",
    displayName: "Lush",
    colour: "#8fbf74",
    images: ["/products/syokpod/lush/syokpod-lush-01.webp", "/products/syokpod/lush/syokpod-lush-02.webp", "/products/syokpod/lush/syokpod-lush-03.webp"]
  }],
  specs: syokpodSpecs
};

const bentoFallback = {
  mainHeading: "Built for the daily carry.",
  mainBody: "A compact closed-system silhouette shaped for colour, clarity, and everyday movement.",
  secondaryHeading: "Colour, clarity, carry.",
  metrics: [
    { value: "LCD", label: "Battery visibility at a glance" },
    { value: "Type-C", label: "Ready again" },
    { value: "KOHS", label: "Closed-system format" },
    { value: "Syok", label: "Series language" }
  ]
};

const viewerFor = (headline: string, body: string[]) => ({
  headline,
  body,
  notes: [
    { label: "Design note", value: "Compact closed-system SyokPod form" },
    { label: "Pairing", value: "KOHS K1000 / KOHS Xero" }
  ]
});

const designNarrative = (title: string, paragraphs: string[]): ProductNarrative => ({
  eyebrow: "02 / DESIGN LANGUAGE",
  title,
  tone: "dark",
  paragraphs
});

const withNarratives = <T extends SyokPodExperience>(experience: T, second: ProductNarrative): T => ({
  ...experience,
  narratives: [experience.narrative, second].filter(Boolean) as ProductNarrative[]
});

export const syokpodV2Experience: SyokPodExperience = withNarratives({
  id: "syokpod-v2",
  name: "SyokPod V2",
  eyebrow: "Closed System / Syok Series",
  statement: "Compact, clean and built for daily carry.",
  description: syokpodV2Standard.description,
  compatibility: kohsCompatibility,
  editions: [syokpodV2Standard],
  heroImages: syokpodV2Standard.options.map((option) => option.images[0]),
  bento: bentoFallback,
  viewer: viewerFor("Choose the colour that carries your daily signal.", [
    "SyokPod V2 keeps the product language simple: compact body, bold colour, clear screen and everyday closed-system comfort.",
    "Five standard colourways give the daily device a clear, confident shelf presence."
  ]),
  narrative: {
    eyebrow: "01 / Product Philosophy",
    title: "DESIGNED AROUND THE EVERYDAY.",
    paragraphs: [
      "SyokPod V2 is shaped around the rhythm of everyday use: compact proportions, a clear product face and finishes that remain easy to recognise.",
      "The design stays restrained enough for daily carry while colour gives each version its own identity. Function remains direct, and the form stays visually consistent across the range."
    ]
  },
  storySlides: [
    { eyebrow: "Core range", title: "Five colours. One daily system.", body: "Ruby Red, Pistachio Green, Graphite Grey, Midnight Blue and Raven Black move in an alternating rhythm across the V2 range.", image: "/products/syokpod/v2/syokpod-v2-red-02.webp", imageAlt: "SyokPod V2 Ruby Red angled view" },
    { eyebrow: "Interface", title: "Compact by design.", body: "The V2 silhouette is built for smooth pocket carry, fast recognition and clear KOHS pairing.", image: "/products/syokpod/v2/syokpod-v2-green-02.webp", imageAlt: "SyokPod V2 Pistachio Green side profile", tone: "red" },
    { eyebrow: "Finish", title: "Colour that reads fast.", body: "Each finish keeps the device bold without adding visual noise.", image: "/products/syokpod/v2/syokpod-v2-grey-02.webp", imageAlt: "SyokPod V2 Graphite Grey side profile" }
  ],
  collectionLinks: syokpodCollectionLinks
}, designNarrative("COMPACT FORM.\nCLEAR IDENTITY.", [
  "Compact body, bold colour and a clear screen keep SyokPod V2 direct in the hand and easy to recognise in the lineup.",
  "Five standard colourways give the device a confident shelf presence while the overall form stays clean and familiar."
]));

export const syokpodProExperience: SyokPodExperience = withNarratives({
  id: "syokpod-pro",
  name: "SyokPod Pro",
  eyebrow: "Closed System / Syok Series",
  statement: "More control. Stronger silhouette.",
  description: syokpodProEdition.description,
  compatibility: kohsCompatibility,
  editions: [syokpodProEdition],
  heroImages: syokpodProEdition.options.map((option) => option.images[0]),
  bento: bentoFallback,
  viewer: viewerFor("A stronger SyokPod shape for users who want more control.", [
    "SyokPod Pro shifts the family into a more upright, controlled object with mode selection and a bigger battery.",
    "The finish order keeps the range balanced: dark, light, warm, neutral, green."
  ]),
  narrative: {
    eyebrow: "01 / Product Philosophy",
    title: "MORE PRESENCE. MORE CONTROL.",
    paragraphs: [
      "SyokPod Pro gives the system a broader silhouette and a stronger physical presence while keeping the interaction clear and familiar.",
      "Its finish range moves between dark utility, metallic warmth and understated colour, allowing the same platform to take on different visual characters."
    ]
  },
  storySlides: [
    { eyebrow: "Pro profile", title: "More grip. More control.", body: "Obsidian, Iridium, Midas, Graphite and Forest give the Pro family a more premium product-led rhythm.", image: "/products/syokpod/pro/syokpod-pro-obsidian-01.webp", imageAlt: "SyokPod Pro Obsidian" },
    { eyebrow: "Interface", title: "ECO. LOW. HIGH.", body: "Three mode control keeps the experience flexible while the silhouette stays unmistakably SyokPod.", image: "/products/syokpod/pro/syokpod-pro-lightgrey-01.webp", imageAlt: "SyokPod Pro Iridium", tone: "dark" },
    { eyebrow: "Finish", title: "A heavier visual stance.", body: "The Pro colour set leans darker and more technical while keeping the object clean.", image: "/products/syokpod/pro/syokpod-pro-gold-01.webp", imageAlt: "SyokPod Pro Midas" }
  ],
  collectionLinks: syokpodCollectionLinks
}, designNarrative("A BROADER,\nBOLDER SILHOUETTE.", [
  "SyokPod Pro moves into a more upright, controlled object with a finish order that balances dark, light, warm, neutral and green.",
  "Obsidian, Iridium, Midas, Graphite and Forest give the Pro family a stronger product-led rhythm without losing everyday comfort."
]));

export const syokpodSpecialEditionsExperience: SyokPodExperience = withNarratives({
  id: "syokpod-special-editions",
  name: "SyokPod Special Editions",
  eyebrow: "Collector Expressions / SyokPod",
  statement: "Collector finishes. One SyokPod platform.",
  description: "GT, 2 Years Anniversary and Lush reinterpret the SyokPod platform through finish, colour and collector identity.",
  compatibility: kohsCompatibility,
  editions: [syokpodGtEdition, syokpod2YearsEdition, syokpodLushEdition],
  heroImages: [
    syokpodGtEdition.options[0].images[1],
    syokpod2YearsEdition.options[0].images[1],
    syokpodLushEdition.options[0].images[1]
  ],
  bento: bentoFallback,
  viewer: viewerFor("Collector expressions across the SyokPod platform.", [
    "GT, Anniversary and Lush each carry a distinct visual story while keeping the same closed-system product language.",
    "Choose the edition first, then move through its finish and angle views."
  ]),
  narrative: {
    eyebrow: "01 / Collector Expressions",
    title: "COLLECTOR FINISHES. ONE SYOKPOD PLATFORM.",
    paragraphs: [
      "GT, 2 Years Anniversary and Lush reinterpret the SyokPod platform through finish, colour and collector identity rather than a different hardware system.",
      "Each edition carries its own visual story while sharing the same underlying product language, controls and compatible KOHS format."
    ]
  },
  collectionLinks: syokpodCollectionLinks
}, designNarrative("FINISH CHANGES\nTHE CHARACTER.", [
  "GT, Anniversary and Lush each carry a distinct visual story while keeping the same closed-system product language.",
  "The edition changes the mood first: metallic collector energy, a commemorative marker or a softer limited colour story."
]));

export const syokpodGtExperience: SyokPodExperience = withNarratives({
  id: "syokpod-gt-edition",
  name: "SyokPod GT Edition",
  eyebrow: "Collector Edition / SyokPod V2",
  statement: "Metallic finish. Collector energy.",
  description: syokpodGtEdition.description,
  compatibility: kohsCompatibility,
  editions: [syokpodGtEdition],
  heroImages: syokpodGtEdition.options.map((option) => option.images[1]),
  bento: bentoFallback,
  viewer: viewerFor("A metallic collector lane for the V2 body.", [
    "GT Edition gives the standard V2 shape a sharper metallic mood in copper and silver.",
    "The product viewer leads with the stronger front-facing angles so the finish reads immediately."
  ]),
  storySlides: [
    { eyebrow: "Form", title: "Copper and silver with a sharper edge.", body: "Both metallic finishes keep the familiar V2 body while pushing the object into collector territory.", image: "/products/syokpod/gt/syokpod-gt-cooper-04.webp", imageAlt: "SyokPod GT Copper front-facing view", tone: "red" },
    { eyebrow: "Finish", title: "Built around the finish.", body: "Detail views give the metallic body room to feel deliberate and product-led.", image: "/products/syokpod/gt/syokpod-gt-silver-body.webp", imageAlt: "SyokPod GT Silver body detail" }
  ],
  narrative: {
    eyebrow: "01 / Collector Expression",
    title: "METALLIC FINISH. COLLECTOR ENERGY.",
    paragraphs: [
      "GT Edition gives the standard V2 shape a sharper metallic mood in copper and silver.",
      "Both metallic finishes keep the familiar V2 body while pushing the object into collector territory."
    ]
  },
  collectionLinks: syokpodCollectionLinks
}, designNarrative("FINISH CHANGES\nTHE CHARACTER.", [
  "Copper and silver let the familiar V2 body move into a darker collector lane without changing the product platform.",
  "Detail views give the metallic body room to feel deliberate and product-led."
]));

export const syokpodAnniversaryExperience: SyokPodExperience = withNarratives({
  id: "syokpod-2-years-anniversary",
  name: "2 Years Anniversary",
  eyebrow: "Commemorative Edition / SyokPod V2",
  statement: "Two years in. Still moving.",
  description: syokpod2YearsEdition.description,
  compatibility: kohsCompatibility,
  editions: [syokpod2YearsEdition],
  heroImages: syokpod2YearsEdition.options[0].images,
  bento: bentoFallback,
  viewer: viewerFor("A clean commemorative object for the SyokGeng timeline.", [
    "The 2 Years Anniversary edition marks the Dreammade timeline with a softer commemorative finish.",
    "Soft tones, clear detail views and a quiet rhythm keep the anniversary expression premium."
  ]),
  storySlides: [
    { eyebrow: "Commemorative", title: "A marker for the community.", body: "This edition keeps the silhouette familiar while the finish marks the two-year Dreammade moment.", image: "/products/syokpod/2years/syokpod-2years-02.webp", imageAlt: "SyokPod 2 Years Anniversary front-facing view" },
    { eyebrow: "Detail", title: "Soft tone. Clear signal.", body: "A quieter visual treatment gives the anniversary edition room to breathe as a collectible.", image: "/products/syokpod/2years/syokpod-2years-03.webp", imageAlt: "SyokPod 2 Years Anniversary detail", tone: "red" }
  ],
  narrative: {
    eyebrow: "01 / Commemorative Expression",
    title: "TWO YEARS IN. STILL MOVING.",
    paragraphs: [
      "The 2 Years Anniversary edition keeps the silhouette familiar while the finish marks the two-year Dreammade moment.",
      "Soft tones, clear detail views and a quiet rhythm keep the anniversary expression premium."
    ]
  },
  collectionLinks: syokpodCollectionLinks
}, designNarrative("FINISH CHANGES\nTHE CHARACTER.", [
  "A softer commemorative finish gives the SyokPod platform a quieter visual treatment.",
  "The object stays familiar while the colour story becomes the marker for the Dreammade timeline."
]));

export const syokpodLushExperience: SyokPodExperience = withNarratives({
  id: "lush-limited-edition",
  name: "Lush Limited Edition",
  eyebrow: "Limited Edition / SyokPod V2",
  statement: "Softer colour. Same Syok attitude.",
  description: syokpodLushEdition.description,
  compatibility: kohsCompatibility,
  editions: [syokpodLushEdition],
  heroImages: syokpodLushEdition.options[0].images,
  bento: bentoFallback,
  viewer: viewerFor("A fresh limited colour story for the V2 shape.", [
    "Lush moves the SyokPod V2 body into a softer seasonal lane while keeping the product language clean.",
    "The limited finish feels fresh, bright and easy to recognise at a glance."
  ]),
  storySlides: [
    { eyebrow: "Limited colour", title: "Green with a softer edge.", body: "Lush is a seasonal colour story with the same compact V2 utility underneath.", image: "/products/syokpod/lush/syokpod-lush-02.webp", imageAlt: "Lush Limited Edition front-facing view", tone: "red" },
    { eyebrow: "Seasonal signal", title: "Fresh without losing Syok.", body: "The limited finish stays light, clear and product-led across the full detail sequence.", image: "/products/syokpod/lush/syokpod-lush-03.webp", imageAlt: "Lush Limited Edition detail" }
  ],
  narrative: {
    eyebrow: "01 / Limited Colour",
    title: "SOFTER COLOUR. SAME SYOK ATTITUDE.",
    paragraphs: [
      "Lush moves the SyokPod V2 body into a softer seasonal lane while keeping the product language clean.",
      "The limited finish feels fresh, bright and easy to recognise at a glance."
    ]
  },
  collectionLinks: syokpodCollectionLinks
}, designNarrative("FINISH CHANGES\nTHE CHARACTER.", [
  "Lush is a seasonal colour story with the same compact V2 utility underneath.",
  "The limited finish stays light, clear and product-led across the full detail sequence."
]));

export const syokpodExperiences: Record<string, SyokPodExperience> = {
  "syokpod-v2": syokpodV2Experience,
  "syokpod-pro": syokpodProExperience,
  "syokpod-special-editions": syokpodSpecialEditionsExperience,
  "syokpod-gt-edition": syokpodGtExperience,
  "syokpod-2-years-anniversary": syokpodAnniversaryExperience,
  "lush-limited-edition": syokpodLushExperience
};
