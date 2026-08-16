import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'

import { getCanonicalURL } from '@/config/seo'
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
  const canonical = input.canonical ? getCanonicalURL(input.canonical) : undefined

  return {
    alternates: canonical ? { canonical } : undefined,
    description,
    openGraph: mergeOpenGraph(
      { description: defaultDescription, image: defaultImage, siteName, title: defaultTitle },
      {
        description,
        images: [{ url: image }],
        title: socialTitle,
        url: canonical,
      },
    ),
    robots: {
      follow: true,
      index: !input.noIndex,
      googleBot: {
        follow: true,
        index: !input.noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
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

  const pageURL = new URL(path, siteURL).toString()
  const breadcrumb =
    new URL(pageURL).pathname === '/'
      ? undefined
      : {
          '@type': 'BreadcrumbList',
          '@id': `${pageURL}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '首页',
              item: siteURL,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name,
              item: pageURL,
            },
          ],
        }

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${pageURL}#webpage`,
    name,
    description: description || undefined,
    url: pageURL,
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
    breadcrumb,
    mainEntity: mainEntity || undefined,
  }
}

type ArticleJsonLdInput = {
  authors?: string[]
  dateModified: string
  datePublished?: string | null
  description?: string | null
  image?: Media | number | null
  path: string
  settings: SiteSetting
  title: string
}

export function buildArticleJsonLd({
  authors,
  dateModified,
  datePublished,
  description,
  image,
  path,
  settings,
  title,
}: ArticleJsonLdInput): Record<string, unknown> {
  const siteURL = new URL('/', getServerSideURL()).toString().replace(/\/$/, '')
  const pageURL = new URL(path, siteURL).toString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageURL}#article`,
    headline: title,
    description: description || undefined,
    image: getSiteImageURL(image),
    datePublished: datePublished || undefined,
    dateModified,
    inLanguage: 'zh-CN',
    author: authors?.length
      ? authors.map((name) => ({
          '@type': 'Person',
          name,
        }))
      : undefined,
    about: {
      '@type': 'Brand',
      '@id': `${siteURL}/#brand`,
      name: settings.siteName || defaultSiteSettings.siteName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${pageURL}#webpage`,
    },
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
    logo: new URL('/brand/yunma-logo-trimmed.png', siteURL).toString(),
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
