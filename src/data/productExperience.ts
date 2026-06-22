export type ProductMediaOption = {
  id: string;
  name: string;
  displayName: string;
  colour?: string;
  images: string[];
  note?: string;
};

export type ProductEdition = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  options: ProductMediaOption[];
  specs?: { label: string; value: string }[];
  viewLabels?: string[];
  defaultViewIndex?: number;
};

export type ProductViewerCopy = {
  headline: string;
  body: string[];
  notes?: { label: string; value: string }[];
};

export type ProductStorySlide = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  tone?: "cream" | "red" | "dark";
};

export type ProductNarrative = {
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  tone?: "cream" | "crimson" | "dark";
};

export type ProductCollectionLink = {
  label: string;
  href: string;
  eyebrow?: string;
};

export type ProductExperience = {
  id: string;
  name: string;
  eyebrow: string;
  statement: string;
  description: string;
  compatibility: string;
  editions: ProductEdition[];
  viewer?: ProductViewerCopy;
  narrative?: ProductNarrative;
  narratives?: ProductNarrative[];
  storySlides?: ProductStorySlide[];
  collectionLinks?: ProductCollectionLink[];
};
