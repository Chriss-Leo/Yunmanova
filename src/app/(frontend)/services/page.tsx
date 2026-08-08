import type { Metadata } from 'next'
import { Check } from '@phosphor-icons/react/dist/ssr'

import { JsonLd } from '@/components/site/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { Reveal } from '@/components/site/Reveal'
import { capabilities, scenarios, services } from '@/data/site'
import { ContactCTA } from '@/sections/ContactCTA'

export const metadata: Metadata = {
  title: '产品与服务',
  description: '软件定制、APP开发、小程序开发和AI应用开发服务，覆盖产品规划、设计、研发、测试、上线与运维。',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <main className="marketing-page">
      <JsonLd
        data={services.map((service) => ({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          provider: { '@type': 'Organization', name: '云码智创科技' },
          areaServed: 'CN',
          description: service.description,
        }))}
      />
      <PageHero
        title="从业务定义到稳定运行，一起完成软件产品"
        description="按需组合咨询、设计、研发与运维能力，解决不同阶段的产品与工程问题。"
        backplate="定制范围可覆盖完整产品周期，也可以从一个关键模块开始。"
      />

      <section className="section-space service-detail-section">
        <div className="site-container service-detail-list">
          {services.map((service, index) => (
            <Reveal className="service-detail" key={service.title}>
              <div className="service-detail-title">
                <service.icon size={34} weight="duotone" />
                <h2>{service.title}</h2>
              </div>
              <p>{service.description}</p>
              <ul>
                {capabilities.slice(index, index + 3).map((item) => (
                  <li key={item}>
                    <Check size={17} weight="bold" /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-space service-scenarios">
        <div className="site-container">
          <div className="narrow-heading">
            <h2>面向真实业务场景构建</h2>
            <p>我们把行业知识转化为产品结构、数据模型与可靠的系统能力。</p>
          </div>
          <div className="scenario-catalog">
            {scenarios.map((scenario) => (
              <div key={scenario.title}>
                <scenario.icon size={26} weight="duotone" />
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </main>
  )
}
