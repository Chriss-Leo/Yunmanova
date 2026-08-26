import { getServerSideURL } from '@/utilities/getURL'

export function GET() {
  const siteURL = getServerSideURL().replace(/\/$/, '')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteURL}/pages-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteURL}/posts-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/xml',
    },
  })
}
