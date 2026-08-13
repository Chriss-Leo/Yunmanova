import { LegalDocument } from '@/components/site/LegalDocument'
import { applyLegalContactEmail, legalEffectiveDate, privacySections } from '@/data/legal'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { generateSiteMetadata } from '@/utilities/seo'
import { buildPageJsonLd } from '@/utilities/seo'
import { JsonLd } from '@/components/site/JsonLd'

export const generateMetadata = () =>
  generateSiteMetadata({
    title: '隐私政策',
    description:
      '了解云码智创科技网站如何处理咨询信息、访问日志、Cookie，以及您享有的个人信息权利。',
    canonical: '/privacy',
  })

export default async function PrivacyPage() {
  const settings = await getSiteSettings()
  const email = settings.contact?.email || defaultSiteSettings.contact.email

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          description:
            '了解云码智创科技网站如何处理咨询信息、访问日志、Cookie，以及您享有的个人信息权利。',
          name: '隐私政策',
          path: '/privacy',
          settings,
        })}
      />
      <LegalDocument
        title="隐私政策"
        description="我们以清晰、必要和可控的方式处理您在访问网站与业务咨询过程中提供的信息。"
        effectiveDate={legalEffectiveDate}
        sections={applyLegalContactEmail(privacySections, email)}
        relatedHref="/terms"
        relatedLabel="服务条款"
      />
    </>
  )
}
