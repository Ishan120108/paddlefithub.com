import fs from 'fs';
import path from 'path';

const ciFile = path.resolve('./.unlighthouse/ci-result.json');

if (fs.existsSync(ciFile)) {
  const data = JSON.parse(fs.readFileSync(ciFile, 'utf-8'));
  console.log("\n=== OFFICIAL UNLIGHTHOUSE 17-ROUTE AUDIT SCORE REPORT ===");

  const summaryTable = data.map((r) => {
    return {
      Route: r.path,
      Performance: r.performance !== undefined ? Math.round(r.performance * 100) : 'N/A',
      Accessibility: r.accessibility !== undefined ? Math.round(r.accessibility * 100) : 'N/A',
      'Best Practices': r['best-practices'] !== undefined ? Math.round(r['best-practices'] * 100) : 'N/A',
      SEO: r.seo !== undefined ? Math.round(r.seo * 100) : 'N/A'
    };
  });

  console.table(summaryTable);
}
