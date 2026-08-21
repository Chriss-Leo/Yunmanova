import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Buildings,
  Factory,
  Lightbulb,
  Play,
  SquaresFour,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

import { JsonLd } from '@/components/site/JsonLd'
import { faqs, processSteps } from '@/data/site'
import { FaqList } from '@/sections/FaqList'
import { ProductCarousel } from '@/sections/ProductCarousel'
import { getSiteSettings } from '@/utilities/siteSettings'
import {
  buildBrandJsonLd,
  buildPageJsonLd,
  buildWebsiteJsonLd,
  generateSiteMetadata,
} from '@/utilities/seo'

export const generateMetadata = () =>
  generateSiteMetadata({
    title:
      '软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发',
    description:
      '寻光数字科技为中国企业提供软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发，覆盖IoT物联网、能源管理、企业管理、电商、医疗、Web3和金融平台。',
    canonical: '/',
  })

const processIconSources = [
  '/media/process-icons/discovery.png',
  '/media/process-icons/planning.png',
  '/media/process-icons/development.png',
  '/media/process-icons/testing.png',
  '/media/process-icons/iteration.png',
]

const scenarioItems = [
  { title: '能源与电力', icon: Lightbulb },
  { title: '设施与设备管理', icon: Factory },
  { title: '城市服务', icon: Buildings },
  { title: '文旅与社区', icon: UsersThree },
  { title: '更多行业', icon: SquaresFour },
]

export default async function HomePage() {
  const settings = await getSiteSettings()

  return (
    <main className="marketing-page reference-home">
      <JsonLd
        data={[
          buildBrandJsonLd(settings),
          buildWebsiteJsonLd(settings),
          buildPageJsonLd({
            description:
              '寻光数字科技为中国企业提供软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发。',
            name: '寻光数字科技首页',
            path: '/',
            settings,
          }),
        ]}
      />

      <section className="ref-hero" aria-labelledby="ref-hero-title">
        <Image
          src="/media/homepage-team-energy-operations.png"
          alt="寻光数字团队评审企业能源运营平台"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 68vw"
          className="ref-hero-image"
        />
        <div className="ref-hero-wash" />
        <div className="site-container ref-hero-inner">
          <div className="ref-hero-copy">
            <h1 id="ref-hero-title">
              软件不是项目终点，
              <br />
              而是业务增长的基础设施
            </h1>
            <p>
              以技术连接业务与产品，
              <br />
              为企业打造可靠、灵活且可持续演进的软件解决方案。
            </p>
            <div className="ref-hero-actions">
              <Link className="button button-primary" href="/contact">
                预约咨询 <ArrowRight size={17} />
              </Link>
              <Link className="button ref-button-outline" href="/services">
                了解服务 <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ref-delivery-film" aria-labelledby="delivery-film-title">
        <Image
          src="/media/development-team-dark.png"
          alt="软件工程团队在真实开发环境中协同交付"
          fill
          sizes="100vw"
          className="ref-delivery-film-image"
        />
        <div className="ref-delivery-film-scrim" />
        <div className="site-container ref-delivery-film-inner">
          <div className="ref-delivery-film-copy">
            <h2 id="delivery-film-title">真实项目，真实交付</h2>
            <p>
              从需求到上线，我们与客户并肩作战。专业的工程团队，严谨的交付流程，保障每一个系统稳定、可靠、可持续演进。
            </p>
            <a
              className="ref-film-link"
              href="/media/team-collaboration-source.mp4"
              target="_blank"
            >
              <span>
                <Play size={17} weight="fill" />
              </span>
              观看团队视频
            </a>
          </div>
        </div>
      </section>

      <section className="ref-products" aria-label="产品方案">
        <ProductCarousel />
      </section>

      <section className="ref-scenarios" aria-labelledby="scenarios-title">
        <Image
          src="/media/energy-scenario-platform-v2.png"
          alt="风电、光伏与储能协同的能源数字化场景"
          fill
          sizes="100vw"
          className="ref-scenarios-image"
        />
        <div className="ref-scenarios-scrim" />
        <div className="site-container ref-scenarios-content">
          <div className="ref-scenarios-copy">
            <p>我们服务的行业与场景</p>
            <h2 id="scenarios-title">
              让系统场景更简单
              <br />
              让关键决策更智能
            </h2>
            <span>构建面向未来的数字底座，支撑企业在不同业务场景中持续增长。</span>
            <Link href="/cases">
              探索行业方案 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="ref-scenario-list">
            {scenarioItems.map((item) => (
              <div key={item.title}>
                <item.icon size={27} weight="duotone" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ref-process" aria-labelledby="process-title">
        <div className="site-container">
          <div className="ref-process-heading">
            <p>产品的生命周期</p>
            <h2 id="process-title">从需求到价值的确定路径</h2>
          </div>
          <div className="ref-process-track">
            <svg
              className="ref-process-return-path ref-process-return-path-top"
              viewBox="0 0 120 96"
              aria-hidden="true"
            >
              <path d="M 12 1 L 4 8 L 12 15 L 4 8 H 82 Q 108 8 108 34 V 94" />
            </svg>
            <svg
              className="ref-process-return-path ref-process-return-path-bottom"
              viewBox="0 0 120 96"
              aria-hidden="true"
            >
              <path d="M 4 88 H 82 Q 108 88 108 62 V 8 L 101 15 L 108 8 L 115 15" />
            </svg>
            {processSteps.map((step, index) => {
              return (
                <div className="ref-process-step" key={step.title}>
                  <div className="ref-process-content">
                    <span className="ref-process-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="ref-process-icon" aria-hidden="true">
                      <Image
                        src={processIconSources[index]}
                        alt=""
                        width={360}
                        height={360}
                        className="ref-process-icon-image"
                      />
                    </div>
                    <div className="ref-process-text">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                  <span className="ref-process-node" aria-hidden="true" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="ref-faq" aria-labelledby="ref-faq-title">
        <div className="site-container ref-faq-inner">
          <div className="ref-faq-copy">
            <p>常见问题</p>
            <h2 id="ref-faq-title">你关心的问题，我们已经准备好答案</h2>
          </div>
          <FaqList items={faqs.slice(0, 4)} defaultOpen={-1} />
          <Link className="ref-faq-more" href="/faq">
            查看全部问题 <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
