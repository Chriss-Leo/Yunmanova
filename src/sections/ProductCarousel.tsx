'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

type ProductSlide = {
  description: string
  image: string
  imageAlt: string
  imageZoom?: 'soft' | 'strong'
  title: string
}

const productSlides: ProductSlide[] = [
  {
    description: '覆盖筹款、捐赠人与项目运营的全流程管理',
    image: '/media/products/fundraising-crm-cn.png',
    imageAlt: '安和公益 CRM 中文筹款项目管理界面',
    imageZoom: 'soft',
    title: '公益筹款 CRM',
  },
  {
    description: '汇集账户、资金流向与经营数据，辅助财务决策',
    image: '/media/products/finance-dashboard-cn.png',
    imageAlt: '麦格智融中文智能财务管理平台界面',
    title: '智能财务平台',
  },
  {
    description: '连接灵感、行程与智能推荐的移动旅行体验',
    image: '/media/products/travel-assistant-app-cn.png',
    imageAlt: '手持手机展示中文智能旅行助手应用',
    imageZoom: 'strong',
    title: '智能旅行助手',
  },
  {
    description: '将学习路径、口语陪练与即时反馈整合为自然体验',
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
    event.currentTarget.setPointerCapture(event.pointerId)
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
              <div className="product-carousel-image">
                <Image
                  alt={slide.imageAlt}
                  className={slide.imageZoom ? `product-carousel-image-zoom-${slide.imageZoom}` : undefined}
                  draggable={false}
                  fill
                  sizes="(max-width: 767px) 88vw, (max-width: 1024px) 62vw, 680px"
                  src={slide.image}
                />
              </div>
              <div className="product-carousel-caption">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <Link
                  aria-label={`查看${slide.title}方案`}
                  className="product-carousel-card-link"
                  href="/services"
                  onClick={(event) => {
                    if (didSwipe.current) event.preventDefault()
                  }}
                  tabIndex={isActive ? 0 : -1}
                >
                  <ArrowRight aria-hidden="true" size={23} />
                </Link>
              </div>
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
