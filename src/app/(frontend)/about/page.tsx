import type { Metadata } from 'next'
import Image from 'next/image'

import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { processSteps } from '@/data/site'
import { ContactCTA } from '@/sections/ContactCTA'

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解云码智创科技的产品方法、工程原则与企业软件开发合作方式。',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main className="marketing-page">
      <PageHero
        title="用产品思维和工程纪律，认真完成每一个系统"
        description="云码智创科技专注企业软件与数字化产品开发，重视业务理解、技术质量与长期合作。"
      />
      <section className="section-space about-story">
        <div className="site-container about-story-grid">
          <Reveal className="about-photo">
            <Image src="/media/enterprise-team.webp" alt="团队评审企业软件产品" fill sizes="(max-width: 768px) 100vw, 56vw" />
          </Reveal>
          <div className="about-copy">
            <h2>我们相信，可靠的软件来自共同理解</h2>
            <p>业务、产品、设计和工程需要在同一目标下协作。我们先把问题说清楚，再用合适的技术把它解决。</p>
            <p>在项目推进中，关键决策、阶段成果与风险保持透明。系统上线不是结束，而是进入真实业务并持续演进的开始。</p>
          </div>
        </div>
      </section>
      <section className="section-space principles-section">
        <div className="site-container">
          <h2>我们的工作原则</h2>
          <div className="principles-grid">
            {[
              ['先理解，再开发', '把业务目标、用户任务与系统边界放在技术选型之前。'],
              ['小步验证，持续交付', '优先验证高风险与高价值路径，让反馈尽早进入产品。'],
              ['质量贯穿全过程', '架构、代码、测试、安全与文档共同决定系统的长期成本。'],
              ['对结果保持透明', '不回避风险，不包装不确定性，让合作双方始终掌握真实状态。'],
            ].map(([title, description]) => (
              <Reveal key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
          <div className="about-process">
            {processSteps.map((step) => (
              <div key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  )
}
