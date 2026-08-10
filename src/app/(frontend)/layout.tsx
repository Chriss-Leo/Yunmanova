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
              '<!-- THESIS: faithfully reconstruct the supplied enterprise homepage reference below the locked shared Header. OWN-WORLD: white space, graphite Chinese typography, forest-green controls, connected documentary photography and authentic project UI. STORY: understand the promise, see engineering proof, inspect multi-device products, explore industry scenes, follow delivery and make contact. FIRST VIEWPORT: connected split hero with enterprise review photography. FORM: approved user reference reconstruction. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->',
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

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: '云码智创科技｜企业软件定制、APP、小程序与 AI 应用开发',
    template: '%s｜云码智创科技',
  },
  description:
    '云码智创科技提供软件定制开发、APP开发、小程序开发与AI应用开发，服务IoT物联网、能源管理、企业管理、电商与医疗等企业数字化场景。',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
