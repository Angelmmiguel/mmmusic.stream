#!/usr/bin/env node

// Generate the sitemap
const routes = require('../next.config.js').exportPathMap();

// Libs
const ora = require('ora');
const path = require('path');
const fs = require('fs');

const SITE_ROOT = process.env.SITE_ROOT || 'https://mmmusic.stream';
const DESTINATION = process.env.DESTINATION || path.join(__dirname, '../', 'static', 'sitemap.xml');

let xml = '';
xml += '<?xml version="1.0" encoding="UTF-8"?>';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

const spinner = ora(`Parsing routes`).start();

// Iterate over the pages
Object.keys(routes).forEach(url => {
  ora.text = `Parsing ${url}`;

  const data = routes[url];
  const file = data.page.slice(-1) === '/' ? `${data.page}index.js` : `${data.page}.js`;
  const filePath = path.join(__dirname, '../', 'pages', file);

  // Get data!
  const stats = fs.statSync(filePath);
  const modDate = new Date(stats.mtime);
  const lastMod = `${modDate.getFullYear()}-${('0' + (modDate.getMonth() + 1)).slice(-2)}-${('0' + modDate.getDate()).slice(-2)}`;

  xml += '<url>'
  xml += `<loc>${SITE_ROOT}${url}</loc>`
  xml += `<lastmod>${lastMod}</lastmod>`
  xml += `<changefreq>always</changefreq>`
  xml += `<priority>0.5</priority>`
  xml += '</url>'
});

xml += '</urlset>';

fs.writeFileSync(DESTINATION, xml);

spinner.succeed(`Wrote sitemap for ${Object.keys(routes).length} pages`);

