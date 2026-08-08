import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { priority: priorityFromProps, className } = props

  return (
    <Image
      alt="云码智创科技"
      width={260}
      height={49}
      priority={priorityFromProps === 'high'}
      className={className}
      src="/brand/yunma-logo-trimmed.png"
    />
  )
}
