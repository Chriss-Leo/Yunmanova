import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowsClockwise,
  Brain,
  Buildings,
  CheckCircle,
  Code,
  EnvelopeSimple,
  Factory,
  Lightbulb,
  MapPin,
  Monitor,
  NotePencil,
  Phone,
  Play,
  SquaresFour,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr'

import { JsonLd } from '@/components/site/JsonLd'
import { faqs, processSteps } from '@/data/site'
import { FaqList } from '@/sections/FaqList'

export const metadata: Metadata = {
  title: '企业软件定制、APP、小程序与 AI 应用开发',
  description:
    '云码智创科技为中国企业提供软件定制、APP、小程序与AI应用开发，覆盖IoT物联网、能源管理、企业管理、电商和医疗平台。',
  alternates: { canonical: '/' },
}

const productProof = [
  '能源管理平台',
  '物联网平台',
  '移动端应用',
  '城市兴趣服务小程序',
]

const scenarioItems = [
  { title: '能源与电力', icon: Lightbulb },
  { title: '设施与设备管理', icon: Factory },
  { title: '城市服务', icon: Buildings },
  { title: '文旅与社区', icon: UsersThree },
  { title: '更多行业', icon: SquaresFour },
]

const processIcons = [Brain, NotePencil, Code, Monitor, ArrowsClockwise]

export default function HomePage() {
  return (
    <main className="marketing-page reference-home">
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

      <section className="ref-hero" aria-labelledby="ref-hero-title">
        <Image
          src="/media/homepage-team-energy-operations.png"
          alt="云码智创团队评审企业能源运营平台"
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
              我们为企业构建可靠、可扩展的软件与物联网平台，
              <br />
              让系统持续创造价值。
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
            <p>从需求到上线，我们与客户并肩作战。专业的工程团队，严谨的交付流程，保障每一个系统稳定、可靠、可持续演进。</p>
            <a className="ref-film-link" href="/media/team-collaboration-source.mp4" target="_blank">
              <span><Play size={17} weight="fill" /></span>
              观看团队视频
            </a>
          </div>
        </div>
      </section>

      <section className="ref-products" aria-labelledby="products-title">
        <div className="site-container ref-products-inner">
          <div className="ref-products-copy">
            <p className="ref-section-label">产品与方案</p>
            <h2 id="products-title">让系统持续创造价值</h2>
            <span className="ref-heading-rule" />
            <p>面向能源与设施运营、城市服务等领域，提供软件系统、物联网平台与移动应用的一体化解决方案。</p>
            <Link className="ref-text-link" href="/services">
              查看全部方案 <ArrowRight size={16} />
            </Link>
          </div>

          <div className="ref-product-stage" aria-label="真实产品界面展示">
            <div className="ref-product-panel ref-product-panel-login">
              <Image src="/media/energy-login-official.png" alt="能源管理平台登录界面" fill sizes="35vw" />
            </div>
            <div className="ref-product-panel ref-product-panel-dashboard">
              <Image src="/media/energy-operations-dashboard.png" alt="能源运营数据平台界面" fill sizes="38vw" />
            </div>
            <div className="ref-phone ref-phone-dark">
              <Image src="/ui/app01.png" alt="动态电价移动应用" fill sizes="20vw" />
            </div>
            <div className="ref-phone ref-phone-light">
              <Image src="/ui/app02.png" alt="企业移动服务应用" fill sizes="18vw" />
            </div>
            <div className="ref-phone ref-phone-mini">
              <Image src="/ui/miniprogram01.png" alt="城市兴趣服务小程序" fill sizes="18vw" />
            </div>
          </div>

          <div className="ref-product-proof" aria-label="交付产品类型">
            {productProof.map((item) => (
              <div key={item}>
                <CheckCircle size={17} weight="fill" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
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
            <h2 id="scenarios-title">让系统场景更简单<br />让关键决策更智能</h2>
            <span>构建面向未来的数字底座，支撑企业在不同业务场景中持续增长。</span>
            <Link href="/cases">探索行业方案 <ArrowRight size={16} /></Link>
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
            <p>我们的交付方法</p>
            <h2 id="process-title">从需求到价值的确定路径</h2>
          </div>
          <div className="ref-process-track">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index]
              return (
                <div className="ref-process-step" key={step.title}>
                  <div className="ref-process-icon"><Icon size={25} weight="duotone" /></div>
                  <div className="ref-process-line" aria-hidden="true" />
                  <span className="ref-process-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
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
            <Link href="/faq">查看全部问题 <ArrowRight size={16} /></Link>
          </div>
          <FaqList items={faqs.slice(0, 4)} defaultOpen={-1} />
        </div>
      </section>

      <section className="ref-contact" aria-labelledby="ref-contact-title">
        <Image src="/media/forest-contact-panorama.png" alt="森林与山脉景观" fill sizes="100vw" />
        <div className="ref-contact-scrim" />
        <div className="site-container ref-contact-inner">
          <div className="ref-contact-copy">
            <h2 id="ref-contact-title">准备好一起创造价值了吗？</h2>
            <p>无论你有明确需求，还是正在探索方向，我们都乐意成为你的技术伙伴。</p>
            <Link className="button button-light" href="/contact">联系我们 <ArrowRight size={17} /></Link>
          </div>
          <div className="ref-contact-details">
            <div><Phone size={21} /><span><small>电话咨询</small>欢迎预约沟通</span></div>
            <a href="mailto:chrisleo.yu.cn@gmail.com"><EnvelopeSimple size={21} /><span><small>邮箱咨询</small>chrisleo.yu.cn@gmail.com</span></a>
            <div><MapPin size={21} /><span><small>服务范围</small>面向全国企业客户提供远程与现场协作</span></div>
          </div>
        </div>
        <footer className="ref-legal-footer">
          <div className="site-container">
            <span>© {new Date().getFullYear()} 云码智创科技 版权所有</span>
            <div><Link href="/about">隐私政策</Link><Link href="/contact">服务条款</Link></div>
          </div>
        </footer>
      </section>
    </main>
  )
}
