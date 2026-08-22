import {
  ArrowRight,
  ArrowsClockwise,
  Buildings,
  Cube,
  FirstAid,
  LinkSimple,
  Lightning,
  ShoppingCartSimple,
  Smiley,
  Target,
  TreeStructure,
  UsersThree,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/site/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { services } from '@/data/site'
import { getSiteSettings } from '@/utilities/siteSettings'
import { buildPageJsonLd, generateSiteMetadata } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'

const seoDescription =
  '软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发服务，覆盖能源管理、IOT物联网、AI数字人、娱乐交友、生活服务、企业管理、电商/金融、医疗、区块链等多个行业。'

export const generateMetadata = () =>
  generateSiteMetadata({ title: '产品与服务', description: seoDescription, canonical: '/services' })

const serviceSummaries = [
  '从业务流程到稳定系统',
  '面向真实使用场景构建体验',
  '更轻的入口，更完整的服务闭环',
  '让模型进入流程，形成可用能力',
]

const industryScenarios = [
  { title: 'IoT 物联网', icon: TreeStructure },
  { title: '能源管理', icon: Lightning },
  { title: '企业管理', icon: Buildings },
  { title: '电商行业', icon: ShoppingCartSimple },
  { title: '医疗行业', icon: FirstAid },
  { title: '娱乐交友', icon: Smiley },
]

const deliveryOutcomes = [
  { title: '可维护的架构', icon: Cube },
  { title: '清晰的协作过程', icon: UsersThree },
  { title: '稳定的质量基线', icon: ShieldCheck },
  { title: '持续演进的产品', icon: ArrowsClockwise },
]

const technologyPrinciples = [
  {
    title: '按场景选型',
    description: '结合业务场景与约束条件，选择最合适的技术方案。',
    icon: Target,
  },
  {
    title: '全链路交付',
    description: '从需求到上线与运维，提供稳定可靠的端到端交付。',
    icon: LinkSimple,
  },
  {
    title: '长期可维护',
    description: '关注代码质量与架构演进，保障系统长期健康发展。',
    icon: ShieldCheck,
  },
]

export default async function ServicesPage() {
  const settings = await getSiteSettings()
  const brandID = `${new URL('/', getServerSideURL()).toString()}#brand`

  return (
    <main className="marketing-page inner-story">
      <JsonLd
        data={buildPageJsonLd({
          description: seoDescription,
          mainEntity: services.map((service) => ({
            '@type': 'Service',
            name: service.title,
            brand: { '@id': brandID },
            areaServed: 'CN',
            description: service.description,
          })),
          name: '产品与服务',
          path: '/services',
          settings,
          type: 'CollectionPage',
        })}
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

      <section className="services-capability" aria-labelledby="services-capability-title">
        <div className="site-container">
          <header className="services-capability-heading">
            <div>
              <h2 id="services-capability-title">
                从业务问题，
                <br />
                展开成完整产品
              </h2>
              <span aria-hidden="true" />
            </div>
            <p>围绕业务目标组合咨询、设计、研发与运维能力，让产品从想法走向稳定运行。</p>
          </header>

          <div className="services-capability-stage">
            <figure className="services-capability-artwork">
              <Image
                alt="由软件平台、移动应用、小程序、API、数据库与 AI 能力组成的分层产品架构"
                fill
                priority={false}
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 72vw, 850px"
                src="/ui/services/software-capability-architecture-v1.png"
              />
            </figure>

            <svg
              aria-hidden="true"
              className="services-capability-connectors"
              preserveAspectRatio="none"
              viewBox="0 0 1200 720"
            >
              <path d="M748 139 C804 139 802 90 852 90 H914" />
              <path d="M790 282 C836 282 840 246 878 246 H914" />
              <path d="M278 430 C236 430 232 400 190 400 H66" />
              <path d="M760 472 L866 530 V516 H914" />
              <circle cx="914" cy="90" r="4" />
              <circle cx="914" cy="246" r="4" />
              <circle cx="66" cy="400" r="4" />
              <circle cx="914" cy="516" r="4" />
            </svg>

            <div className="services-capability-callouts" aria-label="服务能力">
              {services.map((service, index) => (
                <article
                  className={`services-capability-callout services-capability-callout--${index + 1}`}
                  key={service.title}
                >
                  <div className="services-capability-callout-icon">
                    <service.icon aria-hidden="true" size={25} weight="regular" />
                  </div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{serviceSummaries[index]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services-industries" aria-labelledby="service-industries-title">
        <div className="site-container">
          <div className="services-section-heading">
            <h2 id="service-industries-title">适用行业场景</h2>
            <p>围绕行业流程、数据与用户体验，构建真正可运行的数字化产品。</p>
          </div>
          <div className="services-industry-list">
            {industryScenarios.map((scenario) => (
              <div className="services-industry-item" key={scenario.title}>
                <scenario.icon aria-hidden="true" size={38} weight="regular" />
                <h3>{scenario.title}</h3>
              </div>
            ))}
          </div>
          <Link className="services-industry-more" href="/contact">
            更多请咨询 <ArrowRight aria-hidden="true" size={16} weight="regular" />
          </Link>
        </div>
      </section>

      <section className="services-technology" aria-labelledby="services-technology-title">
        <div className="site-container services-technology-layout">
          <div className="services-technology-copy">
            <h2 id="services-technology-title">
              <span>覆盖主流技术栈，</span>
              <span>也尊重每个项目的真实边界</span>
            </h2>
            <p>
              我们根据业务目标、系统复杂度与长期维护要求选择合适的技术，而不是为了堆叠名词而使用技术。
            </p>
            <p>从产品前端、服务端、移动端到数据与部署，提供贯穿完整生命周期的工程能力。</p>

            <div className="services-technology-principles">
              {technologyPrinciples.map((principle) => (
                <div className="services-technology-principle" key={principle.title}>
                  <div className="services-technology-principle-icon">
                    <principle.icon aria-hidden="true" size={26} weight="regular" />
                  </div>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <figure className="services-technology-figure">
            <Image
              alt="后端、前端、移动端、数据库与云运维技术栈，涵盖 Go、Java、Python、Node.js、React、Vue、Flutter、PostgreSQL、Docker 与 Kubernetes 等技术"
              className="services-technology-image"
              height={1024}
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc(100vw - 64px), 690px"
              src="/ui/services/technology-stack-matrix-v1.png"
              width={1536}
            />
            <Link className="services-industry-more services-technology-contact" href="/contact">
              沟通你的技术需求 <ArrowRight aria-hidden="true" size={16} weight="regular" />
            </Link>
          </figure>
        </div>
      </section>

      <section className="services-delivery" aria-labelledby="services-delivery-title">
        <div className="site-container">
          <h2 id="services-delivery-title">交付不止于上线</h2>
          <div className="services-delivery-list">
            {deliveryOutcomes.map((outcome) => (
              <div className="services-delivery-item" key={outcome.title}>
                <div>
                  <outcome.icon aria-hidden="true" size={24} weight="regular" />
                </div>
                <h3>{outcome.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
