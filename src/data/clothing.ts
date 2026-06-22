export type LookbookGroup = {
  id: string;
  name: string;
  images: string[];
};

export type ClothingAccessoriesData = {
  casing: {
    id: string;
    name: string;
    image: string;
  };
  eyewear: {
    id: string;
    name: string;
    images: string[];
  };
};

export const clothingData: LookbookGroup[] = [
  {
    id: "home",
    name: "Home",
    images: [
      "/clothing/HOME/home-1.png",
      "/clothing/HOME/home-2.png",
      "/clothing/HOME/home-3.png",
      "/clothing/HOME/home-4.png",
      "/clothing/HOME/home-5.png",
      "/clothing/HOME/home-6.jpg",
      "/clothing/HOME/home-7.jpg",
      "/clothing/HOME/home-8.jpg",
      "/clothing/HOME/home-9.jpg",
      "/clothing/HOME/home-10.jpg"
    ]
  },
  {
    id: "fire",
    name: "Fire",
    images: [
      "/clothing/JERSEY/FIRE/fire-1.jpg",
      "/clothing/JERSEY/FIRE/fire-2.jpg",
      "/clothing/JERSEY/FIRE/fire-3.jpg",
      "/clothing/JERSEY/FIRE/fire-4.jpg",
      "/clothing/JERSEY/FIRE/fire-5.jpg",
      "/clothing/JERSEY/FIRE/fire-6.jpg",
      "/clothing/JERSEY/FIRE/fire-7.png",
      "/clothing/JERSEY/FIRE/fire-8.png",
      "/clothing/JERSEY/FIRE/fire-9.png",
      "/clothing/JERSEY/FIRE/fire-10.png"
    ]
  },
  {
    id: "forest",
    name: "Forest",
    images: [
      "/clothing/JERSEY/FOREST/forest-1.jpg",
      "/clothing/JERSEY/FOREST/forest-2.jpg",
      "/clothing/JERSEY/FOREST/forest-3.jpg",
      "/clothing/JERSEY/FOREST/forest-4.jpg",
      "/clothing/JERSEY/FOREST/forest-5.jpg",
      "/clothing/JERSEY/FOREST/forest-6.png",
      "/clothing/JERSEY/FOREST/forest-7.png",
      "/clothing/JERSEY/FOREST/forest-8.png",
      "/clothing/JERSEY/FOREST/forest-9.png",
      "/clothing/JERSEY/FOREST/forest-10.jpg"
    ]
  },
  {
    id: "kiss",
    name: "Kiss",
    images: [
      "/clothing/KISSKISS/kiss-1.jpg",
      "/clothing/KISSKISS/kiss-2.png",
      "/clothing/KISSKISS/kiss-3.png",
      "/clothing/KISSKISS/kiss-4.jpg",
      "/clothing/KISSKISS/kiss-5.png",
      "/clothing/KISSKISS/kiss-6.png",
      "/clothing/KISSKISS/kiss-7.png",
      "/clothing/KISSKISS/kiss-8.png",
      "/clothing/KISSKISS/kiss-9.png",
      "/clothing/KISSKISS/kiss-10.png"
    ]
  },
  {
    id: "motocross",
    name: "Motocross",
    images: [
      "/clothing/MOTOCROSS/motor-1.jpg",
      "/clothing/MOTOCROSS/motor-2.jpg",
      "/clothing/MOTOCROSS/motor-3.jpg",
      "/clothing/MOTOCROSS/motor-4.jpg",
      "/clothing/MOTOCROSS/motor-5.jpg",
      "/clothing/MOTOCROSS/motor-6.jpg",
      "/clothing/MOTOCROSS/motor-7.jpg",
      "/clothing/MOTOCROSS/motor-8.jpg",
      "/clothing/MOTOCROSS/motor-9.jpg",
      "/clothing/MOTOCROSS/motor-10.jpg",
      "/clothing/MOTOCROSS/motor-11.jpg",
      "/clothing/MOTOCROSS/motor-12.jpg",
      "/clothing/MOTOCROSS/motor-13.jpg",
      "/clothing/MOTOCROSS/motor-14.jpg"
    ]
  }
];

export const clothingAccessoriesData: ClothingAccessoriesData = {
  casing: {
    id: "casing",
    name: "Casing",
    image: "/clothing/CASING/casing-1.png"
  },
  eyewear: {
    id: "sunglass",
    name: "Sunglass",
    images: [
      "/clothing/SUNGLASS/sunglass-1.jpg",
      "/clothing/SUNGLASS/sunglass-2.jpg",
      "/clothing/SUNGLASS/sunglass-3.jpg",
      "/clothing/SUNGLASS/sunglass-4.jpg",
      "/clothing/SUNGLASS/sunglass-5.jpg",
      "/clothing/SUNGLASS/sunglass-6.jpg",
      "/clothing/SUNGLASS/sunglass-7.jpg",
      "/clothing/SUNGLASS/sunglass-8.jpg",
      "/clothing/SUNGLASS/sunglass-9.jpg",
      "/clothing/SUNGLASS/sunglass-10.jpg"
    ]
  }
};
