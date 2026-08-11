import type { Metadata } from 'next'

import { LegalDocument } from '@/components/site/LegalDocument'
import { legalEffectiveDate, termsSections } from '@/data/legal'

export const metadata: Metadata = {
  title: '服务条款',
  description: '了解云码智创科技网站的访问规则、咨询与项目合作边界、知识产权、责任范围及争议解决方式。',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalDocument
      title="服务条款"
      description="本条款说明网站访问、业务咨询与后续软件项目合作之间的权利义务边界。"
      effectiveDate={legalEffectiveDate}
      sections={termsSections}
      relatedHref="/privacy"
      relatedLabel="隐私政策"
    />
  )
}
