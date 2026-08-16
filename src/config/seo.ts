import type { Metadata } from 'next'

const cleanEnvValue = (value: string | undefined) => value?.trim() || undefined

const resolveCanonicalBaseURL = () => {
  const configuredURL =
    cleanEnvValue(process.env.NEXT_PUBLIC_SERVER_URL) ||
    (cleanEnvValue(process.env.VERCEL_PROJECT_PRODUCTION_URL)
      ? `https://${cleanEnvValue(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`
      : 'http://localhost:3000')

  return new URL(configuredURL).toString().replace(/\/$/, '')
}

export const seoConfig = {
  analytics: {
    clarityProjectID: cleanEnvValue(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID),
    ga4MeasurementID: cleanEnvValue(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
  },
  canonicalBaseURL: resolveCanonicalBaseURL(),
  verification: {
    baidu: cleanEnvValue(process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION),
    bing: cleanEnvValue(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION),
    google: cleanEnvValue(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
    qihoo360: cleanEnvValue(process.env.NEXT_PUBLIC_360_SITE_VERIFICATION),
    sogou: cleanEnvValue(process.env.NEXT_PUBLIC_SOGOU_SITE_VERIFICATION),
    yandex: cleanEnvValue(process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION),
  },
} as const

export const getCanonicalURL = (path = '/') =>
  new URL(path, `${seoConfig.canonicalBaseURL}/`).toString()

export const getSiteVerificationMetadata = (): Metadata['verification'] | undefined => {
  const { baidu, bing, google, qihoo360, sogou, yandex } = seoConfig.verification
  const other: Record<string, string> = {}

  if (baidu) other['baidu-site-verification'] = baidu
  if (bing) other['msvalidate.01'] = bing
  if (qihoo360) other['360-site-verification'] = qihoo360
  if (sogou) other.sogou_site_verification = sogou

  if (!google && !yandex && Object.keys(other).length === 0) return undefined

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(Object.keys(other).length > 0 ? { other } : {}),
  }
}
