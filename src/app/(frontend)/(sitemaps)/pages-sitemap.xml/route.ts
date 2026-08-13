import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

const staticRoutes = [
  '/',
  '/services',
  '/cases',
  '/faq',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
]

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const [results, posts] = await Promise.all([
      payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          meta: true,
          slug: true,
          updatedAt: true,
        },
      }),
      payload.find({
        collection: 'posts',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1,
        pagination: false,
        select: { slug: true },
      }),
    ])

    const staticRouteURLs = new Set(staticRoutes.map((route) => new URL(route, SITE_URL).toString()))

    const defaultSitemap = staticRoutes.map((route) => ({
      loc: new URL(route, SITE_URL).toString(),
    }))

    if (posts.totalDocs > 0) {
      defaultSitemap.push({ loc: new URL('/posts', SITE_URL).toString() })
    }

    const sitemap = results.docs
      ? results.docs
          .filter((page) => {
            if (!page?.slug || page.meta?.searchEnhancement?.noIndex) return false
            const url = new URL(page.slug === 'home' ? '/' : `/${page.slug}`, SITE_URL).toString()
            return !staticRouteURLs.has(url)
          })
          .map((page) => {
            return {
              loc: new URL(page?.slug === 'home' ? '/' : `/${page?.slug}`, SITE_URL).toString(),
              lastmod: page.updatedAt,
            }
          })
      : []

    return Array.from(
      new Map([...defaultSitemap, ...sitemap].map((entry) => [entry.loc, entry])).values(),
    )
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
