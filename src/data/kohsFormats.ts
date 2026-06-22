export type KohsFormat = {
  id: string;
  name: string;
  madeFor: string[];
  flavours: string[];
};

const kohsK1000Flavours = [
  "Banana Vanilla", "Butter Cake", "Cappuccino", "Creme Brulee", "Cultured Milk",
  "Double Mango", "Grape Apple", "Grape Bubblegum", "Grape Madness", "Guava Blast",
  "Hazelnut Coffee", "Jagung Cheese", "Keladi Cheese", "Mango Mousse", "Mango Pineapple",
  "Original Oat Milky", "Peanut Cheese", "Popcorn Caramel", "Raspberry Cookie", "Rybena Lychee",
  "Sakura Mint Soda", "Solero Lime Blast", "Strawberry Apple", "Strawberry Bubblegum",
  "Strawberry Cheesecake", "Strawberry Honeydew", "Strawberry Vanilla"
];

export const kohsFormats: KohsFormat[] = [
  {
    id: "kohs-k1000",
    name: "KOHS K1000",
    madeFor: ["SyokPod V2", "SyokPod Pro"],
    flavours: kohsK1000Flavours
  },
  {
    id: "kohs-xero-k1000",
    name: "KOHS Xero",
    madeFor: ["SyokPod V2", "SyokPod Pro"],
    flavours: kohsK1000Flavours
  },
  {
    id: "kohs-k3000",
    name: "KOHS K3000",
    madeFor: ["SyokBar"],
    flavours: [
      "Orange Pineapple", "Banana Milkshake", "Energy Drink", "Teh Tarik Ice", "Solero Lime",
      "Honeydew Strawberry", "Honeydew Bubblegum", "Strawberry Apple", "Strawberry Ice Cream"
    ]
  },
  {
    id: "kohs-eliquid",
    name: "KOHS E-Liquid",
    madeFor: ["SyokBar Target"],
    flavours: [
      "Teh", "Honeydew Melon", "Strawberry Kiwi", "Strawberry Vanilla", "Strawberry Mango",
      "Watermelon Strawberry", "Mango Peach", "Mango Blackcurrant", "Pineapple Blackcurrant",
      "Pistachio Vanilla"
    ]
  }
];

export function getKohsFormatsByNames(names: string[]): KohsFormat[] {
  return kohsFormats.filter((format) => names.includes(format.name));
}
