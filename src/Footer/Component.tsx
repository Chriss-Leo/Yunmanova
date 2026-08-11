import { ArrowRight, EnvelopeSimple, MapPin, WechatLogo } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
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
                <small>微信咨询</small>Chris_Leo_
              </span>
            </div>
            <a href="mailto:chrisleo.yu.cn@gmail.com">
              <EnvelopeSimple size={21} />
              <span>
                <small>邮箱咨询</small>chrisleo.yu.cn@gmail.com
              </span>
            </a>
            <div>
              <MapPin size={21} />
              <span>
                <small>服务范围</small>面向全国企业客户提供远程与现场协作
              </span>
            </div>
          </div>
          <figure className="ref-contact-qr">
            <div className="ref-contact-qr-image">
              <Image
                src="/media/wechat-qr-chris.jpg"
                alt="微信二维码，添加 Chris_Leo_"
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
          <span>© {new Date().getFullYear()} 云码智创科技 版权所有</span>
          <div>
            <Link href="/privacy">隐私政策</Link>
            <Link href="/terms">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
