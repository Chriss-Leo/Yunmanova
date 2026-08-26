import { ArrowRight, EnvelopeSimple, MapPin, WechatLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCMSLinkHref } from '@/utilities/cmsLink'

export async function Footer() {
  const [settings, footer] = await Promise.all([getSiteSettings(), getCachedGlobal('footer', 1)()])
  const siteName = settings.siteName || defaultSiteSettings.siteName
  const email = settings.contact?.email || defaultSiteSettings.contact.email
  const wechat = settings.contact?.wechat || defaultSiteSettings.contact.wechat
  const serviceArea = settings.contact?.serviceArea || defaultSiteSettings.contact.serviceArea
  const qrCode =
    settings.contact?.wechatQRCode && typeof settings.contact.wechatQRCode === 'object'
      ? settings.contact.wechatQRCode.url
      : '/media/wechat-qr-chris.png'
  const footerLinks = (footer.navItems || [])
    .map(({ id, link }) => ({ href: getCMSLinkHref(link), id, link }))
    .filter((item): item is typeof item & { href: string } => Boolean(item.href))
  return (
    <footer className="site-footer ref-contact" aria-labelledby="site-footer-title">
      <Image src="/media/forest-contact-panorama.png" alt="森林与山脉景观" fill sizes="100vw" />
      <div className="ref-contact-scrim" />
      <div className="site-container ref-contact-inner">
        <div className="ref-contact-copy">
          <h2 id="site-footer-title">准备好一起创造价值了吗？</h2>
          <p>无论你有明确需求，还是正在探索方向，我们都乐意成为你的技术伙伴。</p>
          <Link className="button button-light" href="/contact">
            联系我们 <ArrowRight size={17} />
          </Link>
        </div>
        <div className="ref-contact-channels">
          <div className="ref-contact-details">
            <div>
              <WechatLogo size={21} />
              <span>
                <small>微信咨询</small>
                {wechat}
              </span>
            </div>
            <a href={`mailto:${email}`}>
              <EnvelopeSimple size={21} />
              <span>
                <small>邮箱咨询</small>
                {email}
              </span>
            </a>
            <div>
              <MapPin size={21} />
              <span>
                <small>服务范围</small>
                {serviceArea}
              </span>
            </div>
          </div>
          <figure className="ref-contact-qr">
            <div className="ref-contact-qr-image">
              <Image
                src={qrCode || '/media/wechat-qr-chris.png'}
                alt={`微信二维码，添加 ${wechat}`}
                fill
                sizes="128px"
              />
            </div>
            <figcaption>微信扫码咨询</figcaption>
          </figure>
        </div>
      </div>
      <div className="ref-legal-footer">
        <div className="site-container">
          <span>
            © {new Date().getFullYear()} {siteName} 版权所有
          </span>
          <div>
            <a href="https://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">
              苏ICP备2026061651号-1
            </a>
            {footerLinks.map(({ href, id, link }) => (
              <Link
                href={href}
                key={id || `${link.label}-${href}`}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                target={link.newTab ? '_blank' : undefined}
              >
                {link.label}
              </Link>
            ))}
            {footerLinks.length === 0 && (
              <>
                <Link href="/privacy">隐私政策</Link>
                <Link href="/terms">服务条款</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
