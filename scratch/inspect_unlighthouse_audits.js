import fs from 'fs';
import path from 'path';

const unlhDir = path.resolve('./.unlighthouse');

function searchJsonFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(searchJsonFiles(filePath));
    } else if (file.endsWith('.json') && !file.includes('ci-result')) {
      results.push(filePath);
    }
  });
  return results;
}

const jsonFiles = searchJsonFiles(unlhDir);
console.log(`Found ${jsonFiles.length} detailed route JSON files.`);

if (jsonFiles.length > 0) {
  const sample = JSON.parse(fs.readFileSync(jsonFiles[0], 'utf-8'));
  console.log("\nInspecting route:", sample.route?.path || sample.url);
  const audits = sample.report?.audits || sample.audits;
  if (audits) {
    Object.keys(audits).forEach(key => {
      const a = audits[key];
      if (a.score !== null && a.score < 1) {
        console.log(` ⚠ [${key}] ${a.title}: ${a.description?.slice(0, 100)}`);
      }
    });
  }
}
