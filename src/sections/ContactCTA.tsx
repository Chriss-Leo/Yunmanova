import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="contact-cta-section">
      <div className="site-container contact-cta">
        <div>
          <h2>从业务问题开始，找到可执行的软件方案</h2>
          <p>告诉我们你的目标、现状和约束，我们会一起梳理下一步。</p>
        </div>
        <Link className="button button-light" href="/contact">
          联系我们 <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
