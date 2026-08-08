import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MarketingBlockComponent } from '@/blocks/Marketing/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  enterpriseHero: (block) => <MarketingBlockComponent block={block} />,
  strength: (block) => <MarketingBlockComponent block={block} />,
  servicesOverview: (block) => <MarketingBlockComponent block={block} />,
  caseShowcase: (block) => <MarketingBlockComponent block={block} />,
  developmentProcess: (block) => <MarketingBlockComponent block={block} />,
  faqSection: (block) => <MarketingBlockComponent block={block} />,
  contactCTA: (block) => <MarketingBlockComponent block={block} />,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
