import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { defaultSiteSettings, getSiteImageURL, getSiteSettings } from './siteSettings'

export type SiteMetadataInput = {
  canonical?: string
  description?: string | null
  image?: Media | number | null
  noIndex?: boolean
  title?: string | null
}

export async function generateSiteMetadata(input: SiteMetadataInput): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteName = settings.siteName || defaultSiteSettings.siteName
  const defaultTitle = settings.defaultSEO?.title || defaultSiteSettings.defaultSEO.title
  const defaultDescription =
    settings.defaultSEO?.description || defaultSiteSettings.defaultSEO.description
  const defaultImage = getSiteImageURL(settings.defaultSEO?.image)
  const title = input.title || defaultTitle
  const description = input.description || defaultDescription
  const image = input.image ? getSiteImageURL(input.image) : defaultImage
  const socialTitle = input.title ? `${input.title}｜${siteName}` : defaultTitle

  return {
    alternates: input.canonical ? { canonical: input.canonical } : undefined,
    description,
    openGraph: mergeOpenGraph(
      { description: defaultDescription, image: defaultImage, siteName, title: defaultTitle },
      {
        description,
        images: [{ url: image }],
        title: socialTitle,
        url: input.canonical,
      },
    ),
    robots: input.noIndex
      ? {
          follow: true,
          index: false,
        }
      : undefined,
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [image],
      title: socialTitle,
    },
  }
}

type PageSchemaType =
  'AboutPage' | 'CollectionPage' | 'ContactPage' | 'FAQPage' | 'Service' | 'WebPage'

type PageJsonLdInput = {
  description?: string | null
  mainEntity?: unknown
  name: string
  path: string
  settings: SiteSetting
  type?: PageSchemaType
}

export function buildPageJsonLd({
  description,
  mainEntity,
  name,
  path,
  settings,
  type = 'WebPage',
}: PageJsonLdInput): Record<string, unknown> {
  const siteURL = new URL('/', getServerSideURL()).toString().replace(/\/$/, '')
  const siteName = settings.siteName || defaultSiteSettings.siteName

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': new URL(path, siteURL).toString() + '#webpage',
    name,
    description: description || undefined,
    url: new URL(path, siteURL).toString(),
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteURL}/#website`,
      name: siteName,
      url: siteURL,
    },
    about: {
      '@type': 'Brand',
      '@id': `${siteURL}/#brand`,
      name: siteName,
    },
    mainEntity: mainEntity || undefined,
  }
}

export function buildBrandJsonLd(settings: SiteSetting): Record<string, unknown> {
  const siteURL = new URL('/', getServerSideURL()).toString().replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    '@id': `${siteURL}/#brand`,
    name: settings.siteName || defaultSiteSettings.siteName,
    description: settings.brandDescription || defaultSiteSettings.brandDescription,
    url: siteURL,
  }
}

export function buildWebsiteJsonLd(settings: SiteSetting): Record<string, unknown> {
  const siteURL = new URL('/', getServerSideURL()).toString().replace(/\/$/, '')

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteURL}/#website`,
    name: settings.siteName || defaultSiteSettings.siteName,
    url: siteURL,
    inLanguage: 'zh-CN',
    about: { '@id': `${siteURL}/#brand` },
  }
}
