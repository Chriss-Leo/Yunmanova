import canUseDOM from './canUseDOM'
import { seoConfig } from '@/config/seo'

export const getServerSideURL = () => seoConfig.canonicalBaseURL

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return seoConfig.canonicalBaseURL
}
