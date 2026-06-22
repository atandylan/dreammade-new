export type ProductSystem = "closed-system" | "disposable-system" | "open-system";
export type ProductCategory = "core-device" | "special-edition";
export type VariantType = "standard" | "special-edition";

export type ProductVariant = {
  id: string;
  name: string;
  type: VariantType;
  color: string;
  image: string;
  note?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  system: ProductSystem;
  category: ProductCategory;
  type: string;
  label: string;
  shortDescription: string;
  description: string;
  compatibleWith: string[];
  madeFor: string[];
  variants: {
    standardColourways: ProductVariant[];
    specialEditions: ProductVariant[];
  };
  images: {
    primary: string;
    svg: string;
  };
  specs?: ProductSpec[];
  route: string;
};

export type ProductSystemGroup = {
  id: ProductSystem;
  eyebrow: string;
  title: string;
  description: string;
  groups: {
    title: string;
    category: ProductCategory;
    products: Product[];
  }[];
};

const variant = (id: string, name: string, type: VariantType, color: string, image: string, note?: string): ProductVariant => ({
  id,
  name,
  type,
  color,
  image,
  note
});

const deviceSvg = {
  syokpodV2: '<svg viewBox="0 0 170 360"><rect x="50" y="14" width="70" height="332" rx="35" fill="#f7f3ee"/><rect x="65" y="66" width="40" height="146" rx="20" fill="#050505"/><circle cx="85" cy="250" r="16" fill="#e50914"/></svg>',
  syokpodPro: '<svg viewBox="0 0 170 360"><rect x="42" y="16" width="86" height="328" rx="38" fill="#e50914"/><rect x="62" y="66" width="46" height="168" rx="23" fill="#050505"/><rect x="66" y="274" width="38" height="24" rx="12" fill="#f7f3ee"/></svg>',
  syokpodGt: '<svg viewBox="0 0 170 360"><rect x="44" y="18" width="82" height="324" rx="38" fill="#111"/><rect x="62" y="66" width="46" height="154" rx="22" fill="#e50914"/><circle cx="85" cy="258" r="14" fill="#f7f3ee"/></svg>',
  syokpodAnniversary: '<svg viewBox="0 0 170 360"><rect x="48" y="14" width="74" height="332" rx="36" fill="#f7f3ee"/><rect x="64" y="66" width="42" height="150" rx="21" fill="#050505"/><rect x="72" y="250" width="34" height="18" rx="9" fill="#e50914"/></svg>',
  lush: '<svg viewBox="0 0 170 360"><rect x="48" y="14" width="74" height="332" rx="36" fill="#8fbf74"/><rect x="64" y="66" width="42" height="150" rx="21" fill="#050505"/><circle cx="85" cy="256" r="14" fill="#e50914"/></svg>',
  syokbar: '<svg viewBox="0 0 170 360"><rect x="50" y="92" width="70" height="210" rx="26" fill="#f7f3ee"/><rect x="64" y="54" width="42" height="74" rx="17" fill="#e50914"/><rect x="65" y="158" width="40" height="80" rx="16" fill="#050505"/></svg>',
  syokbarFifa: '<svg viewBox="0 0 170 360"><rect x="50" y="92" width="70" height="210" rx="26" fill="#f7f3ee"/><rect x="64" y="54" width="42" height="74" rx="17" fill="#e50914"/><circle cx="85" cy="190" r="20" fill="#050505"/></svg>',
  syokbarCamo: '<svg viewBox="0 0 170 360"><rect x="50" y="92" width="70" height="210" rx="26" fill="#41533a"/><rect x="64" y="54" width="42" height="74" rx="17" fill="#e50914"/><rect x="65" y="158" width="40" height="80" rx="16" fill="#050505"/></svg>',
  syokbarTarget: '<svg viewBox="0 0 170 360"><rect x="54" y="106" width="62" height="180" rx="24" fill="#ef651d"/><rect x="68" y="70" width="34" height="58" rx="15" fill="#f7f3ee"/><rect x="68" y="158" width="34" height="62" rx="14" fill="#050505"/></svg>',
  k1000: '<svg viewBox="0 0 180 260"><rect x="52" y="30" width="76" height="190" rx="18" fill="#030303"/><rect x="66" y="52" width="48" height="88" rx="12" fill="#e50914"/><rect x="68" y="164" width="44" height="14" rx="7" fill="#f7f3ee"/></svg>',
  xero: '<svg viewBox="0 0 180 260"><rect x="52" y="30" width="76" height="190" rx="18" fill="#f7f3ee"/><rect x="66" y="52" width="48" height="88" rx="12" fill="#030303"/><rect x="68" y="164" width="44" height="14" rx="7" fill="#e50914"/></svg>',
  k3000: '<svg viewBox="0 0 180 260"><rect x="46" y="24" width="88" height="204" rx="20" fill="#030303"/><rect x="62" y="48" width="56" height="102" rx="14" fill="#e50914"/><rect x="66" y="178" width="48" height="14" rx="7" fill="#f7f3ee"/></svg>',
  eliquid: '<svg viewBox="0 0 180 260"><rect x="64" y="38" width="52" height="182" rx="17" fill="#030303"/><rect x="72" y="20" width="36" height="38" rx="10" fill="#e50914"/><rect x="73" y="88" width="34" height="72" rx="12" fill="#f7f3ee"/></svg>'
};

