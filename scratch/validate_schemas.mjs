import fs from 'fs';
import path from 'path';

const distDir = '/Users/ishan_sahu/calculator 1/paddlefithub.com/dist';

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = findHtmlFiles(distDir);
console.log(`Found ${files.length} HTML files to inspect for JSON-LD scripts...`);

let totalSchemasFound = 0;
let errors = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    totalSchemasFound++;
    const jsonStr = match[1].trim();
    try {
      const parsed = JSON.parse(jsonStr);
      const relPath = path.relative(distDir, file);
      const types = parsed['@graph']
        ? parsed['@graph'].map(g => g['@type']).join(', ')
        : parsed['@type'];
      console.log(`✓ [${relPath}] Valid JSON-LD: Type(s) = ${types}`);
    } catch (err) {
      console.error(`✗ [${file}] JSON-LD Parse Error: ${err.message}`);
      errors++;
    }
  }
});

console.log(`\nValidation complete. Total JSON-LD scripts checked: ${totalSchemasFound}. Errors: ${errors}`);
