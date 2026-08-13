import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { defaultSiteSettings, getSiteImageURL, getSiteSettings } from './siteSettings'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = getSiteImageURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args
  const settings = await getSiteSettings()
  const siteName = settings.siteName || defaultSiteSettings.siteName
  const defaultTitle = settings.defaultSEO?.title || defaultSiteSettings.defaultSEO.title
  const defaultDescription =
    settings.defaultSEO?.description || defaultSiteSettings.defaultSEO.description
  const defaultImage = getSiteImageURL(settings.defaultSEO?.image)

  const ogImage = doc?.meta?.image ? getImageURL(doc.meta.image) : defaultImage
  const searchEnhancement =
    doc?.meta && 'searchEnhancement' in doc.meta ? doc.meta.searchEnhancement : undefined

  const title = doc?.meta?.title || defaultTitle
  const description = doc?.meta?.description || defaultDescription

  return {
    alternates: searchEnhancement?.canonicalURL
      ? {
          canonical: searchEnhancement.canonicalURL,
        }
      : undefined,
    description,
    openGraph: mergeOpenGraph(
      { description: defaultDescription, image: defaultImage, siteName, title: defaultTitle },
      {
        description,
        images: ogImage
          ? [
              {
                url: ogImage,
              },
            ]
          : undefined,
        title,
        url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
      },
    ),
    robots: searchEnhancement?.noIndex
      ? {
          follow: true,
          index: false,
        }
      : undefined,
    title,
  }
}
