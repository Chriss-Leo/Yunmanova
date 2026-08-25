import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/site/JsonLd'
import type { CaseArticle } from '@/data/caseArticles'
import { buildArticleJsonLd, buildPageJsonLd } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'

export async function CaseArticlePage({ article }: { article: CaseArticle }) {
  const settings = await getSiteSettings()
  const path = `/posts/${article.slug}`
  const siteURL = getServerSideURL()
  const pageURL = new URL(path, siteURL).toString()
  const publishedDate = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'long',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(article.publishedAt))
  const [titleSubject, ...titleDetailParts] = article.title.split('：')
  const titleDetail = titleDetailParts.join('：')

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageURL}#faq`,
    mainEntity: article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <main className="marketing-page inner-story legal-page case-article">
      <JsonLd
        data={[
          buildPageJsonLd({
            description: article.description,
            name: article.title,
            path,
            settings,
          }),
          {
            ...buildArticleJsonLd({
              authors: [settings.siteName || defaultSiteSettings.siteName],
              dateModified: article.updatedAt,
              datePublished: article.publishedAt,
              description: article.description,
              image: article.heroImage,
              path,
              settings,
              title: article.title,
            }),
            articleSection: article.category,
            keywords: article.keywords.join(', '),
          },
          faqJsonLd,
        ]}
      />

      <header className="legal-hero case-article-document-hero">
        <Image
          src="/media/legal-hero-waves.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="legal-hero-background"
        />
        <div className="site-container legal-hero-inner">
          <h1>
            {titleDetail ? (
              <>
                <span>{titleSubject}：</span>
                <span>{titleDetail}</span>
              </>
            ) : (
              article.title
            )}
          </h1>
          <p>{article.description}</p>
          <dl>
            <div>
              <dt>专题</dt>
              <dd>{article.category}</dd>
            </div>
            <div>
              <dt>阅读时间</dt>
              <dd>{article.readingTime}</dd>
            </div>
            <div>
              <dt>更新日期</dt>
              <dd>
                <time dateTime={article.updatedAt}>{publishedDate}</time>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="site-container legal-layout">
        <aside className="legal-toc" aria-label={`${article.title}目录`}>
          <strong>目录</strong>
          <nav>
            {article.sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.heading}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.heading}
              </a>
            ))}
            <a href="#faq">
              <span>{String(article.sections.length + 1).padStart(2, '0')}</span>
              常见问题
            </a>
          </nav>
        </aside>

        <article className="legal-content case-article-document">
          <div className="legal-summary">
            <strong>本文要点</strong>
            <ul>
              {article.takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </div>

          <div className="case-article-preface">
            {article.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <figure className="case-article-evidence">
            <div>
              <Image
                alt={article.heroAlt}
                fill
                priority
                sizes="(max-width: 640px) calc(100vw - 32px), 760px"
                src={article.heroImage}
              />
            </div>
            <figcaption>{article.category}产品界面示意</figcaption>
          </figure>

          {article.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.heading}>
              <span className="legal-section-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="legal-emphasis">
            <strong>
              本文基于寻光数字科技的产品能力与典型业务场景整理，用于介绍解决问题的方法，不涉及未公开客户数据。
            </strong>
          </p>

          <section id="faq" className="case-article-document-faq">
            <span className="legal-section-number">
              {String(article.sections.length + 1).padStart(2, '0')}
            </span>
            <h2>常见问题</h2>
            {article.faq.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>

          <div className="legal-related">
            <span>继续了解</span>
            <Link href="/cases">案例展示</Link>
            <Link href="/contact">联系我们</Link>
          </div>
        </article>
      </div>
    </main>
  )
}
