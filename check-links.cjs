const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const allHtmlFiles = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.html')) {
      allHtmlFiles.push(full);
    }
  }
}
walk(distDir);

let deadLinks = 0;

for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  // Simple regex to extract href
  const matches = [...content.matchAll(/href="([^"]+)"/g)];
  for (const match of matches) {
    let href = match[1];
    
    // Ignore external, mailto, etc
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    // Ignore assets
    if (href.startsWith('/_astro/') || href.endsWith('.css') || href.endsWith('.js')) continue;
    
    // Some old hash-only links or paths
    let pathname = href;
    let hash = '';
    
    if (href.includes('#')) {
      [pathname, hash] = href.split('#');
      hash = '#' + hash;
    }
    
    // If it's just a hash, it refers to the current page
    if (href.startsWith('#')) {
      pathname = file.replace(distDir, '');
      if (pathname === '/index.html') pathname = '/';
      else pathname = pathname.replace('/index.html', '').replace('.html', '');
    }
    
    let targetPath = path.join(distDir, pathname);
    let targetHtml = targetPath;
    
    // Resolve path to html file
    if (!pathname.endsWith('.html') && pathname !== '/') {
      targetHtml = path.join(targetPath, 'index.html');
      if (!fs.existsSync(targetHtml)) {
        targetHtml = targetPath + '.html';
      }
    } else if (pathname === '/') {
      targetHtml = path.join(distDir, 'index.html');
    }
    
    if (!fs.existsSync(targetHtml)) {
      console.log(`[DEAD LINK] ${href} found in ${file.replace(distDir, '')}`);
      deadLinks++;
      continue;
    }
    
    // Check hash anchor
    if (hash && hash.length > 1) {
      const targetContent = fs.readFileSync(targetHtml, 'utf8');
      const idWithoutHash = hash.substring(1);
      // Look for id="hash" or similar
      if (!targetContent.includes(`id="${idWithoutHash}"`) && !targetContent.includes(`name="${idWithoutHash}"`)) {
        console.log(`[DEAD ANCHOR] ${href} (Missing ${hash}) found in ${file.replace(distDir, '')}`);
        deadLinks++;
      }
    }
  }
}

if (deadLinks === 0) {
  console.log('No internal deadlinks found.');
} else {
  console.log(`Found ${deadLinks} deadlinks.`);
}
