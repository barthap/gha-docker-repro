const apiUrl = process.env.API_URL;

if (apiUrl == null || apiUrl === '') {
  console.warn('API_URL env var not set. Skipping');
  process.exit(0);
}

const fs = require('fs');

const routesManifestPath = './.next/routes-manifest.json';

if (!fs.existsSync(routesManifestPath)) {
  console.warn(".next/routes-manifest.json doesn't exist. Skipping");
  process.exit(0);
}

const routesManifestFile = fs.readFileSync(routesManifestPath, {
  encoding: 'utf-8',
});

const json = JSON.parse(routesManifestFile);
const rewrite = json.rewrites.beforeFiles.find((it) => it.source === '/api/:path*');
rewrite.destination = `${apiUrl}/:path*`;
json.rewrites.beforeFiles = [...json.rewrites.beforeFiles, rewrite];
const updatedContents = JSON.stringify(json);

fs.writeFileSync(routesManifestPath, updatedContents, { encoding: 'utf-8' });

console.log(`Done! API URL set to ${apiUrl}`);
