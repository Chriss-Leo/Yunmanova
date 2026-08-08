import Link from 'next/link'

export function PageHero({
  title,
  description,
  backplate,
}: {
  title: string
  description: string
  backplate?: string
}) {
  return (
    <section className="page-hero">
      <div className="site-container page-hero-inner">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {backplate && <div className="page-hero-note">{backplate}</div>}
      </div>
      <div className="site-container page-hero-actions">
        <Link className="button button-primary" href="/contact">
          联系我们
        </Link>
      </div>
    </section>
  )
}
