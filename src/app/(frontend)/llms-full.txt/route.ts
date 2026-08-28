import type { Post } from '@/payload-types'

import { caseArticles, type CaseArticle } from '@/data/caseArticles'
import { getServerSideURL } from '@/utilities/getURL'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import config from '@payload-config'
import type { SerializedEditorState } from 'lexical'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

type ArticleDocument = {
  body: string
  description: string
  publishedAt: string
  slug: string
  title: string
  updatedAt: string
}

function cleanInline(value?: string | null) {
  return (value || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function cleanBody(value: string) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/^\s*#{1,6}\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function dateOnly(value?: string | null) {
  if (!value) return ''

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

function lexicalToText(data: SerializedEditorState): string {
  return convertLexicalToPlaintext({
    data,
    converters: {
      blocks: {
        banner: ({ node }): string => {
          const fields = node.fields as typeof node.fields & {
            content?: SerializedEditorState
          }
          const content = fields.content

          return content && typeof content === 'object'
            ? lexicalToText(content as SerializedEditorState)
            : ''
        },
        code: ({ node }): string => {
          const fields = node.fields as typeof node.fields & {
            code?: string
            language?: string
          }
          const code = typeof fields.code === 'string' ? fields.code.trim() : ''
          const language = typeof fields.language === 'string' ? fields.language.trim() : ''

          return code ? `\n\`\`\`${language}\n${code}\n\`\`\`\n` : ''
        },
        mediaBlock: '',
      },
    },
  })
}

function cmsPostToArticle(post: Post): ArticleDocument {
  return {
    body: cleanBody(lexicalToText(post.content as SerializedEditorState)),
    description: cleanInline(post.meta?.description),
    publishedAt: dateOnly(post.publishedAt || post.createdAt),
    slug: post.slug,
    title: cleanInline(post.title),
    updatedAt: dateOnly(post.updatedAt),
  }
}

function caseArticleBody(article: CaseArticle) {
  const sections = article.sections.flatMap((section) => [
    `### ${cleanInline(section.heading)}`,
    section.paragraphs.map(cleanBody).join('\n\n'),
    section.points?.length ? section.points.map((point) => `- ${cleanInline(point)}`).join('\n') : '',
  ])

  const faq = article.faq.flatMap(({ answer, question }) => [
    `### ${cleanInline(question)}`,
    cleanBody(answer),
  ])

  return [
    article.intro.map(cleanBody).join('\n\n'),
    '### 核心要点',
    article.takeaways.map((point) => `- ${cleanInline(point)}`).join('\n'),
    ...sections,
    '### 常见问题',
    ...faq,
  ]
    .filter(Boolean)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function caseArticleToDocument(article: CaseArticle): ArticleDocument {
  return {
    body: caseArticleBody(article),
    description: cleanInline(article.description),
    publishedAt: dateOnly(article.publishedAt),
    slug: article.slug,
    title: cleanInline(article.title),
    updatedAt: dateOnly(article.updatedAt),
  }
}

function renderArticle(article: ArticleDocument, siteURL: string) {
  const url = new URL(`/posts/${article.slug}`, siteURL).toString()
  const metadata = [
    `- 原文：${url}`,
    article.publishedAt ? `- 发布日期：${article.publishedAt}` : '',
    article.updatedAt ? `- 更新日期：${article.updatedAt}` : '',
    article.description ? `- 摘要：${article.description}` : '',
  ].filter(Boolean)

  return [`## ${article.title}`, metadata.join('\n'), article.body].filter(Boolean).join('\n\n')
}

const getLLMSFull = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const settings = await getSiteSettings()
    const siteURL = getServerSideURL()

    const result = await payload.find({
      collection: 'posts',
      depth: 0,
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        content: true,
        createdAt: true,
        meta: {
          description: true,
        },
        publishedAt: true,
        slug: true,
        title: true,
        updatedAt: true,
      },
    })

    const articlesBySlug = new Map<string, ArticleDocument>()

    for (const post of result.docs) {
      if (post.slug) articlesBySlug.set(post.slug, cmsPostToArticle(post as Post))
    }

    for (const article of caseArticles) {
      articlesBySlug.set(article.slug, caseArticleToDocument(article))
    }

    const articles = Array.from(articlesBySlug.values()).sort((left, right) =>
      (right.publishedAt || right.updatedAt).localeCompare(left.publishedAt || left.updatedAt),
    )
    const siteName = cleanInline(settings.siteName || defaultSiteSettings.siteName)
    const brandDescription = cleanInline(
      settings.brandDescription || defaultSiteSettings.brandDescription,
    )
    const directory = articles
      .map((article) => {
        const url = new URL(`/posts/${article.slug}`, siteURL).toString()
        const description = article.description ? `: ${article.description}` : ''
        return `- [${article.title}](${url})${description}`
      })
      .join('\n')

    return [
      `# ${siteName}完整文章资料`,
      `> ${brandDescription}`,
      `本文档自动汇总本站 ${articles.length} 篇已发布文章。内容更新来源于 Payload CMS 和站内公开案例资料。`,
      '## 文章目录',
      directory,
      ...articles.map((article) => renderArticle(article, siteURL)),
    ]
      .filter(Boolean)
      .join('\n\n')
      .concat('\n')
  },
  ['llms-full'],
  {
    tags: ['llms-full'],
  },
)

export async function GET() {
  const content = await getLLMSFull()

  return new Response(content, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}
