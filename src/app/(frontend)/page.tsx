import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

import { JsonLd } from '@/components/site/JsonLd'
import { Reveal } from '@/components/site/Reveal'
import { SectionHeading } from '@/components/site/SectionHeading'
import { cases, capabilities, faqs, processSteps, scenarios, services } from '@/data/site'
import { ContactCTA } from '@/sections/ContactCTA'
import { FaqList } from '@/sections/FaqList'

export const metadata: Metadata = {
  title: '企业软件定制、APP、小程序与 AI 应用开发',
  description:
    '云码智创科技为中国企业提供软件定制、APP、小程序与AI应用开发，覆盖IoT物联网、能源管理、企业管理、电商和医疗平台。',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main className="marketing-page">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '云码智创科技',
            email: 'chrisleo.yu.cn@gmail.com',
            url: '/',
            description: '企业软件定制、APP、小程序与AI应用开发服务商。',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '云码智创科技',
            url: '/',
            inLanguage: 'zh-CN',
          },
        ]}
      />

      <section className="home-hero">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <h1>
              <span>软件不是项目终点，</span>
              <span>而是业务增长的基础设施</span>
            </h1>
            <p>为企业构建稳定、可扩展、可持续演进的数字化系统。</p>
            <Link className="button button-primary" href="/contact">
              联系我们 <ArrowRight size={18} />
            </Link>
          </div>

          <div className="hero-media">
            <Image
              src="/media/enterprise-team.webp"
              alt="云码智创团队与企业客户共同评审工业运营平台"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 68vw"
              className="hero-photo"
            />
            <div className="hero-dashboard">
              <Image
                src="/media/ai-agent-console-light.png"
                alt="AI Agent 工作流编排与任务运行界面"
                width={1672}
                height={941}
                priority
                sizes="(max-width: 768px) 86vw, 44vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hero-proof-shelf" aria-label="服务能力与行业案例">
        <div className="site-container hero-proof-grid">
          <div className="hero-service-strip">
            <h2>服务能力</h2>
            <div>
              {services.map((service) => (
                <Link href="/services" key={service.title}>
                  <service.icon size={25} weight="duotone" />
                  <span>{service.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link className="hero-case-proof" href="/cases">
            <Image
              src="/media/case-energy.webp"
              alt="能源运营数字化平台应用场景"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <span>
              <small>典型解决方案</small>
              能源运营数字化平台
            </span>
          </Link>
        </div>
      </section>

      <section className="strength-section section-space">
        <div className="site-container">
          <SectionHeading
            title="企业实力，体现在每个交付环节"
            description="不堆砌未经验证的数字。我们用清晰的方法、可见的过程和可维护的成果建立信任。"
          />
          <div className="strength-grid">
            {[
              ['端到端', '从业务咨询、产品设计到开发上线与持续运维。'],
              ['多场景', '理解设备、数据、流程、交易与服务等复杂企业场景。'],
              ['可持续', '以可扩展架构、工程质量与文档支持长期演进。'],
            ].map(([title, description]) => (
              <Reveal className="strength-item" key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section-space">
        <div className="site-container">
          <SectionHeading
            title="产品与工程服务"
            description="从一个业务问题出发，构建真正进入日常运营的软件产品。"
            action={
              <Link className="text-link" href="/services">
                查看产品与服务 <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="services-list">
            {services.map((service) => (
              <Reveal className="service-row" key={service.title}>
                <service.icon size={30} weight="duotone" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-section section-space">
        <div className="site-container capability-grid">
          <div className="capability-copy">
            <h2>技术能力服务于业务结果</h2>
            <p>技术选型不是展示清单。我们从系统边界、团队能力、交付风险和长期成本出发作出工程决策。</p>
            <ul>
              {capabilities.map((item) => (
                <li key={item}>
                  <Check size={18} weight="bold" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="capability-visual">
            <Image
              src="/media/energy-dashboard.webp"
              alt="企业软件技术架构与运营界面示意"
              width={1280}
              height={800}
            />
            <div className="capability-seal">
              <ShieldCheck size={25} weight="duotone" />
              <span>安全、性能与可维护性贯穿交付</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="scenarios-section section-space">
        <div className="site-container">
          <SectionHeading title="适配复杂企业场景" description="行业不同，底层问题往往相通：连接数据、重构流程、提升决策质量。" />
          <div className="scenario-grid">
            {scenarios.map((scenario, index) => (
              <Reveal className={`scenario-item scenario-item-${index + 1}`} key={scenario.title}>
                <scenario.icon size={30} weight="duotone" />
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cases-section section-space">
        <div className="site-container">
          <SectionHeading
            title="典型解决方案"
            description="以下为能力示意，用于呈现我们解决复杂业务问题的思路。"
            action={
              <Link className="text-link" href="/cases">
                查看全部案例 <ArrowRight size={17} />
              </Link>
            }
          />
          <div className="case-grid">
            {cases.map((item, index) => (
              <Reveal className={`case-card case-card-${index + 1}`} key={item.slug}>
                <div className="case-image">
                  <Image src={item.image} alt={`${item.title}应用场景示意`} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="case-content">
                  <div className="case-tags">{item.tags.join(' / ')}</div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="site-container">
          <SectionHeading title="从理解业务，到持续演进" description="每一步都有明确产出，也为下一步降低不确定性。" />
          <div className="process-track">
            {processSteps.map((step) => (
              <Reveal className="process-step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-preview section-space">
        <div className="site-container faq-grid">
          <div>
            <h2>开始合作前，你可能关心这些问题</h2>
            <p>合作范围、周期与方式会因项目而异，先从关键问题建立共同理解。</p>
            <Link className="text-link" href="/faq">
              查看全部问题 <ArrowRight size={17} />
            </Link>
          </div>
          <FaqList items={faqs.slice(0, 4)} />
        </div>
      </section>

      <ContactCTA />
    </main>
  )
}
