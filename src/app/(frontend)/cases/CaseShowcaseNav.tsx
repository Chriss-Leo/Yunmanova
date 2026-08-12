'use client'

import { useEffect, useRef, useState } from 'react'

import { Separator } from '@/components/ui/separator'

export type CaseShowcaseLink = {
  href: string
  label: string
}

export function CaseShowcaseNav({ links }: { links: CaseShowcaseLink[] }) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? '')
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>())

  useEffect(() => {
    let frame = 0
    let settleTimer = 0

    const scrollToCurrentHash = () => {
      const hash = decodeURIComponent(window.location.hash)
      if (!hash || !links.some((link) => link.href === hash)) return

      const target = document.querySelector<HTMLElement>(hash)
      if (!target) return

      setActiveHref(hash)
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    }

    const scheduleHashScroll = () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)

      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(scrollToCurrentHash)
      })
      settleTimer = window.setTimeout(scrollToCurrentHash, 300)
    }

    scheduleHashScroll()
    window.addEventListener('hashchange', scheduleHashScroll)
    window.addEventListener('pageshow', scheduleHashScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(settleTimer)
      window.removeEventListener('hashchange', scheduleHashScroll)
      window.removeEventListener('pageshow', scheduleHashScroll)
    }
  }, [links])

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveHref(`#${visible.target.id}`)
      },
      { rootMargin: '-22% 0px -56% 0px', threshold: [0.05, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [links])

  useEffect(() => {
    itemRefs.current.get(activeHref)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeHref])

  return (
    <nav className="case-showcase-nav" aria-label="案例快速导航">
      <div className="site-container case-showcase-nav-layout">
        <p className="case-showcase-nav-title">浏览案例</p>
        <Separator className="case-showcase-nav-separator" orientation="vertical" />
        <div className="case-showcase-nav-viewport">
          <div className="case-showcase-nav-inner">
            {links.map((item) => (
              <a
                aria-current={activeHref === item.href ? 'location' : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setActiveHref(item.href)}
                ref={(node) => {
                  if (node) itemRefs.current.set(item.href, node)
                  else itemRefs.current.delete(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
