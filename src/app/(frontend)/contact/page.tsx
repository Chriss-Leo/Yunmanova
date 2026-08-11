import type { Metadata } from 'next'
import { EnvelopeSimple, MapPin, WechatLogo } from '@phosphor-icons/react/dist/ssr'
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
              <a href="mailto:chrisleo.yu.cn@gmail.com">
                <span className="inner-contact-method-icon">
                  <EnvelopeSimple size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>电子邮箱</small>chrisleo.yu.cn@gmail.com
                </span>
              </a>
              <div>
                <span className="inner-contact-method-icon">
                  <WechatLogo size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>微信联系</small>Chris_Leo_
                </span>
              </div>
              <div>
                <span className="inner-contact-method-icon">
                  <MapPin size={20} aria-hidden="true" />
                </span>
                <span>
                  <small>服务方式</small>面向全国企业提供远程与现场协作
                </span>
              </div>
            </div>
            <figure className="inner-contact-qr">
              <div className="inner-contact-qr-image">
                <Image
                  src="/media/wechat-qr-chris.jpg"
                  alt="微信二维码，添加 Chris_Leo_"
                  fill
                  sizes="112px"
                />
              </div>
              <figcaption>
                <strong>微信扫码咨询</strong>
                <small>添加微信 Chris_Leo_</small>
              </figcaption>
            </figure>
          </header>
          <div className="contact-form-laptop">
            <span className="contact-form-laptop-camera" aria-hidden="true" />
            <div className="contact-form-laptop-screen">
              <ContactForm />
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
