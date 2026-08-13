import { HeaderClient } from './Component.client'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'

export async function Header() {
  const settings = await getSiteSettings()
  return <HeaderClient siteName={settings.siteName || defaultSiteSettings.siteName} />
}
