import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { defaultSiteSettings, getSiteImageURL, getSiteSettings } from '@/utilities/siteSettings'
import { draftMode } from 'next/headers'

import './globals.css'
import '@fontsource-variable/noto-sans-sc'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      data-theme="light"
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <span
          hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!-- THESIS: extend the approved connected enterprise reference across the full public website below the locked shared Header. OWN-WORLD: white space, graphite Chinese typography, forest-green controls, connected documentary photography and authentic product UI. STORY: understand the promise, inspect services and solution paths, resolve questions, understand the team and make contact. FIRST VIEWPORT: a split or cinematic image-led hero tailored to each route. FORM: approved user reference reconstruction and system extension. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->',
          }}
        />
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const siteName = settings.siteName || defaultSiteSettings.siteName
  const title = settings.defaultSEO?.title || defaultSiteSettings.defaultSEO.title
  const description = settings.defaultSEO?.description || defaultSiteSettings.defaultSEO.description
  const image = getSiteImageURL(settings.defaultSEO?.image)

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: title,
      template: `%s｜${siteName}`,
    },
    description,
    openGraph: mergeOpenGraph({ description, image, siteName, title }),
    twitter: {
      card: 'summary_large_image',
      description,
      images: [image],
      title,
    },
  }
}
