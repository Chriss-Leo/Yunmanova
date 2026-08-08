import Image from 'next/image'
import Link from 'next/link'

import { FaqList } from '@/sections/FaqList'

type MarketingBlock = Record<string, any> & { blockType: string }

export function MarketingBlockComponent({ block }: { block: MarketingBlock }) {
  if (block.blockType === 'enterpriseHero') {
    const image = typeof block.image === 'object' ? block.image : null
    return (
      <section className="page-hero">
        <div className="site-container page-hero-inner">
          <div><h1>{block.title}</h1><p>{block.description}</p></div>
          {image?.url && <Image src={image.url} alt={block.imageAlt} width={720} height={520} />}
        </div>
        {block.action?.href && <div className="site-container"><Link className="button button-primary" href={block.action.href}>{block.action.label}</Link></div>}
      </section>
    )
  }

  if (block.blockType === 'faqSection') {
    return <section className="site-container section-space"><h2>{block.title}</h2><FaqList items={block.items || []} /></section>
  }

  if (block.blockType === 'contactCTA') {
    return <section className="contact-cta-section"><div className="site-container contact-cta"><div><h2>{block.title}</h2><p>{block.description}</p></div><Link className="button button-light" href={block.action?.href || '/contact'}>{block.action?.label || '联系我们'}</Link></div></section>
  }

  const items = block.items || block.steps || block.cases || []
  return (
    <section className="site-container section-space cms-marketing-block">
      <h2>{block.title}</h2>
      {block.description && <p>{block.description}</p>}
      <div>{items.map((item: any, index: number) => <article key={item.id || index}><h3>{item.title || item.value}</h3><p>{item.description || item.summary}</p></article>)}</div>
    </section>
  )
}
