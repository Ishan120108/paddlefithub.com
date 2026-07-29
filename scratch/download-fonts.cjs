const fs = require('fs');
const path = require('path');

const fontDir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(fontDir)) {
  fs.mkdirSync(fontDir, { recursive: true });
}

const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function run() {
  const url = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400&display=swap";
  const res = await fetch(url, { headers: { "User-Agent": ua } });
  const css = await res.text();
  console.log("=== GOOGLE FONTS CSS RESPONSE ===");
  console.log(css);

  const blocks = css.split('@font-face');
  let fontFaceDeclarations = [];

  for (const block of blocks) {
    if (!block.includes('src: url(')) continue;
    
    const familyMatch = block.match(/font-family:\s*['"]?([^'";]+)['"]?/);
    const styleMatch = block.match(/font-style:\s*([^;]+)/);
    const weightMatch = block.match(/font-weight:\s*([^;]+)/);
    const urlMatch = block.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);

    if (familyMatch && styleMatch && weightMatch && urlMatch) {
      const family = familyMatch[1].trim();
      const style = styleMatch[1].trim();
      const weight = weightMatch[1].trim();
      const woff2Url = urlMatch[1].trim();

      const fileName = `${family.toLowerCase().replace(/\s+/g, '-')}-${weight}.woff2`;
      const localPath = path.join(fontDir, fileName);

      console.log(`Downloading ${family} (${weight}) from ${woff2Url}...`);
      const fontRes = await fetch(woff2Url);
      const buffer = Buffer.from(await fontRes.arrayBuffer());
      fs.writeFileSync(localPath, buffer);
      console.log(`Saved ${fileName} (${buffer.length} bytes)`);

      fontFaceDeclarations.push(`@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${fileName}') format('woff2');
}`);
    }
  }

  const fontsCssContent = fontFaceDeclarations.join('\n\n') + '\n';
  const fontsCssPath = path.join(fontDir, 'fonts.css');
  fs.writeFileSync(fontsCssPath, fontsCssContent);
  console.log('\nCreated public/fonts/fonts.css successfully!');
}

run().catch(console.error);
