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
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  });
  return results;
}

const jsonFiles = searchJsonFiles(unlhDir);
console.log(`Found ${jsonFiles.length} JSON files in .unlighthouse`);

const ciFile = path.join(unlhDir, 'ci-result.json');
if (fs.existsSync(ciFile)) {
  const data = JSON.parse(fs.readFileSync(ciFile, 'utf-8'));
  console.log("Total routes in ci-result.json:", data.length);
  data.forEach((r, idx) => {
    console.log(`\nRoute ${idx + 1}: ${r.path}`);
    if (r.categories) {
      console.log("  Categories:", r.categories);
    } else if (r.report) {
      console.log("  Report keys:", Object.keys(r.report));
    } else {
      console.log("  Route keys:", Object.keys(r));
    }
  });
}
