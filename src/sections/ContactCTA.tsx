import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="inner-contact-close">
      <Image
        alt="森林与山脉构成的宁静自然景观"
        className="inner-contact-close-image"
        fill
        sizes="100vw"
        src="/media/forest-contact-panorama.png"
      />
      <div className="inner-contact-close-scrim" />
      <div className="site-container inner-contact-close-content">
        <div>
          <h2>从业务问题开始，找到可执行的软件方案</h2>
          <p>告诉我们你的目标、现状和约束，我们会一起梳理下一步。</p>
        </div>
        <Link className="inner-contact-close-link" href="/contact">
          联系我们 <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
