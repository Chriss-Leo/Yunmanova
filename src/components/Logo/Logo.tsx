import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading, priority: priorityFromProps, className } = props

  return (
    <span className={['official-logo-frame', className].filter(Boolean).join(' ')}>
      <Image
        alt="云码智创科技"
        width={1536}
        height={1024}
        loading={priorityFromProps === 'high' ? undefined : loading}
        priority={priorityFromProps === 'high'}
        className="official-logo-image"
        src="/brand/yunma-logo.png"
      />
    </span>
  )
}
