import Image from 'next/image'

import { PageHero } from '@/components/site/PageHero'
import { Separator } from '@/components/ui/separator'
import { processSteps } from '@/data/site'
import { JsonLd } from '@/components/site/JsonLd'
import { buildPageJsonLd, generateSiteMetadata } from '@/utilities/seo'
import { getSiteSettings } from '@/utilities/siteSettings'

import { AboutProofMetrics } from './AboutProofMetrics'

export const generateMetadata = () =>
  generateSiteMetadata({
    title: '关于我们',
    description: '了解无锡寻光数字科技的产品方法、工程原则与企业软件开发合作方式。',
    canonical: '/about',
  })

const processIcons = ['discovery', 'planning', 'development', 'testing', 'iteration']

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <main className="marketing-page inner-story">
      <JsonLd
        data={buildPageJsonLd({
          description: '了解无锡寻光数字科技的产品方法、工程原则与企业软件开发合作方式。',
          name: '关于我们',
          path: '/about',
          settings,
          type: 'AboutPage',
        })}
      />
      <PageHero
        title={
          <>
            从需求到上线，
            <br />
            认真完成每一个系统
          </>
        }
        description={
          <>
            无锡寻光数字科技专注企业软件与数字化产品开发，
            <br />
            重视业务理解、技术质量与长期合作。
          </>
        }
        image="/media/hero-about-office-architecture-v1.jpg"
        imageAlt="现代办公建筑群与城市天际线"
        variant="split"
        secondaryHref="/cases"
        secondaryLabel="查看案例"
      />

      <div className="inner-about-content">
        <AboutProofMetrics />

        <section className="inner-about-story" aria-labelledby="about-story-title">
          <div className="site-container inner-about-story-layout">
            <div className="inner-about-story-heading">
              <h2 id="about-story-title">
                可靠的软件，
                <br />
                始于对问题的共同理解
              </h2>
              <div className="inner-about-story-copy">
                <p>
                  业务、产品、设计和工程需要在同一目标下协作。我们先把问题说清楚，再用合适的技术把它解决。
                </p>
                <p>
                  关键决策、阶段成果与风险保持透明。系统上线不是结束，而是进入真实业务并持续演进的开始。
                </p>
              </div>
            </div>
            <figure className="inner-about-story-visual">
              <Image
                src="/media/about-product-collaboration-v1.png"
                alt="产品、设计和工程团队围绕同一套软件流程协作"
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), 610px"
                className="inner-about-story-image"
              />
            </figure>
          </div>
        </section>

        <Separator className="site-container" />

        <section className="inner-about-process-section" aria-labelledby="about-process-title">
          <div className="site-container">
            <div className="inner-about-process-heading">
              <h2 id="about-process-title">从需求到价值的确定路径</h2>
              <p>每一步都有明确目标和可见成果，让产品稳定进入真实业务。</p>
            </div>
            <ol className="inner-about-process">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <div className="inner-about-process-mark">
                    <span className="inner-about-process-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Image
                      src={`/media/process-icons/${processIcons[index]}.png`}
                      alt={`${step.title}阶段示意图`}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="inner-about-process-copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
