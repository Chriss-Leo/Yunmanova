import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: '站点设置',
  access: {
    read: () => true,
  },
  admin: {
    description: '统一管理品牌身份、联系方式和全站默认 SEO。品牌不代表任何注册主体或法人主体。',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: '站点名称',
      defaultValue: '无锡云码智创科技',
      required: true,
    },
    {
      name: 'brandDescription',
      type: 'textarea',
      label: '品牌简介',
      defaultValue: '专注软件定制、网站、APP、小程序与 AI 应用开发的技术服务品牌。',
      required: true,
    },
    {
      name: 'contact',
      type: 'group',
      label: '联系方式',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: '联系邮箱',
          defaultValue: 'chrisleo.yu.cn@gmail.com',
          required: true,
        },
        {
          name: 'wechat',
          type: 'text',
          label: '微信号',
          defaultValue: 'Chris_Leo_',
          required: true,
        },
        {
          name: 'wechatQRCode',
          type: 'upload',
          relationTo: 'media',
          label: '微信二维码',
        },
        {
          name: 'serviceArea',
          type: 'text',
          label: '服务范围',
          defaultValue: '面向全国企业客户提供远程与现场协作',
          required: true,
        },
      ],
    },
    {
      name: 'defaultSEO',
      type: 'group',
      label: '默认 SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: '默认标题',
          defaultValue:
            '无锡云码智创科技｜软件定制、网站开发、APP开发、小程序开发、AI应用开发、Web3开发、项目二次开发',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: '默认描述',
          defaultValue:
            '无锡云码智创科技提供软件定制开发、网站开发、APP开发、小程序开发、AI应用开发、Web3区块链智能合约开发、项目二次开发，覆盖IoT物联网、能源管理、企业管理、电商、医疗、Web3、金融等数字化场景。',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: '默认分享图片',
          admin: {
            description: '建议尺寸 1200 × 630；未上传时使用首页品牌图片。',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
