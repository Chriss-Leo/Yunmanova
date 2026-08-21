import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { generateSiteMetadata } from '@/utilities/seo'
import { buildPageJsonLd } from '@/utilities/seo'
import { JsonLd } from '@/components/site/JsonLd'
import { getSiteSettings } from '@/utilities/siteSettings'
import { getServerSideURL } from '@/utilities/getURL'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const [payload, settings] = await Promise.all([
    getPayload({ config: configPromise }),
    getSiteSettings(),
  ])

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <JsonLd
        data={buildPageJsonLd({
          description:
            '阅读无锡寻光数字科技关于软件开发、网站、APP、小程序、AI应用与企业数字化的文章与实践分享。',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: posts.docs.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: post.title,
              url: new URL(`/posts/${post.slug}`, getServerSideURL()).toString(),
            })),
          },
          name: '文章',
          path: '/posts',
          settings,
          type: 'CollectionPage',
        })}
      />
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return generateSiteMetadata({
    title: '文章',
    description:
      '阅读无锡寻光数字科技关于软件开发、网站、APP、小程序、AI应用、Web3金融、数据大屏与企业数字化的文章与实践分享。',
    canonical: '/posts',
    noIndex: posts.totalDocs === 0,
  })
}
