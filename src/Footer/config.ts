import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'chrisleo.yu.cn@gmail.com',
      required: true,
      label: '联系邮箱',
    },
    {
      name: 'wechatQRCode',
      type: 'upload',
      relationTo: 'media',
      label: '微信二维码',
      admin: {
        description: '建议上传清晰的正方形二维码图片。未上传时前台显示替换提示。',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
