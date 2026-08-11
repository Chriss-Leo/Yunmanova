import type { Metadata } from 'next'
import Image from 'next/image'

import { PageHero } from '@/components/site/PageHero'
import { processSteps } from '@/data/site'

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解云码智创科技的产品方法、工程原则与企业软件开发合作方式。',
  alternates: { canonical: '/about' },
}

const principles = [
  ['先理解，再开发', '把业务目标、用户任务与系统边界放在技术选型之前。'],
  ['小步验证，持续交付', '优先验证高风险与高价值路径，让反馈尽早进入产品。'],
  ['质量贯穿全过程', '架构、代码、测试、安全与文档共同决定系统的长期成本。'],
  ['对结果保持透明', '不回避风险，不包装不确定性，让合作双方始终掌握真实状态。'],
]

const processIcons = ['discovery', 'planning', 'development', 'testing', 'iteration']

export default function AboutPage() {
  return (
    <main className="marketing-page inner-story">
      <PageHero
        title={
          <>
            用产品思维和工程纪律，
            <br />
            认真完成每一个系统
          </>
        }
        description={
          <>
            云码智创科技专注企业软件与数字化产品开发，
            <br />
            重视业务理解、技术质量与长期合作。
          </>
        }
        image="/media/enterprise-team.webp"
        imageAlt="团队共同评审企业数字化产品"
        variant="split"
        secondaryHref="/cases"
        secondaryLabel="查看案例"
      />

      <section className="inner-about-proof">
        <Image
          src="/media/development-team-dark.png"
          alt="产品、设计和工程团队共同推进项目"
          fill
          sizes="100vw"
          className="inner-about-proof-image"
        />
        <div className="inner-about-proof-scrim" />
        <div className="site-container inner-about-proof-content">
          <div>
            <p className="inner-section-kicker">共同理解</p>
            <h2>可靠的软件，始于对同一个问题的共同理解</h2>
            <p>
              业务、产品、设计和工程需要在同一目标下协作。我们先把问题说清楚，再用合适的技术把它解决。
            </p>
            <p>
              关键决策、阶段成果与风险保持透明。系统上线不是结束，而是进入真实业务并持续演进的开始。
            </p>
          </div>
        </div>
      </section>

      <section className="inner-principles-section">
        <div className="site-container">
          <div className="inner-section-heading">
            <p className="inner-section-kicker">工作原则</p>
            <h2>让每一次合作都有清晰的判断依据</h2>
          </div>
          <div className="inner-principles-grid">
            {principles.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-about-process-section">
        <div className="site-container">
          <div className="inner-section-heading inner-section-heading--center">
            <p className="inner-section-kicker">产品的生命周期</p>
            <h2>从需求到价值的确定路径</h2>
          </div>
          <ol className="inner-about-process">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="inner-about-process-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="inner-about-process-icon">
                  <Image
                    src={`/media/process-icons/${processIcons[index]}.png`}
                    alt=""
                    width={72}
                    height={72}
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
