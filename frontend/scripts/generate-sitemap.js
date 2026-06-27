import { generateSitemapXml } from '../src/utils/sitemap.js'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')

if (!process.env.VITE_SITE_URL) {
  console.warn('⚠ VITE_SITE_URL not set — sitemap will use fallback URL. Set it via env before build.')
}

const sitemap = generateSitemapXml()
writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log('✅ sitemap.xml generated in dist/')
