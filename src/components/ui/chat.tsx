'use client'

import { cn } from '@/utilities/ui'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const bubbleVariants = cva('support-chat-bubble', {
  variants: {
    variant: {
      assistant: 'support-chat-bubble-assistant',
      user: 'support-chat-bubble-user',
      destructive: 'support-chat-bubble-destructive',
    },
  },
  defaultVariants: {
    variant: 'assistant',
  },
})

type MessageScrollerProps = React.ComponentProps<'div'> & {
  followKey?: React.Key
}

const MessageScroller = React.forwardRef<HTMLDivElement, MessageScrollerProps>(
  ({ children, className, followKey, ...props }, forwardedRef) => {
    const localRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement)

    React.useEffect(() => {
      const node = localRef.current
      if (!node) return

      node.scrollTo({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        top: node.scrollHeight,
      })
    }, [followKey])

    return (
      <div
        ref={localRef}
        className={cn('support-chat-scroller', className)}
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        {...props}
      >
        {children}
      </div>
    )
  },
)
MessageScroller.displayName = 'MessageScroller'

type MessageProps = React.ComponentProps<'article'> & {
  align?: 'start' | 'end'
}

function Message({ align = 'start', className, ...props }: MessageProps) {
  return (
    <article
      className={cn('support-chat-message', `support-chat-message-${align}`, className)}
      {...props}
    />
  )
}

function MessageAvatar({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('support-chat-message-avatar', className)} {...props} />
}

function MessageContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('support-chat-message-content', className)} {...props} />
}

function MessageFooter({ className, ...props }: React.ComponentProps<'footer'>) {
  return <footer className={cn('support-chat-message-footer', className)} {...props} />
}

function Bubble({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof bubbleVariants>) {
  return <div className={cn(bubbleVariants({ variant }), className)} {...props} />
}

function BubbleContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('support-chat-bubble-content', className)} {...props} />
}

export {
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageScroller,
}
