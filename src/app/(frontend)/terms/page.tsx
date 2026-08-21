import { LegalDocument } from '@/components/site/LegalDocument'
import { applyLegalContactEmail, legalEffectiveDate, termsSections } from '@/data/legal'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { generateSiteMetadata } from '@/utilities/seo'
import { buildPageJsonLd } from '@/utilities/seo'
import { JsonLd } from '@/components/site/JsonLd'

export const generateMetadata = () =>
  generateSiteMetadata({
    title: '服务条款',
    description:
      '了解寻光数字科技网站的访问规则、咨询与项目合作边界、知识产权、责任范围及争议解决方式。',
    canonical: '/terms',
  })

export default async function TermsPage() {
  const settings = await getSiteSettings()
  const email = settings.contact?.email || defaultSiteSettings.contact.email

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          description:
            '了解寻光数字科技网站的访问规则、咨询与项目合作边界、知识产权、责任范围及争议解决方式。',
          name: '服务条款',
          path: '/terms',
          settings,
        })}
      />
      <LegalDocument
        title="服务条款"
        description="本条款说明网站访问、业务咨询与后续软件项目合作之间的权利义务边界。"
        effectiveDate={legalEffectiveDate}
        sections={applyLegalContactEmail(termsSections, email)}
        relatedHref="/privacy"
        relatedLabel="隐私政策"
      />
    </>
  )
}
