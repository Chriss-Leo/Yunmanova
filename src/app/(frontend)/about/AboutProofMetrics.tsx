'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const metrics = [
  {
    value: 10,
    suffix: '+',
    label: '研发经验',
    description: '十年以上技术沉淀',
    icon: '/ui/about/research-experience-v1.png',
  },
  {
    value: 50,
    suffix: '+',
    label: '项目交付',
    description: '成功交付各类项目',
    icon: '/ui/about/project-delivery-v1.png',
  },
  {
    value: 20,
    suffix: '+',
    label: '行业场景',
    description: '覆盖多个行业领域',
    icon: '/ui/about/industry-scenarios-v1.png',
  },
  {
    value: 24,
    prefix: '7×',
    label: '技术支持',
    description: '全天候技术服务',
    icon: '/ui/about/technical-support-v1.png',
  },
]

export function AboutProofMetrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [displayValues, setDisplayValues] = useState(() => metrics.map(({ value }) => value))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        observer.disconnect()
        const startedAt = performance.now()
        const duration = 900

        setDisplayValues(metrics.map(() => 0))
        setHasAnimated(true)

        const update = (now: number) => {
          const elapsed = now - startedAt
          const nextValues = metrics.map(({ value }, index) => {
            const delayedProgress = Math.min(1, Math.max(0, (elapsed - index * 70) / duration))
            const easedProgress = 1 - Math.pow(1 - delayedProgress, 4)

            return Math.round(value * easedProgress)
          })

          setDisplayValues(nextValues)

          if (nextValues.some((value, index) => value < metrics[index]!.value)) {
            window.requestAnimationFrame(update)
          }
        }

        window.requestAnimationFrame(update)
      },
      { threshold: 0.3 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`inner-about-proof${hasAnimated ? ' inner-about-proof--animated' : ''}`}
      aria-labelledby="about-proof-title"
      ref={sectionRef}
    >
      <div className="site-container">
        <header className="inner-about-proof-heading">
          <h2 id="about-proof-title">用数据证明实力</h2>
          <div className="inner-about-proof-intro">
            <p>专业 · 可靠 · 值得信赖</p>
            <p>长期投入、稳定交付与持续服务，是每一次合作可以被验证的基础。</p>
          </div>
        </header>

        <div className="inner-about-proof-metrics">
          {metrics.map((metric, index) => (
            <article className="inner-about-proof-metric" key={metric.label}>
              <div
                className="inner-about-proof-value"
                aria-label={`${metric.prefix || ''}${metric.value}${metric.suffix || ''}`}
              >
                <span aria-hidden="true">
                  {metric.prefix}
                  {displayValues[index]}
                  {metric.suffix}
                </span>
              </div>
              <Image
                alt=""
                aria-hidden="true"
                className="inner-about-proof-icon"
                height={48}
                src={metric.icon}
                width={48}
              />
              <h3>{metric.label}</h3>
              <p>{metric.description}</p>
            </article>
          ))}
        </div>

        <p className="inner-about-proof-closing">用专业赢得信任 · 用服务创造价值</p>
      </div>
    </section>
  )
}
