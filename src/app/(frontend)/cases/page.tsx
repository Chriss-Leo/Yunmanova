import type { Metadata } from 'next'
import Image from 'next/image'

import { PageHero } from '@/components/site/PageHero'
import { cases } from '@/data/site'

export const metadata: Metadata = {
  title: '案例',
  description: '查看云码智创科技在能源管理、企业运营与AI知识工作台等企业软件场景中的典型解决方案。',
  alternates: { canonical: '/cases' },
}

export default function CasesPage() {
  return (
    <main className="marketing-page inner-story">
      <PageHero
        title={
          <>
            把复杂场景，
            <br />
            转化为清晰可用的产品
          </>
        }
        description={
          <>
            从业务目标、核心流程和关键数据出发，
            <br />
            形成可实施、可验证、可持续迭代的解决方案。
          </>
        }
        image="/media/hero-cases-product-matrix-v5.png"
        imageAlt="AI 客服、能源平台、充电管理系统与移动应用组成的多端产品矩阵"
        imageFit="contain"
        secondaryHref="/services"
        secondaryLabel="了解服务"
      />
      <section className="inner-cases-section" aria-labelledby="cases-list-title">
        <div className="site-container inner-section-heading">
          <h2 id="cases-list-title">从业务挑战，到系统路径</h2>
          <p>案例以典型方案表达能力边界，不虚构客户、规模或业绩数据。</p>
        </div>
        <div className="inner-case-list">
          {cases.map((item) => (
            <article className="inner-case-study" key={item.slug}>
              <div className="inner-case-study-image">
                <Image
                  src={item.image}
                  alt={`${item.title}场景示意`}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </div>
              <div className="inner-case-study-copy">
                <span>{item.tags.join(' · ')}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <dl>
                  <div>
                    <dt>业务挑战</dt>
                    <dd>数据分散、流程割裂、信息难以及时支持决策。</dd>
                  </div>
                  <div>
                    <dt>方案重点</dt>
                    <dd>统一业务模型、关键工作流与角色化信息界面。</dd>
                  </div>
                  <div>
                    <dt>交付方式</dt>
                    <dd>分阶段验证核心路径，再逐步扩展系统能力。</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
