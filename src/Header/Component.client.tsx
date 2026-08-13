'use client'

import { List, X } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { navigation } from '@/data/site'

export function HeaderClient({ siteName }: { siteName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" aria-label={`${siteName}首页`} className="brand-link">
          <Logo loading="eager" priority="high" className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          {navigation
            .filter((item) => item.href !== '/contact')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <Link href="/contact" className="header-cta">
          联系我们
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
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
