import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { Logo } from '@/components/Logo/Logo'
import { navigation } from '@/data/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p>以清晰的产品方法和可靠的工程能力，把企业业务目标转化为可持续演进的软件系统。</p>
        </div>

        <div>
          <h2>网站导航</h2>
          <nav className="footer-nav" aria-label="页脚导航">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-contact">
          <h2>直接联系</h2>
          <a href="mailto:chrisleo.yu.cn@gmail.com">
            <EnvelopeSimple size={20} />
            chrisleo.yu.cn@gmail.com
          </a>
          <div className="wechat-placeholder" aria-label="微信二维码待替换">
            <span>微信二维码</span>
            <small>请替换为本人二维码</small>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} 云码智创科技</span>
        <span>企业软件定制与数字化产品开发</span>
      </div>
    </footer>
  )
}
