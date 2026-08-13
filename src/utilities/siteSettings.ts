import type { Media, SiteSetting } from '@/payload-types'

import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'

export const defaultSiteSettings = {
  siteName: '无锡云码智创科技',
  brandDescription:
    '专注软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发的技术服务品牌。',
  contact: {
    email: 'chrisleo.yu.cn@gmail.com',
    wechat: 'Chris_Leo_',
    serviceArea: '面向全国企业客户提供远程与现场协作',
  },
  defaultSEO: {
    title:
      '无锡云码智创科技｜软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发',
    description:
      '无锡云码智创科技提供软件定制开发、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发，覆盖IoT物联网、能源管理、企业管理、电商、医疗、Web3、金融等数字化场景。',
  },
} as const

export async function getSiteSettings(): Promise<SiteSetting> {
  return getCachedGlobal('site-settings', 1)()
}

export function getSiteImageURL(image?: number | Media | null) {
  if (image && typeof image === 'object' && image.url) {
    return new URL(image.sizes?.og?.url || image.url, getServerSideURL()).toString()
  }

  return new URL('/media/homepage-team-energy-operations.png', getServerSideURL()).toString()
}
