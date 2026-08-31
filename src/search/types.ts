export type SiteSearchResultType = 'page' | 'service' | 'solution' | 'case' | 'article' | 'faq'

export type SiteSearchResult = {
  description: string
  href: string
  id: string
  section: string
  title: string
  type: SiteSearchResultType
}
