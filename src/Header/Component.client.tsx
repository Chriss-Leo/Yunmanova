'use client'

import { List, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import type { Header } from '@/payload-types'
import { navigation } from '@/data/site'
import { getCMSLinkHref } from '@/utilities/cmsLink'

export function HeaderClient({
  navItems,
  siteName,
}: {
  navItems: NonNullable<Header['navItems']>
  siteName: string
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const cmsNavigation = navItems
    .map(({ link }) => ({
      href: getCMSLinkHref(link),
      label: link.label,
      newTab: Boolean(link.newTab),
    }))
    .filter((item): item is { href: string; label: string; newTab: boolean } => Boolean(item.href))
  const cmsNavigationByHref = new Map(cmsNavigation.map((item) => [item.href, item]))
  const coreNavigation = navigation.map((item) => ({
    ...item,
    ...cmsNavigationByHref.get(item.href),
    newTab: cmsNavigationByHref.get(item.href)?.newTab || false,
  }))
  const customNavigation = cmsNavigation.filter(
    (item) => !navigation.some((defaultItem) => defaultItem.href === item.href),
  )
  const navigationItems = [
    ...coreNavigation.filter((item) => item.href !== '/contact'),
    ...customNavigation.filter((item) => item.href !== '/contact'),
    coreNavigation.find((item) => item.href === '/contact')!,
  ]
  const contactItem = navigationItems.find((item) => item.href === '/contact')

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" aria-label={`${siteName}首页`} className="brand-link">
          <Logo loading="eager" priority="high" className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {navigationItems
            .filter((item) => item.href !== '/contact')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="nav-link"
                rel={item.newTab ? 'noopener noreferrer' : undefined}
                target={item.newTab ? '_blank' : undefined}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <Link
          href={contactItem?.href || '/contact'}
          className="header-cta"
          rel={contactItem?.newTab ? 'noopener noreferrer' : undefined}
          target={contactItem?.newTab ? '_blank' : undefined}
        >
          {contactItem?.label || '联系我们'}
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="移动端主导航">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
              target={item.newTab ? '_blank' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
