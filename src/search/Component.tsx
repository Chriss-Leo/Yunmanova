import { Search as SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Search({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form
      action="/search"
      method="get"
      className="site-search-form"
      role="search"
      tooldescription="搜索无锡寻光数字科技网站中的服务、解决方案、案例、文章与公开内容。"
      toolname="search_site_content"
    >
      <Label htmlFor="site-search-query" className="sr-only">
        搜索全站内容
      </Label>
      <SearchIcon aria-hidden="true" />
      <Input
        id="site-search-query"
        name="q"
        defaultValue={defaultValue}
        placeholder="输入服务、行业或业务关键词"
        toolparamdescription="要在网站中查找的关键词或主题。"
      />
      <Button type="submit">搜索</Button>
    </form>
  )
}
