import 'server-only'

import { caseArticles } from '@/data/caseArticles'
import { faqs, navigation, scenarios, services } from '@/data/site'

import type { SiteSearchResult, SiteSearchResultType } from './types'

type SearchableSiteEntry = SiteSearchResult & {
  searchText: string
}

const pageDescriptions: Record<string, string> = {
  '/': '了解无锡寻光数字科技的软件定制、产品设计、技术开发与持续服务能力。',
  '/about': '了解团队的研发经验、交付方法、合作原则与持续服务能力。',
  '/cases': '浏览能源、物联网、企业管理、AI、数据可视化与 Web3 等项目实践。',
  '/contact': '提交项目需求，与无锡寻光数字科技讨论范围、路径、周期与合作方式。',
  '/faq': '查找项目启动、技术选型、周期费用、质量保障、系统集成与运维相关解答。',
  '/services': '查看软件定制、APP、小程序、AI 应用开发及行业数字化解决方案。',
}

const pageKeywords: Record<string, string> = {
  '/': '寻光数字科技 官网 软件公司 无锡 数字化 产品设计 技术开发',
  '/about': '公司 团队 研发 项目交付 技术支持 合作原则',
  '/cases': '案例 项目 作品 能源 IoT CRM AI Web3 数据大屏',
  '/contact': '联系 咨询 报价 项目需求 邮箱 微信 合作',
  '/faq': '常见问题 周期 费用 技术栈 运维 质量 沟通 对接',
  '/services': '服务 软件定制 APP 小程序 AI 网站 系统开发 行业方案',
}

const createEntry = ({
  description,
  href,
  id,
  keywords = '',
  searchText = '',
  section,
  title,
  type,
}: SiteSearchResult & { keywords?: string; searchText?: string }): SearchableSiteEntry => ({
  description,
  href,
  id,
  searchText: [title, description, keywords, searchText].join(' '),
  section,
  title,
  type,
})

const pageEntries = navigation.map((item) =>
  createEntry({
    description: pageDescriptions[item.href] || '浏览无锡寻光数字科技官网内容。',
    href: item.href,
    id: `page:${item.href}`,
    keywords: pageKeywords[item.href],
    section: '网站页面',
    title: item.label,
    type: 'page',
  }),
)

pageEntries.push(
  createEntry({
    description: '阅读软件开发、能源管理、IoT、企业 AI 与数字化产品的实践文章。',
    href: '/posts',
    id: 'page:/posts',
    keywords: '文章 洞察 方法 指南 博客 产品实践',
    section: '网站页面',
    title: '文章与产品实践',
    type: 'page',
  }),
)

const serviceEntries = services.map((service) =>
  createEntry({
    description: service.description,
    href: '/services#services-capability-title',
    id: `service:${service.title}`,
    keywords: '产品设计 前端 后端 移动端 系统集成 部署运维',
    section: '服务能力',
    title: service.title,
    type: 'service',
  }),
)

const solutionEntries = scenarios.map((scenario) =>
  createEntry({
    description: scenario.description,
    href: '/services#service-industries-title',
    id: `solution:${scenario.title}`,
    keywords: '行业方案 数字化转型 平台建设',
    section: '行业解决方案',
    title: scenario.title,
    type: 'solution',
  }),
)

const articleEntries = caseArticles.map((article) => {
  const articleBody = [
    ...article.intro,
    ...article.takeaways,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.points || []),
    ]),
    ...article.faq.flatMap((item) => [item.question, item.answer]),
  ].join(' ')

  return createEntry({
    description: article.description,
    href: `/posts/${article.slug}`,
    id: `article:${article.slug}`,
    keywords: [article.category, ...article.keywords].join(' '),
    searchText: articleBody,
    section: '案例与文章',
    title: article.title,
    type: 'article',
  })
})

const faqEntries = faqs.map((faq, index) =>
  createEntry({
    description: faq.answer,
    href: '/faq#faq-content-title',
    id: `faq:${index}`,
    keywords: '常见问题 合作咨询',
    section: '常见问题',
    title: faq.question,
    type: 'faq',
  }),
)

const siteIndex: SearchableSiteEntry[] = [
  ...pageEntries,
  ...serviceEntries,
  ...solutionEntries,
  ...articleEntries,
  ...faqEntries,
]

const featuredIds = [
  'page:/services',
  'page:/cases',
  'page:/about',
  'page:/contact',
  'service:软件定制开发',
  'service:AI 应用开发',
  'solution:能源管理平台',
  'solution:IoT 物联网平台',
  'article:energy-management-platform-design',
  'article:enterprise-ai-application-knowledge-workbench',
]

function normalize(value: string) {
  return value.toLocaleLowerCase('zh-CN').replace(/[\s\-_/，。；：、（）()]+/g, '')
}

function toPublicResult(entry: SearchableSiteEntry): SiteSearchResult {
  const { searchText: _searchText, ...result } = entry
  return result
}

function scoreEntry(entry: SearchableSiteEntry, query: string) {
  const normalizedQuery = normalize(query)
  const title = normalize(entry.title)
  const description = normalize(entry.description)
  const searchText = normalize(entry.searchText)

  if (!normalizedQuery) return 0
  if (title === normalizedQuery) return 120
  if (title.startsWith(normalizedQuery)) return 90
  if (title.includes(normalizedQuery)) return 72
  if (description.includes(normalizedQuery)) return 44
  if (searchText.includes(normalizedQuery)) return 24

  const terms = query.trim().split(/\s+/).map(normalize).filter(Boolean)
  if (terms.length > 1 && terms.every((term) => searchText.includes(term))) return 16
  return 0
}

export function getFeaturedSiteSearchResults(): SiteSearchResult[] {
  return featuredIds
    .map((id) => siteIndex.find((entry) => entry.id === id))
    .filter((entry): entry is SearchableSiteEntry => Boolean(entry))
    .map(toPublicResult)
}

export function searchStaticSite(query: string, limit = 30): SiteSearchResult[] {
  return siteIndex
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'zh-CN'))
    .slice(0, limit)
    .map(({ entry }) => toPublicResult(entry))
}

export const searchResultTypeLabels: Record<SiteSearchResultType, string> = {
  article: '文章',
  case: '案例',
  faq: '问答',
  page: '页面',
  service: '服务',
  solution: '方案',
}
