import type { Metadata } from 'next'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { JsonLd } from '@/components/site/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { faqs } from '@/data/site'
import { FaqList } from '@/sections/FaqList'

export const metadata: Metadata = {
  title: '常见问题',
  description: '了解软件定制开发的合作流程、项目周期、费用评估、质量保障、系统集成与上线运维。',
  alternates: { canonical: '/faq' },
}

export default function FaqPage() {
  return (
    <main className="marketing-page inner-story">
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
        title={
          <>
            关于常见问题，
            <br />
            这里先给出清晰答案
          </>
        }
        description={
          <>
            每个项目都不同，
            <br />
            但合作的基本原则可以透明、具体、可预期。
          </>
        }
        image="/media/hero-faq-customer-support-v5.png"
        imageAlt="客服顾问通过在线沟通解答客户问题"
        secondaryHref="/services"
        secondaryLabel="了解服务方式"
      />
      <section className="inner-faq-section" aria-labelledby="faq-content-title">
        <div className="site-container inner-faq-layout">
          <header className="inner-faq-heading">
            <h2 id="faq-content-title">先把合作中的不确定性说清楚</h2>
            <p>从范围、周期到交付与运维，我们把项目开始前最常见的问题集中在这里。</p>
          </header>
          <FaqList items={faqs} defaultOpen={-1} />
          <Link className="inner-faq-contact" href="/contact">
            没有找到答案？直接联系我们
            <ArrowRight aria-hidden="true" size={16} weight="regular" />
          </Link>
        </div>
      </section>
    </main>
  )
}
