import { EnvelopeSimple, MapPin, WechatLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { ContactForm } from '@/components/site/ContactForm'
import { JsonLd } from '@/components/site/JsonLd'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { getServerSideURL } from '@/utilities/getURL'
import { buildPageJsonLd, generateSiteMetadata } from '@/utilities/seo'

const seoDescription =
  '联系云码智创科技，咨询软件定制、网站、APP、小程序、AI应用、Web3金融、数据大屏与企业数字化平台开发。'

export const generateMetadata = () =>
  generateSiteMetadata({ title: '联系我们', description: seoDescription, canonical: '/contact' })

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const siteName = settings.siteName || defaultSiteSettings.siteName
  const brandDescription = settings.brandDescription || defaultSiteSettings.brandDescription
  const email = settings.contact?.email || defaultSiteSettings.contact.email
  const wechat = settings.contact?.wechat || defaultSiteSettings.contact.wechat
  const serviceArea = settings.contact?.serviceArea || defaultSiteSettings.contact.serviceArea
  const qrCode =
    settings.contact?.wechatQRCode && typeof settings.contact.wechatQRCode === 'object'
      ? settings.contact.wechatQRCode.url
      : '/media/wechat-qr-chris.jpg'
  const brandID = `${new URL('/', getServerSideURL()).toString()}#brand`

  return (
    <main className="marketing-page inner-story inner-contact-page">
      <JsonLd
        data={buildPageJsonLd({
          description: seoDescription,
          name: `联系${siteName}`,
          mainEntity: {
            '@type': 'Brand',
            '@id': brandID,
            name: siteName,
            description: brandDescription,
          },
          path: '/contact',
          settings,
          type: 'ContactPage',
        })}
      />
      <section className="inner-contact-section">
        <div className="site-container inner-contact-shell">
          <header className="inner-contact-intro">
            <h1>告诉我们，你正在解决什么业务问题</h1>
            <p>
              不需要先准备完整需求文档。
              <br />
              说明目标、现状和约束，我们会从最关键的问题开始沟通。
            </p>
            <div className="inner-contact-methods">
              <a href={`mailto:${email}`}>
                <span className="inner-contact-method-icon">
                  <EnvelopeSimple size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>电子邮箱</small>
                  {email}
                </span>
              </a>
              <div>
                <span className="inner-contact-method-icon">
                  <WechatLogo size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>微信联系</small>
                  {wechat}
                </span>
              </div>
              <div>
                <span className="inner-contact-method-icon">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>服务方式</small>
                  {serviceArea}
                </span>
              </div>
            </div>
            <figure className="inner-contact-qr">
              <div className="inner-contact-qr-image">
                <Image
                  src={qrCode || '/media/wechat-qr-chris.jpg'}
                  alt={`微信二维码，添加 ${wechat}`}
                  fill
                  sizes="112px"
                />
              </div>
              <figcaption>
                <strong>微信扫码咨询</strong>
                <small>添加微信 {wechat}</small>
              </figcaption>
            </figure>
          </header>
          <div className="contact-form-laptop">
            <span className="contact-form-laptop-camera" aria-hidden="true" />
            <div className="contact-form-laptop-screen">
              <ContactForm email={email} />
            </div>
            <div className="contact-form-laptop-base" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
