import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export function PageHero({
  title,
  description,
  backplate,
  image,
  imageAlt,
  imageFit = 'cover',
  variant = 'split',
  secondaryHref,
  secondaryLabel,
}: {
  title: ReactNode
  description: ReactNode
  backplate?: string
  image: string
  imageAlt: string
  imageFit?: 'contain' | 'cover'
  variant?: 'dark' | 'split'
  secondaryHref?: string
  secondaryLabel?: string
}) {
  return (
    <section className={`inner-page-hero inner-page-hero--${variant}`}>
      <Image
        alt={imageAlt}
        className={`inner-page-hero-image inner-page-hero-image--${imageFit}`}
        fill
        priority
        sizes="100vw"
        src={image}
      />
      <div className="inner-page-hero-scrim" />
      <div className="site-container inner-page-hero-inner">
        <div className="inner-page-hero-copy">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="inner-page-hero-actions">
            <Link className="button button-primary" href="/contact">
              联系我们 <ArrowRight aria-hidden="true" size={17} />
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link className="inner-text-link" href={secondaryHref}>
                {secondaryLabel} <ArrowRight aria-hidden="true" size={16} />
              </Link>
            )}
          </div>
          {backplate && <span className="inner-page-hero-note">{backplate}</span>}
        </div>
      </div>
    </section>
  )
}
