import type { Block } from 'payload'

const actionFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
]

export const EnterpriseHero: Block = {
  slug: 'enterpriseHero',
  interfaceName: 'EnterpriseHeroBlock',
  labels: { singular: '企业首屏', plural: '企业首屏' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'productImage', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', type: 'text', required: true },
    { name: 'action', type: 'group', fields: actionFields },
  ],
}

export const Strength: Block = {
  slug: 'strength',
  interfaceName: 'StrengthBlock',
  labels: { singular: '企业实力', plural: '企业实力' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

export const ServicesOverview: Block = {
  slug: 'servicesOverview',
  interfaceName: 'ServicesOverviewBlock',
  labels: { singular: '服务能力', plural: '服务能力' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'code',
          options: [
            { label: '软件开发', value: 'code' },
            { label: '移动应用', value: 'mobile' },
            { label: '小程序', value: 'wechat' },
            { label: 'AI 应用', value: 'ai' },
          ],
        },
      ],
    },
  ],
}

export const CaseShowcase: Block = {
  slug: 'caseShowcase',
  interfaceName: 'CaseShowcaseBlock',
  labels: { singular: '案例展示', plural: '案例展示' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'disclaimer', type: 'textarea' },
    {
      name: 'cases',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'summary', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'imageAlt', type: 'text', required: true },
        { name: 'keywords', type: 'text', admin: { description: '使用逗号分隔，用于页面关键词与筛选。' } },
      ],
    },
  ],
}

export const DevelopmentProcess: Block = {
  slug: 'developmentProcess',
  interfaceName: 'DevelopmentProcessBlock',
  labels: { singular: '开发流程', plural: '开发流程' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

export const FAQSection: Block = {
  slug: 'faqSection',
  interfaceName: 'FAQSectionBlock',
  labels: { singular: '常见问题', plural: '常见问题' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    { name: 'enableSchema', type: 'checkbox', defaultValue: true, label: '输出 FAQPage 结构化数据' },
  ],
}

export const ContactCTA: Block = {
  slug: 'contactCTA',
  interfaceName: 'ContactCTABlock',
  labels: { singular: '咨询行动区', plural: '咨询行动区' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'action', type: 'group', fields: actionFields },
  ],
}

export const marketingBlocks = [
  EnterpriseHero,
  Strength,
  ServicesOverview,
  CaseShowcase,
  DevelopmentProcess,
  FAQSection,
  ContactCTA,
]
