import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PageHero } from '@/components/site/PageHero'

import { CaseShowcaseNav } from './CaseShowcaseNav'

export const metadata: Metadata = {
  title: '案例',
  description: '查看云码智创科技在能源管理、物联网、CRM、AI 应用与企业软件场景中的产品实践。',
  alternates: { canonical: '/cases' },
}

const caseLinks = [
  { href: '#energy', label: '能源管理' },
  { href: '#iot', label: 'IoT 物联网' },
  { href: '#crm', label: 'CRM 系统' },
  { href: '#lifestyle', label: '娱乐与旅游' },
  { href: '#ai', label: 'AI 应用' },
  { href: '#data-screen', label: '数据可视化大屏' },
  { href: '#web3', label: 'Web3 金融' },
]

function CaseHeading({ title, description }: { title: string; description: string }) {
  return (
    <header className="case-showcase-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  )
}

export default function CasesPage() {
  return (
    <main className="marketing-page inner-story">
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
              title="能源管理系统"
              description="把能源生产、储能、负载与设备运行放进同一套管理路径。"
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
              title="IoT 物联网平台"
              description="围绕家庭设备的连接、状态与自动化，构建清晰可控的使用体验。"
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
              title="CRM 系统"
              description="从销售管道到分析报表，让客户推进与经营判断持续可追踪。"
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
              title="娱乐与旅游"
              description="从兴趣组局到智能行程，让内容、服务与交易自然连接。"
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
            <CaseHeading title="AI 应用" description="让智能对话进入服务、学习与日常业务流程。" />
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
              title="数据可视化大屏"
              description="把设备状态、运行趋势与关键告警集中呈现在同一视野。"
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
              title="Web3 金融"
              description="以清晰的信息层级承载账户、资产与交易体验。"
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
