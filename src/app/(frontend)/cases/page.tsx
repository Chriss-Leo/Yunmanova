import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PageHero } from '@/components/site/PageHero'
import { JsonLd } from '@/components/site/JsonLd'

import { CaseShowcaseNav } from './CaseShowcaseNav'
import { buildPageJsonLd, generateSiteMetadata } from '@/utilities/seo'
import { getSiteSettings } from '@/utilities/siteSettings'

export const generateMetadata = () =>
  generateSiteMetadata({
    title: '案例',
    description:
      '查看云码智创科技在能源管理、物联网、CRM、AI应用、Web3金融、数据大屏、企业软件场景中的产品实践。',
    canonical: '/cases',
  })

const caseLinks = [
  { href: '#energy', label: '能源管理' },
  { href: '#iot', label: 'IoT 物联网' },
  { href: '#crm', label: 'CRM 系统' },
  { href: '#lifestyle', label: '娱乐与旅游' },
  { href: '#ai', label: 'AI 应用' },
  { href: '#data-screen', label: '数据可视化大屏' },
  { href: '#web3', label: 'Web3 金融' },
]

function CaseHeading({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string[]
}) {
  return (
    <header className="case-showcase-heading">
      <div className="case-showcase-heading-title">
        <span aria-hidden="true">{index}</span>
        <h2>{title}</h2>
      </div>
      <div className="case-showcase-heading-copy">
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </header>
  )
}

export default async function CasesPage() {
  const settings = await getSiteSettings()

  return (
    <main className="marketing-page inner-story">
      <JsonLd
        data={buildPageJsonLd({
          description:
            '查看云码智创科技在能源管理、物联网、CRM、AI应用、Web3金融、数据大屏、企业软件场景中的产品实践。',
          name: '案例',
          path: '/cases',
          settings,
          type: 'CollectionPage',
        })}
      />
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

      <section className="case-showcase" aria-label="案例内容">
        <CaseShowcaseNav links={caseLinks} />

        <div className="site-container case-showcase-list">
          <article className="case-showcase-item" id="energy">
            <CaseHeading
              index="01"
              title="能源管理系统"
              description={[
                '围绕发电、储能、负载与充电设备，统一连接分散的能源数据。',
                '网页端聚合设备状态、运行告警与专业参数，支持集中管理。',
                '移动端呈现家庭能源流向、实时功率与收益，便于随时掌握。',
                '从设备接入到运营分析，形成清晰、可追踪的能源管理闭环。',
              ]}
            />
            <div className="case-stage case-stage-energy">
              <Image
                alt="能源管理系统网页端与移动端产品界面"
                className="case-energy-composite"
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/energy-management-web-app-a-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="iot">
            <CaseHeading
              index="02"
              title="IoT 物联网平台"
              description={[
                '围绕家庭设备的连接、状态与自动化，统一组织多端使用路径。',
                '网页端集中管理设备、空间与运行状态，降低复杂系统的操作负担。',
                '移动端承载实时控制、模式设置与提醒，让日常使用更加直接。',
              ]}
            />
            <div className="case-stage case-stage-iot">
              <Image
                alt="IoT 物联网平台网页端与两组移动端产品界面"
                className="case-iot-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/iot-web-app-b-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="crm">
            <CaseHeading
              index="03"
              title="CRM 系统"
              description={[
                '围绕客户、商机与销售过程，建立统一的信息管理与协作路径。',
                '销售管道清晰呈现阶段、金额与推进状态，便于团队持续跟进。',
                '分析报表汇总线索来源与销售表现，为经营判断提供直观依据。',
              ]}
            />
            <div className="case-stage case-stage-crm">
              <Image
                alt="CRM 分析报表与销售管道双网页界面"
                className="case-crm-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/crm-double-web-layered-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="lifestyle">
            <CaseHeading
              index="04"
              title="娱乐与旅游"
              description={[
                '以兴趣内容和本地活动为入口，帮助用户发现并参与真实社交场景。',
                '旅行助手整合目的地推荐、行程灵感与服务信息，缩短决策路径。',
                '两类移动体验均强调内容浏览、即时互动与轻量化操作。',
              ]}
            />
            <div className="case-stage case-stage-lifestyle">
              <Image
                alt="娱乐交友与旅行双应用产品界面"
                className="case-lifestyle-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/lifestyle-double-app-a-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="ai">
            <CaseHeading
              index="05"
              title="AI 应用"
              description={[
                '将智能对话接入客服、学习与日常业务流程，形成可直接使用的能力。',
                '网页端支持连续问答、知识检索与上下文理解，提升信息处理效率。',
                '移动端以语音交互和即时反馈构建自然、低负担的练习体验。',
              ]}
            />
            <div className="case-stage case-stage-ai">
              <Image
                alt="AI 智能客服网页端与英语练习移动端界面"
                className="case-ai-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/ai-web-app-a-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="data-screen">
            <CaseHeading
              index="06"
              title="数据可视化大屏"
              description={[
                '把设备状态、运行趋势与关键告警集中呈现在同一视野。',
                '通过分区信息结构梳理复杂指标，帮助使用者快速识别重点变化。',
                '适用于运营监控、设备管理与现场决策等需要持续关注的场景。',
              ]}
            />
            <div className="case-stage case-stage-dashboard">
              <Image
                alt="工业能源运营数据大屏产品界面"
                className="case-dashboard-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/data-screen-a-v1.png"
              />
            </div>
          </article>

          <Separator className="case-showcase-separator" />

          <article className="case-showcase-item" id="web3">
            <CaseHeading
              index="07"
              title="Web3 金融"
              description={[
                '以清晰的信息层级承载账户、资产与交易体验，降低信息理解成本。',
                '资产平台集中呈现余额、资金流向与关键指标，支持快速查看。',
                '钱包页面保持一致的深色视觉语言，让连接与操作路径更加连贯。',
              ]}
            />
            <div className="case-stage case-stage-web3">
              <Image
                alt="Web3 金融资产管理与钱包连接双网页界面"
                className="case-web3-composite"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 1200px"
                src="/media/cases/web3-double-web-a-v1.png"
              />
            </div>
          </article>

          <section className="case-showcase-contact" aria-labelledby="case-contact-title">
            <div>
              <h2 id="case-contact-title">还有更多案例，欢迎咨询</h2>
              <p>告诉我们你的业务目标，我们会提供更接近真实项目的参考。</p>
            </div>
            <Button asChild className="case-showcase-contact-link" size="clear" variant="link">
              <Link href="/contact">
                更多案例请咨询
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </section>
        </div>
      </section>
    </main>
  )
}
