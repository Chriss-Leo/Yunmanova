import type { Page, Post } from '@/payload-types'

type LinkData = {
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: number | Page | Post
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export function getCMSLinkHref(link?: LinkData | null) {
  if (
    link?.type === 'reference' &&
    link.reference &&
    typeof link.reference.value === 'object' &&
    link.reference.value.slug
  ) {
    if (link.reference.relationTo === 'pages' && link.reference.value.slug === 'home') return '/'

    const prefix = link.reference.relationTo === 'posts' ? '/posts' : ''
    return `${prefix}/${link.reference.value.slug}`
  }

  return link?.url || null
}
