'use client'

import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CircleHelp,
  FileText,
  Layers3,
  LoaderCircle,
  Search,
  Sparkles,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { SiteSearchResult, SiteSearchResultType } from '@/search/types'

const resultTypeLabels: Record<SiteSearchResultType, string> = {
  article: '文章',
  case: '案例',
  faq: '问答',
  page: '页面',
  service: '服务',
  solution: '方案',
}

const resultTypeIcons = {
  article: BookOpenText,
  case: BriefcaseBusiness,
  faq: CircleHelp,
  page: FileText,
  service: Layers3,
  solution: Building2,
} satisfies Record<SiteSearchResultType, typeof FileText>

function groupResults(results: SiteSearchResult[]) {
  const groups = new Map<string, SiteSearchResult[]>()
  for (const result of results) {
    const current = groups.get(result.section) || []
    current.push(result)
    groups.set(result.section, current)
  }
  return [...groups.entries()]
}

export function GlobalSiteSearch({ featuredResults }: { featuredResults: SiteSearchResult[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(featuredResults)
  const [selectedId, setSelectedId] = useState(featuredResults[0]?.id || '')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults(featuredResults)
      setSelectedId(featuredResults[0]?.id || '')
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/site-search?q=${encodeURIComponent(query.trim())}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Search request failed')

        const data = (await response.json()) as { results: SiteSearchResult[] }
        setResults(data.results)
        setSelectedId(data.results[0]?.id || '')
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setResults([])
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 180)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [featuredResults, query])

  const selectedResult = useMemo(
    () => results.find((result) => result.id === selectedId) || results[0],
    [results, selectedId],
  )
  const groupedResults = useMemo(() => groupResults(results), [results])

  const navigateTo = (href: string) => {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  const viewAllResults = () => {
    if (!query.trim()) return
    navigateTo(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <button
        type="button"
        className="header-search-trigger"
        aria-label="打开全站搜索"
        onClick={() => setOpen(true)}
      >
        <Search aria-hidden="true" />
        <span className="header-search-label">搜索</span>
        <kbd className="header-search-shortcut">⌘ K</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="global-search-dialog">
          <DialogTitle className="sr-only">搜索</DialogTitle>
          <DialogDescription className="sr-only">
            搜索无锡寻光数字科技官网中的页面、服务、行业方案、案例和文章。
          </DialogDescription>

          <Command
            className="global-search-command"
            shouldFilter={false}
            value={selectedId}
            onValueChange={setSelectedId}
          >
            <div className="global-search-input-row">
              <div className="global-search-mark" aria-hidden="true">
                <Search />
              </div>
              <CommandInput
                aria-label="搜索全站内容"
                placeholder="搜索服务、解决方案、案例与文章…"
                value={query}
                onValueChange={setQuery}
              />
              {loading ? (
                <LoaderCircle className="global-search-loader" aria-label="正在搜索" />
              ) : null}
            </div>

            <div className="global-search-body">
              <div className="global-search-results">
                <div className="global-search-results-heading">
                  <span>{query ? `“${query}”的搜索结果` : '推荐内容'}</span>
                  <span>{loading ? '检索中' : `${results.length} 项`}</span>
                </div>

                <CommandList className="global-search-list">
                  <CommandEmpty>
                    <div className="global-search-empty">
                      <Search aria-hidden="true" />
                      <strong>没有找到相关内容</strong>
                      <span>试试业务关键词，例如“能源管理”“AI 应用”或“项目周期”。</span>
                    </div>
                  </CommandEmpty>

                  {groupedResults.map(([section, items]) => (
                    <CommandGroup heading={section} key={section}>
                      {items.map((result) => {
                        const Icon = resultTypeIcons[result.type]
                        return (
                          <CommandItem
                            key={result.id}
                            value={result.id}
                            onMouseEnter={() => setSelectedId(result.id)}
                            onSelect={() => navigateTo(result.href)}
                          >
                            <span className="global-search-result-icon">
                              <Icon aria-hidden="true" />
                            </span>
                            <span className="global-search-result-copy">
                              <strong>{result.title}</strong>
                              <small>{result.description}</small>
                            </span>
                            <span className="global-search-result-type">
                              {resultTypeLabels[result.type]}
                            </span>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  ))}
                </CommandList>
              </div>

              <aside className="global-search-preview" aria-live="polite">
                {selectedResult ? (
                  <>
                    <div className="global-search-preview-symbol" aria-hidden="true">
                      {(() => {
                        const Icon = resultTypeIcons[selectedResult.type]
                        return <Icon />
                      })()}
                    </div>
                    <span className="global-search-preview-label">
                      {selectedResult.section} · {resultTypeLabels[selectedResult.type]}
                    </span>
                    <h2>{selectedResult.title}</h2>
                    <p>{selectedResult.description}</p>
                    <button type="button" onClick={() => navigateTo(selectedResult.href)}>
                      打开内容
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <div className="global-search-preview-empty">
                    <Sparkles aria-hidden="true" />
                    <strong>搜索整个官网</strong>
                    <p>服务、行业方案、项目案例与公开文章，都从这里到达。</p>
                  </div>
                )}
              </aside>
            </div>

            <footer className="global-search-footer">
              <div>
                <span>
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> 选择
                </span>
                <span>
                  <kbd>↵</kbd> 打开
                </span>
                <span>
                  <kbd>Esc</kbd> 关闭
                </span>
              </div>
              {query.trim() ? (
                <button type="button" onClick={viewAllResults}>
                  查看完整搜索结果
                  <ArrowRight aria-hidden="true" />
                </button>
              ) : (
                <span>无锡寻光数字科技 · 全站搜索</span>
              )}
            </footer>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}
