import Link from 'next/link'
import Image from 'next/image'

import type { LegalSection } from '@/data/legal'

export function LegalDocument({
  title,
  description,
  effectiveDate,
  sections,
  relatedHref,
  relatedLabel,
}: {
  title: string
  description: string
  effectiveDate: string
  sections: LegalSection[]
  relatedHref: string
  relatedLabel: string
}) {
  return (
    <main className="marketing-page inner-story legal-page">
      <header className="legal-hero">
        <Image
          src="/media/legal-hero-waves.png"
          alt={`${title}页面的绿色抽象波纹背景`}
          fill
          priority
          sizes="100vw"
          className="legal-hero-background"
        />
        <div className="site-container legal-hero-inner">
          <h1>{title}</h1>
          <p>{description}</p>
          <dl>
            <div>
              <dt>更新日期</dt>
              <dd>{effectiveDate}</dd>
            </div>
            <div>
              <dt>生效日期</dt>
              <dd>{effectiveDate}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="site-container legal-layout">
        <aside className="legal-toc" aria-label={`${title}目录`}>
          <strong>目录</strong>
          <nav>
            {sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-content">
          <div className="legal-summary">
            <strong>重要说明</strong>
            <p>
              本页面适用于网站访问和初步咨询。具体软件项目的服务范围、费用、验收、知识产权、保密与数据处理安排，以双方另行签署的项目文件为准。
            </p>
          </div>
          {sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <span className="legal-section-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.emphasis && (
                <p className="legal-emphasis">
                  <strong>{section.emphasis}</strong>
                </p>
              )}
            </section>
          ))}
          <div className="legal-related">
            <span>相关文件</span>
            <Link href={relatedHref}>{relatedLabel}</Link>
            <Link href="/contact">联系我们</Link>
          </div>
        </article>
      </div>
    </main>
  )
}
