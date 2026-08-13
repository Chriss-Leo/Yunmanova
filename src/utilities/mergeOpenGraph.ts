import type { Metadata } from 'next'

type OpenGraphDefaults = {
  description: string
  image: string
  siteName: string
  title: string
}

export const mergeOpenGraph = (
  defaults: OpenGraphDefaults,
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    type: 'website',
    description: defaults.description,
    siteName: defaults.siteName,
    title: defaults.title,
    ...og,
    images: og?.images ? og.images : [{ url: defaults.image }],
  }
}
