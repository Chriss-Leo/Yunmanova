import 'server-only'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { searchStaticSite } from './siteIndex'
import type { SiteSearchResult } from './types'

export async function searchEntireSite(query: string, limit = 30): Promise<SiteSearchResult[]> {
  const trimmedQuery = query.trim().slice(0, 120)
  if (!trimmedQuery) return []

  const staticResults = searchStaticSite(trimmedQuery, limit)
  const payload = await getPayload({ config: configPromise })
  const dynamicResults = await payload.find({
    collection: 'search',
    depth: 0,
    limit,
    overrideAccess: false,
    pagination: false,
    select: {
      meta: true,
      slug: true,
      title: true,
    },
    where: {
      or: [
        { title: { like: trimmedQuery } },
        { 'meta.description': { like: trimmedQuery } },
        { 'meta.title': { like: trimmedQuery } },
        { slug: { like: trimmedQuery } },
      ],
    },
  })

  const cmsResults: SiteSearchResult[] = dynamicResults.docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({
      description: doc.meta?.description || '阅读无锡寻光数字科技发布的产品与技术实践。',
      href: `/posts/${doc.slug}`,
      id: `cms:${doc.id}`,
      section: '最新文章',
      title: doc.meta?.title || doc.title || '未命名文章',
      type: 'article',
    }))

  const uniqueResults = new Map<string, SiteSearchResult>()
  for (const result of [...staticResults, ...cmsResults]) {
    if (!uniqueResults.has(result.href)) uniqueResults.set(result.href, result)
  }

  return [...uniqueResults.values()].slice(0, limit)
}