const product = (input: Omit<Product, "route">): Product => ({
  ...input,
  route: `/products/${input.slug}`
});

export const products: Product[] = [
  product({
    id: "syokpod-v2",
    slug: "syokpod-v2",
    name: "SyokPod V2",
    system: "closed-system",
    category: "core-device",
    type: "Device",
    label: "Device",
    shortDescription: "Compact, clean and built for daily carry.",
    description: "A closed-system device built for smooth sessions, standout colourways, and the SyokGeng way of life.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: {
      standardColourways: [
        variant("ruby-red", "Ruby Red", "standard", "#c31822", "/products/syokpod/v2/syokpod-v2-red-01.webp"),
        variant("pistachio-green", "Pistachio Green", "standard", "#a8c56f", "/products/syokpod/v2/syokpod-v2-green-01.webp"),
        variant("graphite-grey", "Graphite Grey", "standard", "#575d61", "/products/syokpod/v2/syokpod-v2-grey-01.webp"),
        variant("midnight-blue", "Midnight Blue", "standard", "#172d4e", "/products/syokpod/v2/syokpod-v2-blue-01.webp"),
        variant("raven-black", "Raven Black", "standard", "#070707", "/products/syokpod/v2/syokpod-v2-black-01.webp")
      ],
      specialEditions: [
        variant("gt-edition", "GT Edition", "special-edition", "#a95e3d", "/products/syokpod/gt/syokpod-gt-copper-01.webp", "A performance-led SyokPod V2 finish with a darker collector mood."),
        variant("2-years-anniversary", "2 Years Anniversary", "special-edition", "#f7f3ee", "/products/syokpod/2years/syokpod-2years-01.webp", "A commemorative SyokPod V2 expression marking two years of the Dreammade community."),
        variant("lush-limited-edition", "Lush Limited Edition", "special-edition", "#8fbf74", "/products/syokpod/lush/syokpod-lush-01.webp", "A fresh limited SyokPod V2 colour story with a softer seasonal edge.")
      ]
    },
    images: { primary: "/products/syokpod/v2/syokpod-v2-red-01.webp", svg: deviceSvg.syokpodV2 },
    specs: [
      { label: "Device Size", value: "9.7mm x 16.5mm x 101.8mm" },
      { label: "Battery", value: "450 mAh" },
      { label: "Voltage", value: "3.6v 0.1v" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Screen", value: "LCD" },
      { label: "Colours", value: "Ruby Red, Midnight Blue, Pistachio Green, Graphite Grey, Raven Black" }
    ]
  }),
  product({
    id: "syokpod-pro",
    slug: "syokpod-pro",
    name: "SyokPod Pro",
    system: "closed-system",
    category: "core-device",
    type: "Device",
    label: "Device",
    shortDescription: "More grip, more control and a stronger silhouette.",
    description: "Built for users who want a bolder SyokPod experience without losing everyday comfort.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: {
      standardColourways: [
        variant("obsidian", "Obsidian", "standard", "#050505", "/products/syokpod/pro/syokpod-pro-obsidian-01.webp"),
        variant("iridium", "Iridium", "standard", "#b9c0c8", "/products/syokpod/pro/syokpod-pro-lightgrey-01.webp"),
        variant("midas", "Midas", "standard", "#caa24d", "/products/syokpod/pro/syokpod-pro-gold-01.webp"),
        variant("graphite", "Graphite", "standard", "#4b4f52", "/products/syokpod/pro/syokpod-pro-gray-01.webp"),
        variant("forest", "Forest", "standard", "#234634", "/products/syokpod/pro/syokpod-pro-green-01.webp")
      ],
      specialEditions: []
    },
    images: { primary: "/products/syokpod/pro/syokpod-pro-gold-01.webp", svg: deviceSvg.syokpodPro },
    specs: [
      { label: "Device Size", value: "20.2mm x 118.9mm x 11mm" },
      { label: "Battery", value: "600 mAh" },
      { label: "Voltage", value: "3.5w" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Mode", value: "ECO, LOW, HIGH" },
      { label: "Screen", value: "LED" },
      { label: "Colours", value: "Iridium, Midas, Forest, Graphite, Obsidian" }
    ]
  }),
  product({
    id: "syokpod-special-editions",
    slug: "syokpod-special-editions",
    name: "SyokPod Special Editions",
    system: "closed-system",
    category: "special-edition",
    type: "Special Editions",
    label: "Special Editions",
    shortDescription: "GT, Anniversary and Lush collector expressions.",
    description: "Grouped SyokPod special editions built from the same closed-system platform.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: {
      standardColourways: [],
      specialEditions: [
        variant("gt-edition", "GT Edition", "special-edition", "#a95e3d", "/products/syokpod/gt/syokpod-gt-copper-02.webp"),
        variant("2-years-anniversary", "2 Years Anniversary", "special-edition", "#f7f3ee", "/products/syokpod/2years/syokpod-2years-02.webp"),
        variant("lush-limited-edition", "Lush Limited Edition", "special-edition", "#8fbf74", "/products/syokpod/lush/syokpod-lush-02.webp")
      ]
    },
    images: { primary: "/products/syokpod/gt/syokpod-gt-copper-02.webp", svg: deviceSvg.syokpodGt },
    specs: [
      { label: "Battery", value: "450 mAh" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Screen", value: "LCD" }
    ]
  }),
  product({
    id: "syokpod-gt-edition",
    slug: "syokpod-gt-edition",
    name: "SyokPod GT Edition",
    system: "closed-system",
    category: "special-edition",
    type: "Special Edition",
    label: "Special Edition",
    shortDescription: "A darker SyokPod expression with a performance mood.",
    description: "A special-edition SyokPod finish shaped for collectors and product-culture drops.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: { standardColourways: [], specialEditions: [variant("gt-edition", "GT Edition", "special-edition", "#a95e3d", "/products/syokpod/gt/syokpod-gt-copper-01.webp")] },
    images: { primary: "/products/syokpod/gt/syokpod-gt-copper-01.webp", svg: deviceSvg.syokpodGt }
  }),
  product({
    id: "syokpod-2-years-anniversary",
    slug: "syokpod-2-years-anniversary",
    name: "2 Years Anniversary",
    system: "closed-system",
    category: "special-edition",
    type: "Special Edition",
    label: "Special Edition",
    shortDescription: "A commemorative finish for the SyokPod line.",
    description: "A clean anniversary edition built as a quiet marker for the Dreammade community.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: { standardColourways: [], specialEditions: [variant("anniversary", "2 Years Anniversary", "special-edition", "#f7f3ee", "/products/syokpod/2years/syokpod-2years-01.webp")] },
    images: { primary: "/products/syokpod/2years/syokpod-2years-01.webp", svg: deviceSvg.syokpodAnniversary }
  }),
  product({
    id: "lush-limited-edition",
    slug: "lush-limited-edition",
    name: "Lush Limited Edition",
    system: "closed-system",
    category: "special-edition",
    type: "Special Edition",
    label: "Special Edition",
    shortDescription: "A limited colour story with a softer edge.",
    description: "A fresh limited-edition SyokPod expression designed for seasonal product culture.",
    compatibleWith: ["KOHS K1000", "KOHS Xero"],
    madeFor: [],
    variants: { standardColourways: [], specialEditions: [variant("lush", "Lush", "special-edition", "#8fbf74", "/products/syokpod/lush/syokpod-lush-01.webp")] },
    images: { primary: "/products/syokpod/lush/syokpod-lush-01.webp", svg: deviceSvg.lush }
  }),
  product({
    id: "syokbar",
    slug: "syokbar",
    name: "SyokBar",
    system: "disposable-system",
    category: "core-device",
    type: "Device",
    label: "Device",
    shortDescription: "Disposable convenience with a stronger lifestyle attitude.",
    description: "Designed around the ease of a disposable format while delivering bold flavours. Perfect for the energy of a fast-moving lifestyle.",
    compatibleWith: ["KOHS K3000"],
    madeFor: [],
    variants: {
      standardColourways: [
        variant("magma-red", "Magma Red", "standard", "#d31922", "/products/syokbar/SYOKBAR/syokbar-red-02.webp"),
        variant("volt-green", "Volt Green", "standard", "#8ddb34", "/products/syokbar/SYOKBAR/syokbar-green-02.webp"),
        variant("bolide-blue", "Bolide Blue", "standard", "#1f55a8", "/products/syokbar/SYOKBAR/syokbar-blue-02.webp"),
        variant("lava-orange", "Lava Orange", "standard", "#ef651d", "/products/syokbar/SYOKBAR/syokbar-orange-02.webp"),
        variant("crayon-grey", "Crayon Grey", "standard", "#bfc0bc", "/products/syokbar/SYOKBAR/syokbar-grey-02.webp")
      ],
      specialEditions: [
        variant("fifa", "FIFA", "special-edition", "#f7f3ee", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp", "A sport-coded SyokBar edition created for event culture and collector moments."),
        variant("camo", "Camo Edition", "special-edition", "#41533a", "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-02.webp", "A field-tone SyokBar treatment with a utility-led visual identity.")
      ]
    },
    images: { primary: "/products/syokbar/SYOKBAR/syokbar-red-02.webp", svg: deviceSvg.syokbar },
    specs: [
      { label: "Battery", value: "600 mAh" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Screen", value: "LED" }
    ]
  }),
  product({
    id: "syokbar-special-editions",
    slug: "syokbar-special-editions",
    name: "SyokBar Special Editions",
    system: "disposable-system",
    category: "special-edition",
    type: "Special Editions",
    label: "Special Editions",
    shortDescription: "FIFA and Camo edition culture.",
    description: "Grouped SyokBar special editions across match-day identity and utility-led surface.",
    compatibleWith: ["KOHS K3000"],
    madeFor: [],
    variants: {
      standardColourways: [],
      specialEditions: [
        variant("fifa", "FIFA", "special-edition", "#f7f3ee", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp"),
        variant("camo", "Camo Edition", "special-edition", "#41533a", "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-02.webp")
      ]
    },
    images: { primary: "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp", svg: deviceSvg.syokbarFifa },
    specs: [
      { label: "Battery", value: "600 mAh" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Screen", value: "LED" }
    ]
  }),
  product({
    id: "syokbar-fifa",
    slug: "syokbar-fifa",
    name: "SyokBar FIFA",
    system: "disposable-system",
    category: "special-edition",
    type: "Special Edition",
    label: "Special Edition",
    shortDescription: "A sport-coded SyokBar drop.",
    description: "A special-edition SyokBar created for event-led culture and collector moments.",
    compatibleWith: ["KOHS K3000"],
    madeFor: [],
    variants: { standardColourways: [], specialEditions: [variant("fifa", "FIFA", "special-edition", "#f7f3ee", "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp")] },
    images: { primary: "/products/syokbar/SYOKBAR FIFA/syokbar-fifa-eng-02.webp", svg: deviceSvg.syokbarFifa }
  }),
  product({
    id: "syokbar-camo-edition",
    slug: "syokbar-camo-edition",
    name: "SyokBar Camo Edition",
    system: "disposable-system",
    category: "special-edition",
    type: "Special Edition",
    label: "Special Edition",
    shortDescription: "A field-tone SyokBar expression.",
    description: "A camo-led special edition that brings a utility colour story into the SyokBar system.",
    compatibleWith: ["KOHS K3000"],
    madeFor: [],
    variants: { standardColourways: [], specialEditions: [variant("camo", "Camo Edition", "special-edition", "#41533a", "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-02.webp")] },
    images: { primary: "/products/syokbar/SYOKBAR CAMO EDITION/syokbar-camo-02.webp", svg: deviceSvg.syokbarCamo }
  }),
  product({
    id: "syokbar-target",
    slug: "syokbar-target",
    name: "SyokBar Target",
    system: "open-system",
    category: "core-device",
    type: "Device",
    label: "Device",
    shortDescription: "Open-system flexibility with a compact body and bold flavour control.",
    description: "Made for users who want to refill, switch and stay in the Syok rhythm.",
    compatibleWith: ["KOHS E-Liquid"],
    madeFor: [],
    variants: {
      standardColourways: [
        variant("lava-orange", "Lava Orange", "standard", "#ef651d", "/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-01.webp"),
        variant("ghost-green", "Ghost Green", "standard", "#bcefa1", "/products/syokbar/SYOKBAR TARGET/syokbar-target-green-01.webp"),
        variant("magma-red", "Magma Red", "standard", "#d31922", "/products/syokbar/SYOKBAR TARGET/syokbar-target-red-01.webp")
      ],
      specialEditions: []
    },
    images: { primary: "/products/syokbar/SYOKBAR TARGET/syokbar-target-orange-01.webp", svg: deviceSvg.syokbarTarget },
    specs: [
      { label: "Device Size", value: "83mm x 25mm x 47.1mm" },
      { label: "Battery", value: "650 mAh" },
      { label: "Voltage", value: "3.5v" },
      { label: "Charging Port", value: "Type-C" },
      { label: "Coil", value: "Mesh Coil" },
      { label: "Resistance", value: "0.8Ω" },
      { label: "Screen", value: "LCD" },
      { label: "Colours", value: "Magma Red, Lava Orange, Ghost Green" }
    ]
  }),
];

const systemCopy: Record<ProductSystem, Pick<ProductSystemGroup, "eyebrow" | "title" | "description">> = {
  "closed-system": {
    eyebrow: "System 01",
    title: "Closed System",
    description: "SyokPod devices paired with K1000-compatible KOHS formats."
  },
  "disposable-system": {
    eyebrow: "System 02",
    title: "Disposable System",
    description: "SyokBar paired directly with the K3000 KOHS format."
  },
  "open-system": {
    eyebrow: "System 03",
    title: "Open System",
    description: "SyokBar Target paired with the KOHS E-Liquid format."
  }
};

const categoryTitles: Record<ProductCategory, string> = {
  "core-device": "Core Devices",
  "special-edition": "Special Editions"
};

export const productSystems: ProductSystemGroup[] = (["closed-system", "disposable-system", "open-system"] as ProductSystem[]).map((system) => ({
  id: system,
  ...systemCopy[system],
  groups: (["core-device", "special-edition"] as ProductCategory[])
    .map((category) => ({
      title: system === "disposable-system" && category === "core-device" || system === "open-system" && category === "core-device" ? "Core Device" : categoryTitles[category],
      category,
      products: products.filter((item) => item.system === system && item.category === category)
    }))
    .filter((group) => group.products.length > 0)
}));

export const specialEditionParentRoutes: Record<string, string> = {
  "syokpod-gt-edition": "/products/syokpod-special-editions?variant=gt-edition&finish=copper&view=1",
  "syokpod-2-years-anniversary": "/products/syokpod-special-editions?variant=2-years-anniversary&view=1",
  "lush-limited-edition": "/products/syokpod-special-editions?variant=lush-limited-edition&view=1",
  "syokbar-fifa": "/products/syokbar-special-editions?variant=fifa&finish=england&view=1",
  "syokbar-camo-edition": "/products/syokbar-special-editions?variant=camo&view=1"
};
