import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'
import { caseArticles } from '@/data/caseArticles'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'posts',
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
        slug: true,
        updatedAt: true,
      },
    })

    const cmsPosts = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .map((post) => ({
            loc: new URL(`/posts/${post?.slug}`, SITE_URL).toString(),
            lastmod: post.updatedAt,
          }))
      : []

    const staticCaseArticles = caseArticles.map((article) => ({
      loc: new URL(`/posts/${article.slug}`, SITE_URL).toString(),
      lastmod: article.updatedAt,
    }))

    return Array.from(
      new Map([...cmsPosts, ...staticCaseArticles].map((entry) => [entry.loc, entry])).values(),
    )
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
