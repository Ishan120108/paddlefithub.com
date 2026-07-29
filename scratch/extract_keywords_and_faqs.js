import fs from 'fs';
import path from 'path';

const pagesDir = path.resolve('./src/pages');

function getAstroFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAstroFiles(filePath));
    } else if (file.endsWith('.astro')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAstroFiles(pagesDir);
console.log(`Found ${files.length} Astro page files.`);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const relPath = path.relative(pagesDir, f);
  console.log(`\n========================================`);
  console.log(`PAGE: /${relPath.replace(/\.astro$/, '').replace(/index$/, '')}`);
  console.log(`========================================`);

  // Extract Title
  const titleMatch = content.match(/title=["']([^"']+)["']/);
  if (titleMatch) console.log(`TITLE: ${titleMatch[1]}`);

  // Extract Meta Description
  const descMatch = content.match(/description=["']([^"']+)["']/);
  if (descMatch) console.log(`DESCRIPTION: ${descMatch[1]}`);

  // Extract FAQs array if present
  const faqsMatch = content.match(/const faqs\s*=\s*(\[[^\]]+\]);/s);
  if (faqsMatch) {
    try {
      // Evaluate or parse FAQs array string safely
      const faqsStr = faqsMatch[1];
      console.log(`\nFAQS FOUND:`);
      const qMatches = [...faqsStr.matchAll(/question:\s*['"]([^'"]+)['"]/g)];
      const aMatches = [...faqsStr.matchAll(/answer:\s*['"]([^'"]+)['"]/g)];
      
      qMatches.forEach((q, idx) => {
        console.log(`  Q${idx + 1}: ${q[1]}`);
        if (aMatches[idx]) {
          console.log(`  A${idx + 1}: ${aMatches[idx][1]}`);
        }
      });
    } catch (e) {
      console.log("Error parsing FAQs:", e.message);
    }
  }
});
