import { HeaderClient } from './Component.client'
import { defaultSiteSettings, getSiteSettings } from '@/utilities/siteSettings'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Header() {
  const [settings, header] = await Promise.all([getSiteSettings(), getCachedGlobal('header', 1)()])

  return (
    <HeaderClient
      navItems={header.navItems || []}
      siteName={settings.siteName || defaultSiteSettings.siteName}
    />
  )
}
