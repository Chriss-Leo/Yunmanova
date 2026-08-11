import type { Metadata } from 'next'
import { EnvelopeSimple, WechatLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { ContactForm } from '@/components/site/ContactForm'
import { JsonLd } from '@/components/site/JsonLd'

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系云码智创科技，咨询软件定制、APP、小程序、AI应用与企业数字化平台开发。',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main className="marketing-page inner-story inner-contact-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: '联系云码智创科技',
          mainEntity: {
            '@type': 'Organization',
            name: '云码智创科技',
            email: 'chrisleo.yu.cn@gmail.com',
          },
        }}
      />
      <section className="inner-contact-hero">
        <Image
          src="/media/forest-contact-panorama.png"
          alt="森林与山谷景观"
          fill
          priority
          sizes="100vw"
          className="inner-contact-hero-image"
        />
        <div className="inner-contact-hero-scrim" />
        <div className="site-container inner-contact-shell">
          <div className="inner-contact-intro">
            <p className="inner-section-kicker">联系我们</p>
            <h1>告诉我们，你正在解决什么业务问题</h1>
            <p>不需要先准备完整需求文档。说明目标、现状和约束，我们会从最关键的问题开始沟通。</p>
            <div className="inner-contact-methods">
              <a href="mailto:chrisleo.yu.cn@gmail.com">
                <EnvelopeSimple size={25} weight="regular" aria-hidden="true" />
                <span><small>电子邮箱</small>chrisleo.yu.cn@gmail.com</span>
              </a>
              <div>
                <WechatLogo size={25} weight="regular" aria-hidden="true" />
                <span><small>微信联系</small>二维码待提供</span>
              </div>
            </div>
            <div className="inner-contact-qr">
              <span>微信二维码</span>
              <small>请替换为本人二维码图片</small>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
