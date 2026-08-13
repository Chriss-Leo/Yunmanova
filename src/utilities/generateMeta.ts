import type { Metadata } from 'next'

import type { Page, Post } from '../payload-types'

import { generateSiteMetadata } from './seo'

export const generateMeta = async (args: {
  canonical?: string
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { canonical, doc } = args
  const searchEnhancement =
    doc?.meta && 'searchEnhancement' in doc.meta ? doc.meta.searchEnhancement : undefined

  return generateSiteMetadata({
    canonical:
      searchEnhancement?.canonicalURL ||
      canonical ||
      (doc?.slug ? `/${Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug}` : undefined),
    description: doc?.meta?.description,
    image: doc?.meta?.image,
    noIndex: Boolean(searchEnhancement?.noIndex),
    title: doc?.meta?.title || doc?.title,
  })
}
