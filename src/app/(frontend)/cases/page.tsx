import type { Metadata } from 'next'
import Image from 'next/image'

import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { cases } from '@/data/site'
import { ContactCTA } from '@/sections/ContactCTA'

export const metadata: Metadata = {
  title: '案例',
  description: '查看云码智创科技在能源管理、企业运营与AI知识工作台等企业软件场景中的典型解决方案。',
  alternates: { canonical: '/cases' },
}

export default function CasesPage() {
  return (
    <main className="marketing-page">
      <PageHero
        title="把复杂场景，转化为清晰可用的产品"
        description="从业务目标、核心流程和关键数据出发，形成可实施、可验证、可持续迭代的解决方案。"
        backplate="以下内容为典型方案示意，不代表已公开客户项目或业绩数据。"
      />
      <section className="section-space cases-page-list">
        <div className="site-container">
          {cases.map((item, index) => (
            <Reveal className="case-feature" key={item.slug}>
              <div className="case-feature-image">
                <Image src={item.image} alt={`${item.title}场景示意`} fill sizes="(max-width: 768px) 100vw, 58vw" />
              </div>
              <div className="case-feature-content">
                <span>{item.tags.join(' / ')}</span>
                <h2>{item.title}</h2>
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
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCTA />
    </main>
  )
}
