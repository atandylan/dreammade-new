import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'assets-source');
const PUBLIC_DIR = path.join(ROOT, 'public');

const DIRS_TO_CREATE = [
  'products', 'about', 'events', 'clothing', 'reels', 'logo', 'textures'
];

const MAPPING = {
  // PRODUCTS
  "public/products/syokpod-v2-ruby-red.webp": "assets-source/products/syokpod-v2/SYOKPOD RED.png",
  "public/products/syokpod-v2-graphite-grey.webp": "assets-source/products/syokpod-v2/SYOKPOD GREY.png",
  "public/products/syokpod-v2-pistachio-green.webp": "assets-source/products/syokpod-v2/SYOKPOD GREEN.png",
  "public/products/syokpod-v2-midnight-blue.webp": "assets-source/products/syokpod-v2/SYOKPOD BLUE.png",
  "public/products/syokpod-v2-raven-black.webp": "assets-source/products/syokpod-v2/SYOKPOD BLACK.png",
  "public/products/syokpod-v2-gt-edition.webp": "assets-source/products/syokpod-gt/Silver_02_1.tif",
  "public/products/syokpod-v2-lush-limited.webp": "assets-source/products/syokpod-lush/Tiffany_anim_scn05_1.0759.tif",
  "public/products/syokpod-pro-midas.webp": "assets-source/products/syokpod-pro/SyokpodPro_Flat_Gold_1.tif",
  "public/products/syokpod-pro-iridium.webp": "assets-source/products/syokpod-pro/SyokpodPro_Flat_LightGray_1.tif",
  "public/products/syokpod-pro-forest.webp": "assets-source/products/syokpod-pro/SyokpodPro_Flat_Green_1.tif",
  "public/products/syokpod-pro-graphite.webp": "assets-source/products/syokpod-pro/SyokpodPro_Flat_Gray_1.tif",
  "public/products/syokpod-pro-obsidian.webp": "assets-source/products/syokpod-pro/SyokpodPro_Flat_Obsidian_1.tif",
  "public/products/syokbar-magma-red.webp": "assets-source/products/syokbar/Syokbar_v2_front_layer1_1.0002.tif",
  "public/products/syokbar-bolide-blue.webp": "assets-source/products/syokbar/Syokbar_v2_front_layer2_1.0002.tif",
  "public/products/syokbar-crayon-grey.webp": "assets-source/products/syokbar/Syokbar_v2_front_layer3_1.0002.tif",
  "public/products/syokbar-lava-orange.webp": "assets-source/products/syokbar/Syokbar_v2_front_layer4_1.0002.tif",
  "public/products/syokbar-volt-green.webp": "assets-source/products/syokbar/Syokbar_v2_front_layer5_1.0002.tif",
  "public/products/syokbar-fifa.webp": "assets-source/products/syokbar-fifa/IMG_0934 (1).png",
  "public/products/syokbar-camo.webp": "assets-source/products/syokbar-camo/Copy of 03_masterLayer_1.0003.tif",
  "public/products/syokbar-target-lava-orange.webp": "assets-source/products/syokbar-target/UltimaTarget_02_1.0000.tif",
  "public/products/syokbar-target-magma-red.webp": "assets-source/products/syokbar-target/UltimaTarget_02_1.0000(1).tif",
  "public/products/syokbar-target-ghost-green.webp": "assets-source/products/syokbar-target/UltimaTarget_02_1.0000(2).tif",
  "public/products/kohs-k1000.webp": "assets-source/kohs/kohs-k1000/Sypd_Flav_Box_S_BlackCurrant1_1.tif",
  "public/products/kohs-xero-k1000.webp": "assets-source/kohs/kohs-xero-k1000/Mango_09_1.0000.tif",
  "public/products/kohs-k3000.webp": "assets-source/kohs/kohs-k3000/APPLE PLUM.png",
  "public/products/kohs-eliquid.webp": "assets-source/kohs/kohs-eliquid/Kohs_01_MangoBlackcurrant_1.tif",

  // ABOUT - (Assuming some images match by name if they are in source, else they fall back)
  "public/about/about-hero.webp": "assets-source/clothing/forest/POST (6).jpg",
  "public/about/brand-story.webp": "assets-source/clothing/motocross/SYKJERSEY OR1.jpg",
  "public/about/product-philosophy.webp": "assets-source/clothing/sunglasses/SYK SG 7.jpg",
  "public/about/vision-mission.webp": "assets-source/clothing/sunglasses/SYK SG 5.jpg",
  "public/about/product-collection.webp": "assets-source/clothing/home/POST 2.png",
  "public/about/partnership.webp": "assets-source/events/Screenshot 2025-07-08 104748.png",

  // CLOTHING
  "public/clothing/hero.webp": "assets-source/clothing/motocross/SYKJERSEY BLU 5.jpg",
  "public/clothing/lookbook-01.webp": "assets-source/clothing/forest/POST (3).jpg",
  "public/clothing/lookbook-02.webp": "assets-source/clothing/forest/POST (7).jpg",
  "public/clothing/lookbook-03.webp": "assets-source/clothing/fire/POST (4).jpg",
  "public/clothing/lookbook-04.webp": "assets-source/clothing/fire/POST (1) 2.jpg",
  "public/clothing/lookbook-05.webp": "assets-source/clothing/kiss/CLOSE UP POST (1).jpg",
  "public/clothing/jersey-main.webp": "assets-source/clothing/home/SYK JERSEY REELS COVER.jpg",
  "public/clothing/jersey-detail.webp": "assets-source/clothing/motocross/SYKJERSEY GRE1.jpg",
  "public/clothing/community.webp": "assets-source/clothing/forest/POST (1).jpg",

  // EVENTS
  "public/events/syok-geng-lifestyle.webp": "assets-source/events/sev.jpg",
  "public/events/syokbar-purecargasm.webp": "assets-source/events/Screenshot 2025-07-08 104748.png",
  "public/events/product-activation.webp": "assets-source/events/Screenshot 2025-07-08 101803.png",
  "public/events/kohs-tasting.webp": "assets-source/events/Screenshot 2025-07-08 101831.png",
  "public/events/syok-geng-drop.webp": "assets-source/events/Screenshot 2025-07-08 104727.png"
};

