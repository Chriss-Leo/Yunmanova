import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { marketingBlocks } from '../../blocks/Marketing/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                ...marketingBlocks,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            {
              name: 'searchEnhancement',
              type: 'group',
              label: '搜索增强',
              admin: {
                description: '配置规范链接、结构化数据和搜索引擎收录规则。',
              },
              fields: [
                {
                  name: 'canonicalURL',
                  type: 'text',
                  label: '规范网址（Canonical URL）',
                  admin: {
                    description:
                      '填写该页面希望搜索引擎收录的唯一正式网址，可使用完整网址或站内路径。',
                    placeholder: 'https://www.example.com/page',
                  },
                },
                {
                  name: 'schemaType',
                  type: 'select',
                  label: '结构化数据类型',
                  defaultValue: 'WebPage',
                  options: [
                    { label: '普通页面（WebPage）', value: 'WebPage' },
                    { label: '服务页面（Service）', value: 'Service' },
                    { label: '关于页面（AboutPage）', value: 'AboutPage' },
                    { label: '联系页面（ContactPage）', value: 'ContactPage' },
                    { label: '集合页面（CollectionPage）', value: 'CollectionPage' },
                  ],
                },
                {
                  name: 'entitySummary',
                  type: 'textarea',
                  label: '实体摘要',
                  admin: {
                    description: '用于结构化数据的页面主体摘要；留空时使用 SEO 描述。',
                    rows: 3,
                  },
                },
                {
                  name: 'noIndex',
                  type: 'checkbox',
                  label: '禁止搜索引擎收录',
                  defaultValue: false,
                  admin: {
                    description: '开启后向搜索引擎输出 noindex；公开页面通常不要开启。',
                  },
                },
              ],
            },
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
