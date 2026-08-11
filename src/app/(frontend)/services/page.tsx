import type { Metadata } from 'next'
import { Check } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { JsonLd } from '@/components/site/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { capabilities, scenarios, services } from '@/data/site'

export const metadata: Metadata = {
  title: '产品与服务',
  description:
    '软件定制、APP开发、小程序开发和AI应用开发服务，覆盖产品规划、设计、研发、测试、上线与运维。',
  alternates: { canonical: '/services' },
}

const serviceVisuals = [
  { src: '/media/products/finance-dashboard-cn.png', alt: '中文智能财务与企业运营平台界面' },
  { src: '/media/products/travel-assistant-app-cn.png', alt: '中文智能旅行移动应用界面' },
  { src: '/ui/miniprogram01.png', alt: '微信小程序产品界面' },
  { src: '/media/ai-agent-console-light.png', alt: '企业 AI 智能体工作台界面' },
]

const serviceCapabilities = [
  capabilities.slice(0, 3),
  [capabilities[1], capabilities[2], capabilities[4]],
  [capabilities[0], capabilities[1], capabilities[3]],
  [capabilities[0], capabilities[2], capabilities[4]],
]

export default function ServicesPage() {
  return (
    <main className="marketing-page inner-story">
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
        title={
          <>
            让技术服务于业务，
            <br />
            为业务构建可靠的产品
          </>
        }
        description={
          <>
            按需组合咨询、设计、研发与运维能力，
            <br />
            解决不同阶段的产品与工程问题。
          </>
        }
        image="/media/hero-services-data-insights-v1.png"
        imageAlt="数据分析与智能洞察软件服务插画"
        secondaryHref="/cases"
        secondaryLabel="查看案例"
      />

      <section className="inner-services-section" aria-labelledby="services-delivery-title">
        <div className="site-container inner-section-heading">
          <h2 id="services-delivery-title">真实产品界面，对应完整交付能力</h2>
          <p>每一种服务都从业务目标开始，以可验证的产品成果结束。</p>
        </div>
        <div className="inner-services-list">
          {services.map((service, index) => (
            <article className="inner-service-feature" key={service.title}>
              <div className="inner-service-feature-visual">
                <Image
                  alt={serviceVisuals[index].alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 56vw"
                  src={serviceVisuals[index].src}
                />
              </div>
              <div className="inner-service-feature-copy">
                <service.icon aria-hidden="true" size={34} weight="duotone" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {serviceCapabilities[index].map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={17} weight="bold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-scenarios-section" aria-labelledby="service-scenarios-title">
        <div className="site-container">
          <div className="inner-section-heading inner-section-heading--light">
            <h2 id="service-scenarios-title">面向真实业务场景构建</h2>
            <p>我们把行业知识转化为产品结构、数据模型与可靠的系统能力。</p>
          </div>
          <div className="inner-scenario-list">
            {scenarios.map((scenario) => (
              <div key={scenario.title}>
                <scenario.icon aria-hidden="true" size={26} weight="duotone" />
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
