import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SiteAnalytics } from '@/components/site/SiteAnalytics'
import { SupportChat } from '@/components/site/SupportChat'
import { getSiteVerificationMetadata, seoConfig } from '@/config/seo'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { getSiteSettings } from '@/utilities/siteSettings'
import { generateSiteMetadata } from '@/utilities/seo'
import { draftMode } from 'next/headers'

import './globals.css'
import '@fontsource-variable/noto-sans-sc'

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
        <link href="/favicon.ico?v=2" rel="icon" sizes="32x32" />
        <link href="/favicon.svg?v=2" rel="icon" type="image/svg+xml" />
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
          <SupportChat />
        </Providers>
        <SiteAnalytics />
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const generated = await generateSiteMetadata({})

  return {
    ...generated,
    metadataBase: new URL(seoConfig.canonicalBaseURL),
    title: {
      default: settings.defaultSEO.title,
      template: `%s｜${settings.siteName}`,
    },
    verification: getSiteVerificationMetadata(),
  }
}
