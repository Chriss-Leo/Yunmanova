'use client'

import {
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageScroller,
} from '@/components/ui/chat'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { containsContactInfo } from '@/utilities/contactDetection'
import { ChatCircleDots, Check, PaperPlaneTilt, WarningCircle, X } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'

type DeliveryStatus = 'failed' | 'sending' | 'sent'

type ChatMessage = {
  content: string
  id: string
  role: 'assistant' | 'visitor'
  sentAt: string
  status?: DeliveryStatus
}

const welcomeMessage: ChatMessage = {
  content:
    '您好，我是无锡寻光数字的在线接待。请直接告诉我您想开发的产品、目前遇到的问题，或期望的上线时间。',
  id: 'welcome',
  role: 'assistant',
  sentAt: '',
}

function formatTime(value: string) {
  if (!value) return ''

  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getSessionID() {
  const stored = window.sessionStorage.getItem('yunmanova-support-session')
  if (stored) return stored

  const sessionID = crypto.randomUUID()
  window.sessionStorage.setItem('yunmanova-support-session', sessionID)
  return sessionID
}

function nextAssistantReply(messages: ChatMessage[]) {
  const visitorMessages = messages.filter((message) => message.role === 'visitor')
  const hasContact = visitorMessages.some((message) => containsContactInfo(message.content))

  if (hasContact) {
    return '好的，联系方式已收到。您还可以继续补充预算范围、期望周期或参考产品。'
  }

  if (visitorMessages.length === 1) {
    return '收到。为了方便后续与您联系，请留下手机号、微信号或邮箱，任选一种即可。'
  }

  return '已经记下了。方便的话，再留一个手机号、微信号或邮箱，我会连同您的需求一起转交。'
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [liveMessage, setLiveMessage] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const shouldRestoreFocusRef = useRef(false)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isSending = messages.some((message) => message.status === 'sending')
  const isBusy = isSending || isTyping
  const visitorMessageCount = useMemo(
    () => messages.filter((message) => message.role === 'visitor').length,
    [messages],
  )

  useEffect(() => {
    if (!isOpen) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        shouldRestoreFocusRef.current = true
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  useEffect(() => {
    if (isOpen || !shouldRestoreFocusRef.current) return

    shouldRestoreFocusRef.current = false
    const frame = window.requestAnimationFrame(() => launcherRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [isOpen])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
    }
  }, [])

  async function deliverMessage(message: ChatMessage, transcript: ChatMessage[]) {
    const response = await fetch('/api/support-chat', {
      body: JSON.stringify({
        message: {
          content: message.content,
          id: message.id,
          role: message.role,
          sentAt: message.sentAt,
        },
        sessionId: getSessionID(),
        sourceUrl: window.location.href,
        transcript: transcript.map(({ content, id, role, sentAt }) => ({
          content,
          id,
          role,
          sentAt,
        })),
        website: honeypot,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = (await response.json().catch(() => null)) as { error?: string } | null
    if (!response.ok) {
      throw new Error(result?.error || '消息暂时无法发送，请稍后重试。')
    }
  }

  function addAssistantReply(transcript: ChatMessage[]) {
    setIsTyping(true)
    typingTimerRef.current = setTimeout(() => {
      const reply: ChatMessage = {
        content: nextAssistantReply(transcript),
        id: crypto.randomUUID(),
        role: 'assistant',
        sentAt: new Date().toISOString(),
      }
      setMessages((current) => [...current, reply])
      setIsTyping(false)
      setLiveMessage(reply.content)
    }, 650)
  }

  async function sendMessage(content: string, existingID?: string) {
    const normalized = content.trim()
    if (!normalized || normalized.length > 1500 || isBusy) return

    const outgoing: ChatMessage = {
      content: normalized,
      id: existingID || crypto.randomUUID(),
      role: 'visitor',
      sentAt: new Date().toISOString(),
      status: 'sending',
    }

    const baseMessages = existingID
      ? messages.map((message) => (message.id === existingID ? outgoing : message))
      : [...messages, outgoing]

    setMessages(baseMessages)
    if (!existingID) setDraft('')
    setLiveMessage('正在发送消息')

    try {
      await deliverMessage(outgoing, baseMessages)
      const delivered = baseMessages.map((message) =>
        message.id === outgoing.id ? { ...message, status: 'sent' as const } : message,
      )
      setMessages(delivered)
      setLiveMessage('消息已发送')
      addAssistantReply(delivered)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '消息暂时无法发送，请稍后重试。'
      setMessages(
        baseMessages.map((message) =>
          message.id === outgoing.id ? { ...message, status: 'failed' as const } : message,
        ),
      )
      setLiveMessage(errorMessage)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendMessage(draft)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (draft.trim()) void sendMessage(draft)
    }
  }

  function closeChat() {
    shouldRestoreFocusRef.current = true
    setIsOpen(false)
  }

  return (
    <aside className="support-chat" aria-label="在线咨询">
      <section
        className="support-chat-panel"
        data-open={isOpen}
        aria-hidden={!isOpen}
        aria-labelledby="support-chat-title"
      >
        <header className="support-chat-header">
          <div className="support-chat-identity">
            <div className="support-chat-brandmark" aria-hidden="true">
              <Image alt="" fill sizes="40px" src="/brand.svg" />
            </div>
            <div>
              <h2 id="support-chat-title">无锡寻光数字接待</h2>
              <p>
                <span aria-hidden="true" />
                在线接待
              </p>
            </div>
          </div>
          <Button
            aria-label="关闭在线咨询"
            className="support-chat-close"
            onClick={closeChat}
            size="icon"
            type="button"
            variant="ghost"
          >
            <X weight="bold" />
          </Button>
        </header>

        <MessageScroller followKey={`${messages.length}-${isTyping}`}>
          <p className="support-chat-intro">通常会尽快回复</p>
          {messages.map((message) => {
            const isVisitor = message.role === 'visitor'
            return (
              <Message align={isVisitor ? 'end' : 'start'} key={message.id}>
                {!isVisitor && (
                  <MessageAvatar aria-hidden="true">
                    <Image alt="" fill sizes="28px" src="/brand.svg" />
                  </MessageAvatar>
                )}
                <MessageContent>
                  <Bubble
                    variant={
                      message.status === 'failed'
                        ? 'destructive'
                        : message.role === 'visitor'
                          ? 'user'
                          : 'assistant'
                    }
                  >
                    <BubbleContent>{message.content}</BubbleContent>
                  </Bubble>
                  {isVisitor && (
                    <MessageFooter>
                      {message.status === 'sending' && '发送中…'}
                      {message.status === 'sent' && (
                        <>
                          <Check weight="bold" /> 已送达
                        </>
                      )}
                      {message.status === 'failed' && (
                        <button
                          onClick={() => void sendMessage(message.content, message.id)}
                          type="button"
                        >
                          <WarningCircle weight="fill" /> 发送失败，点击重试
                        </button>
                      )}
                      {!message.status && formatTime(message.sentAt)}
                    </MessageFooter>
                  )}
                </MessageContent>
              </Message>
            )
          })}
          {isTyping && (
            <Message align="start" aria-label="接待正在输入">
              <MessageAvatar aria-hidden="true">
                <Image alt="" fill sizes="28px" src="/favicon.svg" />
              </MessageAvatar>
              <MessageContent>
                <Bubble variant="assistant">
                  <BubbleContent>
                    <span className="support-chat-typing" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          )}
        </MessageScroller>

        <form className="support-chat-composer" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="support-chat-message">
            输入咨询内容
          </label>
          <input
            aria-hidden="true"
            autoComplete="off"
            className="support-chat-honeypot"
            name="website"
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            value={honeypot}
          />
          <Textarea
            aria-describedby="support-chat-hint"
            disabled={isSending}
            id="support-chat-message"
            maxLength={1500}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={visitorMessageCount ? '继续补充…' : '请描述您的需求…'}
            ref={inputRef}
            rows={1}
            value={draft}
          />
          <Button
            aria-label="发送消息"
            className="support-chat-send"
            disabled={!draft.trim() || isBusy}
            size="icon"
            type="submit"
          >
            <PaperPlaneTilt weight="fill" />
          </Button>
          <p id="support-chat-hint">
            Enter 发送，Shift + Enter 换行 · 发送即同意
            <Link href="/privacy">隐私政策</Link>
          </p>
        </form>
      </section>

      {!isOpen && (
        <Button
          aria-expanded={isOpen}
          aria-label="打开在线咨询"
          className="support-chat-launcher"
          onClick={() => setIsOpen(true)}
          ref={launcherRef}
          size="icon"
          type="button"
        >
          <ChatCircleDots weight="fill" />
          <span aria-hidden="true" />
        </Button>
      )}
      <span className="sr-only" aria-live="polite">
        {liveMessage}
      </span>
    </aside>
  )
}
