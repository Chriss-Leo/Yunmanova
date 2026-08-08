import type { Metadata } from 'next'

import { JsonLd } from '@/components/site/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { faqs } from '@/data/site'
import { ContactCTA } from '@/sections/ContactCTA'
import { FaqList } from '@/sections/FaqList'

export const metadata: Metadata = {
  title: '常见问题',
  description: '了解软件定制开发的合作流程、项目周期、费用评估、质量保障、系统集成与上线运维。',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <main className="marketing-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />
      <PageHero
        title="关于合作方式，这里先给出清晰答案"
        description="每个项目都不同，但合作的基本原则可以透明、具体、可预期。"
      />
      <section className="section-space faq-page-section">
        <div className="site-container faq-page-grid">
          <div>
            <h2>常见问题</h2>
            <p>如果你的问题没有列在这里，欢迎直接邮件联系我们。</p>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
      <ContactCTA />
    </main>
  )
}
