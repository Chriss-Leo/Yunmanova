import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Media as PayloadMedia } from '@/components/Media'
import { Pagination } from '@/components/Pagination'
import { JsonLd } from '@/components/site/JsonLd'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { caseArticles } from '@/data/caseArticles'
import type { Media } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { buildPageJsonLd, generateSiteMetadata } from '@/utilities/seo'
import { getSiteSettings } from '@/utilities/siteSettings'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type ArticleListingItem = {
  category: string
  date?: string | null
  description: string
  image?: Media | number | string | null
  readingTime?: string
  slug: string
  title: string
}

const featuredSlug = 'virtual-power-plant-platform-guide'

function formatDate(value?: string | null) {
  if (!value) return null

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(value))
}

function ArticleImage({
  article,
  priority = false,
}: {
  article: ArticleListingItem
  priority?: boolean
}) {
  const image = article.image

  if (typeof image === 'string') {
    return (
      <Image
        alt={article.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        src={image}
      />
    )
  }

  if (image && typeof image === 'object') {
    return (
      <PayloadMedia
        alt={article.title}
        fill
        imgClassName="posts-index-card-image"
        priority={priority}
        resource={image}
        size="(max-width: 768px) 100vw, 50vw"
      />
    )
  }

  return (
    <Image
      alt={`${article.title}文章封面`}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      src="/media/legal-hero-waves.png"
    />
  )
}

function ArticleCard({ article }: { article: ArticleListingItem }) {
  const date = formatDate(article.date)

  return (
    <Card className="posts-index-card">
      <Link href={`/posts/${article.slug}`}>
        <div className="posts-index-card-media">
          <ArticleImage article={article} />
        </div>
        <CardHeader>
          <p className="posts-index-card-category">{article.category}</p>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{article.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <span>{article.readingTime || date || '文章'}</span>
          <span className="posts-index-card-link">
            阅读全文 <ArrowUpRight aria-hidden="true" />
          </span>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default async function Page() {
  const [payload, settings] = await Promise.all([
    getPayload({ config: configPromise }),
    getSiteSettings(),
  ])

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    draft: false,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  const caseItems: ArticleListingItem[] = caseArticles.map((article) => ({
    category: article.category,
    date: article.publishedAt,
    description: article.description,
    image: article.heroImage,
    readingTime: article.readingTime,
    slug: article.slug,
    title: article.title,
  }))

  const cmsItems: ArticleListingItem[] = posts.docs.map((post) => ({
    category:
      post.categories
        ?.map((category) => (typeof category === 'object' ? category.title : null))
        .find((title): title is string => Boolean(title)) || '观点文章',
    date: post.publishedAt,
    description: post.meta?.description || '关于产品设计、软件开发与企业数字化的实践分享。',
    image: post.meta?.image,
    slug: post.slug || '',
    title: post.title,
  }))

  const itemMap = new Map<string, ArticleListingItem>()
  ;[...caseItems, ...cmsItems].forEach((item) => {
    if (item.slug && !itemMap.has(item.slug)) itemMap.set(item.slug, item)
  })

  const allArticles = Array.from(itemMap.values())
  const featuredArticle =
    allArticles.find((article) => article.slug === featuredSlug) || allArticles[0]
  const remainingArticles = allArticles.filter((article) => article.slug !== featuredArticle?.slug)
  const siteURL = getServerSideURL()

  return (
    <main className="posts-index-page">
      <JsonLd
        data={buildPageJsonLd({
          description:
            '阅读无锡寻光数字科技关于软件开发、能源管理、IoT、AI应用、Web3与企业数字化的原创文章和产品实践。',
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: allArticles.length,
            itemListElement: allArticles.map((article, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: article.title,
              url: new URL(`/posts/${article.slug}`, siteURL).toString(),
            })),
          },
          name: '文章与产品实践',
          path: '/posts',
          settings,
          type: 'CollectionPage',
        })}
      />
      <PageClient />

      <header className="posts-index-hero">
        <div className="site-container posts-index-hero-inner">
          <div>
            <h1>文章与产品实践</h1>
            <p>
              围绕能源管理、虚拟电厂、IoT、企业 AI 与数字化产品，分享从业务梳理到系统落地的方法。
            </p>
          </div>
          <dl>
            <div>
              <dt>当前文章</dt>
              <dd>{allArticles.length} 篇</dd>
            </div>
            <div>
              <dt>案例专题</dt>
              <dd>{caseItems.length} 个</dd>
            </div>
            <div>
              <dt>内容范围</dt>
              <dd>案例、方法与指南</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="site-container posts-index-content">
        {featuredArticle && (
          <section className="posts-index-featured" aria-labelledby="featured-post-heading">
            <div className="posts-index-section-heading">
              <h2 id="featured-post-heading">最新文章</h2>
              <p>查看最近发布的案例复盘、产品方法与技术实践。</p>
            </div>

            <Card className="posts-index-featured-card">
              <Link href={`/posts/${featuredArticle.slug}`}>
                <div className="posts-index-featured-media">
                  <ArticleImage article={featuredArticle} priority />
                </div>
                <div className="posts-index-featured-copy">
                  <CardHeader>
                    <p className="posts-index-card-category">{featuredArticle.category}</p>
                    <CardTitle>{featuredArticle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{featuredArticle.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <span>{featuredArticle.readingTime || formatDate(featuredArticle.date)}</span>
                    <span className="posts-index-card-link">
                      阅读全文 <ArrowUpRight aria-hidden="true" />
                    </span>
                  </CardFooter>
                </div>
              </Link>
            </Card>
          </section>
        )}

        <section className="posts-index-all" aria-labelledby="all-posts-heading">
          <div className="posts-index-section-heading posts-index-section-heading-row">
            <div>
              <h2 id="all-posts-heading">全部文章</h2>
              <p>按主题浏览案例复盘、产品方法与技术实践。</p>
            </div>
            <span>{remainingArticles.length} 篇</span>
          </div>

          <div className="posts-index-grid">
            {remainingArticles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>

          {posts.totalPages > 1 && posts.page && (
            <div className="posts-index-pagination">
              <Pagination page={posts.page} totalPages={posts.totalPages} />
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export function generateMetadata(): Promise<Metadata> {
  return generateSiteMetadata({
    title: '文章与产品实践',
    description:
      '阅读无锡寻光数字科技关于软件开发、能源管理、IoT、AI应用、Web3金融、数据大屏与企业数字化的原创文章和产品实践。',
    canonical: '/posts',
  })
}
