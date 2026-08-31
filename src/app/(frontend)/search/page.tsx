import { ArrowUpRight, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'

import { Search } from '@/search/Component'
import { searchResultTypeLabels } from '@/search/siteIndex'
import { searchEntireSite } from '@/search/server'
import { generateSiteMetadata } from '@/utilities/seo'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Page({ searchParams }: Args) {
  const query = (await searchParams).q?.trim().slice(0, 120) || ''
  const results = query ? await searchEntireSite(query, 40) : []

  return (
    <main className="site-search-page">
      <section className="site-search-hero">
        <div className="site-container site-search-hero-inner">
          <div>
            <h1>搜索整个官网</h1>
            <p>查找无锡寻光数字科技的服务、行业解决方案、项目案例与公开文章。</p>
          </div>
          <Search defaultValue={query} />
        </div>
      </section>

      <section className="site-container site-search-content" aria-live="polite">
        {query ? (
          <>
            <header className="site-search-summary">
              <div>
                <span>搜索关键词</span>
                <h2>“{query}”</h2>
              </div>
              <p>共找到 {results.length} 项相关内容</p>
            </header>

            {results.length > 0 ? (
              <div className="site-search-result-list">
                {results.map((result) => (
                  <Link href={result.href} className="site-search-result" key={result.id}>
                    <span>{searchResultTypeLabels[result.type]}</span>
                    <div>
                      <h3>{result.title}</h3>
                      <p>{result.description}</p>
                      <small>{result.section}</small>
                    </div>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="site-search-page-empty">
                <SearchIcon aria-hidden="true" />
                <h2>没有找到相关内容</h2>
                <p>可以尝试“软件定制”“能源管理”“AI 应用”“项目周期”等关键词。</p>
                <Link href="/services">浏览产品与服务</Link>
              </div>
            )}
          </>
        ) : (
          <div className="site-search-page-empty">
            <SearchIcon aria-hidden="true" />
            <h2>从一个业务问题开始</h2>
            <p>例如搜索“设备接入”“企业知识库”“APP 开发”或“费用评估”。</p>
            <Link href="/services">浏览产品与服务</Link>
          </div>
        )}
      </section>
    </main>
  )
}

export function generateMetadata() {
  return generateSiteMetadata({
    title: '全站',
    description: '搜索无锡寻光数字科技官网中的服务、行业解决方案、案例与文章。',
    canonical: '/search',
    noIndex: true,
  })
}
