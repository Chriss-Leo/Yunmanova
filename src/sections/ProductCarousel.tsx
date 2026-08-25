'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

type ProductSlide = {
  description: string
  href: string
  image: string
  imageAlt: string
  imageZoom?: 'soft' | 'strong'
  title: string
}

const productSlides: ProductSlide[] = [
  {
    description: '聚合储能、光伏、充电桩与可调负荷，贯通预测、调度、交易和结算',
    href: '/cases#vpp',
    image: '/media/products/vpp-operations-workstation-v1.png',
    imageAlt: '专业能源运营工作站展示虚拟电厂平台，周围配置储能柜、工业控制设备与光伏组件',
    title: '虚拟电厂运营平台',
  },
  {
    description: '连接灵感、行程与智能推荐的移动旅行体验',
    href: '/cases#lifestyle',
    image: '/media/products/travel-assistant-app-cn.png',
    imageAlt: '手持手机展示中文智能旅行助手应用',
    imageZoom: 'strong',
    title: '智能旅行助手',
  },
  {
    description: '统一客户、商机与销售分析，让业务进展清晰可追踪',
    href: '/cases#crm',
    image: '/ui/products/yunlian-crm-macbook-v1.png',
    imageAlt: '银色 MacBook Pro 展示云联 CRM 中文销售分析界面',
    title: '智能CRM系统',
  },
  {
    description: '汇集账户、资金流向与经营数据，辅助财务决策',
    href: '/cases#web3',
    image: '/ui/products/finance-dashboard-chrome-v1.png',
    imageAlt: 'Google Chrome 浏览器窗口展示麦格智融中文智能财务管理平台',
    title: '智能财务平台',
  },
  {
    description: '将学习路径、口语陪练与即时反馈整合为自然体验',
    href: '/cases#ai',
    image: '/media/products/ai-english-learning-app-cn-bg.png',
    imageAlt: '三台手机展示中文 AI 英语学习助手应用',
    title: 'AI 英语学习助手',
  },
]

type SlidePosition = 'active' | 'hidden' | 'next' | 'previous'

function getSlidePosition(index: number, activeIndex: number): SlidePosition {
  if (index === activeIndex) return 'active'
  if (index === (activeIndex + 1) % productSlides.length) return 'next'
  if (index === (activeIndex - 1 + productSlides.length) % productSlides.length) return 'previous'

  return 'hidden'
}

export function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const didSwipe = useRef(false)
  const pointerStartX = useRef<number | null>(null)

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + productSlides.length) % productSlides.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % productSlides.length)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      showPrevious()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      showNext()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    didSwipe.current = false
    pointerStartX.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return

    const distance = event.clientX - pointerStartX.current
    pointerStartX.current = null

    if (Math.abs(distance) < 48) return
    didSwipe.current = true
    if (distance > 0) showPrevious()
    else showNext()
  }

  return (
    <div
      className="product-carousel"
      aria-label="产品方案轮播"
      aria-roledescription="轮播"
      onKeyDown={handleKeyDown}
    >
      <div
        className="product-carousel-viewport"
        onPointerCancel={() => {
          pointerStartX.current = null
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onDragStart={(event) => event.preventDefault()}
        tabIndex={0}
      >
        {productSlides.map((slide, index) => {
          const position = getSlidePosition(index, activeIndex)
          const isActive = position === 'active'

          return (
            <article
              aria-hidden={!isActive}
              aria-label={`${index + 1} / ${productSlides.length}，${slide.title}`}
              aria-roledescription="幻灯片"
              className="product-carousel-card"
              data-position={position}
              key={slide.title}
              role="group"
            >
              <a
                aria-label={`查看${slide.title}案例`}
                className="product-carousel-card-hitarea"
                href={slide.href}
                onClick={(event) => {
                  if (!didSwipe.current) return

                  event.preventDefault()
                  didSwipe.current = false
                }}
                tabIndex={isActive ? 0 : -1}
              >
                <div className="product-carousel-image">
                  <Image
                    alt={slide.imageAlt}
                    className={
                      slide.imageZoom ? `product-carousel-image-zoom-${slide.imageZoom}` : undefined
                    }
                    draggable={false}
                    fill
                    sizes="(max-width: 767px) 88vw, (max-width: 1024px) 62vw, 680px"
                    src={slide.image}
                  />
                </div>
                <div className="product-carousel-caption">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <span className="product-carousel-card-link" aria-hidden="true">
                    <ArrowRight size={23} />
                  </span>
                </div>
              </a>
            </article>
          )
        })}
      </div>

      <div className="product-carousel-controls">
        <div className="product-carousel-progress" aria-live="polite">
          <span className="product-carousel-count">
            <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
            <span>/ {String(productSlides.length).padStart(2, '0')}</span>
          </span>
          <span className="product-carousel-track" aria-hidden="true">
            <span style={{ transform: `scaleX(${(activeIndex + 1) / productSlides.length})` }} />
          </span>
        </div>

        <div className="product-carousel-buttons" aria-label="轮播控制">
          <button aria-label="上一个产品方案" onClick={showPrevious} type="button">
            <ArrowLeft aria-hidden="true" size={20} />
          </button>
          <button aria-label="下一个产品方案" onClick={showNext} type="button">
            <ArrowRight aria-hidden="true" size={20} />
          </button>
        </div>

        <Link className="product-carousel-all" href="/services">
          查看全部方案 <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </div>
  )
}
