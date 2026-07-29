import fs from 'fs';
import path from 'path';

const ciFile = path.resolve('./.unlighthouse/ci-result.json');

if (fs.existsSync(ciFile)) {
  const data = JSON.parse(fs.readFileSync(ciFile, 'utf-8'));
  console.log("Sample route object keys:", Object.keys(data[0]));
  console.log("Sample route object:", JSON.stringify(data[0], null, 2));
}