async function createDirs() {
  for (const dir of DIRS_TO_CREATE) {
    const fullPath = path.join(PUBLIC_DIR, dir);
    await fs.mkdir(fullPath, { recursive: true });
  }
}

async function processImage(sourceFile, destFile) {
  const ext = path.extname(sourceFile).toLowerCase();
  
  if (ext === '.svg') {
    await fs.copyFile(sourceFile, destFile);
    return;
  }

  const isProduct = destFile.includes('/products/');
  let sharpInstance = sharp(sourceFile);

  if (isProduct) {
    // Transparent PNG/TIF products
    sharpInstance = sharpInstance
      .trim() // Trim transparent whitespace
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85, alphaQuality: 100 });
  } else {
    // Photos/Lifestyle
    sharpInstance = sharpInstance
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 81 });
  }

  await sharpInstance.toFile(destFile);
}

async function main() {
  await createDirs();
  
  let processedCount = 0;
  const missing = [];
  const generated = [];

  for (const [destRelative, sourceRelative] of Object.entries(MAPPING)) {
    const sourcePath = path.join(ROOT, sourceRelative);
    const destPath = path.join(ROOT, destRelative);
    
    try {
      await fs.access(sourcePath);
      console.log(`Processing: ${sourceRelative} -> ${destRelative}`);
      await processImage(sourcePath, destPath);
      processedCount++;
      generated.push(destRelative);
    } catch (e) {
      if (e.code === 'ENOENT') {
        missing.push(sourceRelative);
      } else {
        console.error(`Failed to process ${sourceRelative}:`, e);
      }
    }
  }

  console.log('\\n--- Summary ---');
  console.log(`Assets processed: ${processedCount}`);
  console.log(`Missing assets: ${missing.length}`);
  if (missing.length > 0) {
    console.log('Missing:');
    missing.forEach(m => console.log(` - ${m}`));
  }
}

main().catch(console.error);
