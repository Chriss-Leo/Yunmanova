import nodemailer, { type Transporter } from 'nodemailer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type IncomingMessage = {
  content: string
  id: string
  role: 'assistant' | 'visitor'
  sentAt: string
}

type SupportChatBody = {
  message?: IncomingMessage
  sessionId?: string
  sourceUrl?: string
  transcript?: IncomingMessage[]
  website?: string
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitWindow = 10 * 60 * 1000
const rateLimitMaximum = 12
const globalSupportMail = globalThis as typeof globalThis & {
  supportChatRateLimits?: Map<string, RateLimitEntry>
  supportChatTransporter?: Transporter
}

function escapeHTML(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] || character,
  )
}

function normalizeMessage(value: unknown): IncomingMessage | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as Partial<IncomingMessage>

  if (
    typeof candidate.content !== 'string' ||
    !candidate.content.trim() ||
    candidate.content.length > 1500 ||
    typeof candidate.id !== 'string' ||
    candidate.id.length > 80 ||
    (candidate.role !== 'assistant' && candidate.role !== 'visitor') ||
    typeof candidate.sentAt !== 'string' ||
    Number.isNaN(Date.parse(candidate.sentAt))
  ) {
    return null
  }

  return {
    content: candidate.content.trim(),
    id: candidate.id,
    role: candidate.role,
    sentAt: candidate.sentAt,
  }
}

function getClientIP(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(key: string, maximum: number) {
  const now = Date.now()
  const rateLimits = globalSupportMail.supportChatRateLimits || new Map<string, RateLimitEntry>()
  globalSupportMail.supportChatRateLimits = rateLimits

  for (const [storedKey, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(storedKey)
  }

  const current = rateLimits.get(key)
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + rateLimitWindow })
    return false
  }

  current.count += 1
  return current.count > maximum
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return true

  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost || request.headers.get('host')
  if (!host) return false

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

function normalizeSourceURL(value: unknown, request: Request) {
  if (typeof value !== 'string' || !value || value.length > 1000) return null

  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost || request.headers.get('host')
  if (!host) return null

  try {
    const url = new URL(value)
    if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.host !== host) return null
    url.hash = ''
    return url.toString()
  } catch {
    return null
  }
}

function detectContacts(messages: IncomingMessage[]) {
  const visitorText = messages
    .filter((message) => message.role === 'visitor')
    .map((message) => message.content)
    .join('\n')

  const emails = visitorText.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/gi) || []
  const phones = visitorText.match(/(?<!\d)1[3-9]\d{9}(?!\d)/g) || []
  const wechat =
    visitorText.match(/(?:微信|vx|wechat|微\s*信)\s*[:：]?\s*([a-zA-Z][-_a-zA-Z0-9]{5,19})/gi) || []

  return {
    emails: [...new Set(emails)].slice(0, 5),
    phones: [...new Set(phones)].slice(0, 5),
    wechat: [...new Set(wechat)].slice(0, 5),
  }
}

function getTransporter() {
  if (globalSupportMail.supportChatTransporter) return globalSupportMail.supportChatTransporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !Number.isInteger(port) || !user || !pass) {
    throw new Error('SMTP is not configured')
  }

  globalSupportMail.supportChatTransporter = nodemailer.createTransport({
    auth: { pass, user },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    host,
    maxConnections: 2,
    pool: true,
    port,
    secure: process.env.SMTP_SECURE !== 'false',
    socketTimeout: 15_000,
    tls: {
      minVersion: 'TLSv1.2',
    },
  })

  return globalSupportMail.supportChatTransporter
}

function buildEmailTemplate({
  currentMessage,
  request,
  sessionId,
  sourceUrl,
  transcript,
}: {
  currentMessage: IncomingMessage
  request: Request
  sessionId: string
  sourceUrl: string
  transcript: IncomingMessage[]
}) {
  const contacts = detectContacts(transcript)
  const visitorMessages = transcript.filter((message) => message.role === 'visitor')
  const messageNumber = Math.max(
    1,
    visitorMessages.findIndex((message) => message.id === currentMessage.id) + 1,
  )
  const timestamp = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(currentMessage.sentAt))

  const contactRows = [
    contacts.phones.length ? `手机号：${contacts.phones.join('、')}` : '',
    contacts.wechat.length ? `微信：${contacts.wechat.join('、')}` : '',
    contacts.emails.length ? `邮箱：${contacts.emails.join('、')}` : '',
  ].filter(Boolean)

  const transcriptHTML = transcript
    .map((message) => {
      const isVisitor = message.role === 'visitor'
      const label = isVisitor ? '访客' : '在线接待'
      const background = isVisitor ? '#e5f0eb' : '#f5f7f6'
      const time = new Intl.DateTimeFormat('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Shanghai',
      }).format(new Date(message.sentAt))

      return `<tr><td style="padding:0 0 12px"><div style="font-size:12px;color:#68736d;margin-bottom:5px">${label} · ${time}</div><div style="background:${background};border-radius:8px;padding:11px 13px;color:#17201c;line-height:1.7;white-space:pre-wrap">${escapeHTML(message.content)}</div></td></tr>`
    })
    .join('')

  const plainTranscript = transcript
    .map((message) => {
      const label = message.role === 'visitor' ? '访客' : '在线接待'
      return `${label}：${message.content}`
    })
    .join('\n\n')

  const clientIP = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || '未知'
  const subject = `【在线咨询】第 ${messageNumber} 条消息｜${sessionId.slice(0, 8)}`

  return {
    replyTo: contacts.emails[0],
    subject,
    text: [
      '寻光数字官网收到新的在线咨询',
      '',
      `本条消息：${currentMessage.content}`,
      `发送时间：${timestamp}`,
      `会话编号：${sessionId}`,
      `来源页面：${sourceUrl}`,
      ...(contactRows.length
        ? ['', '已识别联系方式', ...contactRows]
        : ['', '已识别联系方式：暂未提供']),
      '',
      '截至当前的对话',
      plainTranscript,
      '',
      `访客 IP：${clientIP}`,
      `浏览器：${userAgent}`,
    ].join('\n'),
    html: `<!doctype html><html lang="zh-CN"><body style="margin:0;background:#f2f5f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans SC',sans-serif;color:#17201c"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f3;padding:28px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden"><tr><td style="background:#0b553d;padding:24px 28px;color:#ffffff"><div style="font-size:12px;opacity:.76;margin-bottom:6px">寻光数字官网 · 在线咨询</div><div style="font-size:22px;font-weight:700">收到第 ${messageNumber} 条访客消息</div></td></tr><tr><td style="padding:26px 28px"><div style="font-size:12px;color:#68736d;margin-bottom:8px">本条消息</div><div style="font-size:17px;font-weight:600;line-height:1.75;white-space:pre-wrap">${escapeHTML(currentMessage.content)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;background:#f7f9f8;border-radius:8px"><tr><td style="padding:15px 16px;font-size:13px;line-height:1.8;color:#4f5b55"><strong style="color:#17201c">已识别联系方式</strong><br>${contactRows.length ? contactRows.map(escapeHTML).join('<br>') : '暂未提供'}<br><strong style="color:#17201c">发送时间</strong>：${escapeHTML(timestamp)}<br><strong style="color:#17201c">来源页面</strong>：<a href="${escapeHTML(sourceUrl)}" style="color:#0b553d">${escapeHTML(sourceUrl)}</a></td></tr></table><div style="font-size:14px;font-weight:700;margin:0 0 12px">截至当前的完整对话</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${transcriptHTML}</table><div style="border-top:1px solid #dfe4e1;margin-top:14px;padding-top:14px;font-size:11px;line-height:1.7;color:#7a847f">会话编号：${escapeHTML(sessionId)}<br>访客 IP：${escapeHTML(clientIP)}<br>浏览器：${escapeHTML(userAgent)}</div></td></tr></table></td></tr></table></body></html>`,
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ error: '请求来源无效。' }, { status: 403 })
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 50_000) {
    return Response.json({ error: '消息内容过长。' }, { status: 413 })
  }

  let body: SupportChatBody
  try {
    body = (await request.json()) as SupportChatBody
  } catch {
    return Response.json({ error: '消息格式无效。' }, { status: 400 })
  }

  if (body.website) {
    return Response.json({ ok: true })
  }

  const message = normalizeMessage(body.message)
  const transcript = Array.isArray(body.transcript)
    ? body.transcript.map(normalizeMessage).filter((item): item is IncomingMessage => Boolean(item))
    : []
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const sourceUrl = normalizeSourceURL(body.sourceUrl, request)

  if (
    !message ||
    message.role !== 'visitor' ||
    !/^[a-f0-9-]{20,80}$/i.test(sessionId) ||
    transcript.length < 1 ||
    transcript.length > 40 ||
    !transcript.some((item) => item.id === message.id && item.content === message.content) ||
    !sourceUrl
  ) {
    return Response.json({ error: '消息内容无效。' }, { status: 400 })
  }

  const totalTranscriptLength = transcript.reduce((total, item) => total + item.content.length, 0)
  if (totalTranscriptLength > 20_000) {
    return Response.json({ error: '本次对话内容过长，请精简后重试。' }, { status: 400 })
  }

  const clientIP = getClientIP(request)
  if (
    isRateLimited(`session:${clientIP}:${sessionId}`, rateLimitMaximum) ||
    isRateLimited(`address:${clientIP}`, 30)
  ) {
    return Response.json({ error: '发送得有些频繁，请稍后再试。' }, { status: 429 })
  }

  const recipients = (process.env.SUPPORT_NOTIFICATION_EMAIL || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
  const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER
  const fromName = process.env.SMTP_FROM_NAME || '寻光数字在线接待'

  if (!recipients.length || !fromAddress) {
    console.error('Support chat email recipient or sender is not configured')
    return Response.json(
      { error: '在线接待暂未配置完成，请通过联系页面与我沟通。' },
      { status: 503 },
    )
  }

  try {
    const email = buildEmailTemplate({
      currentMessage: message,
      request,
      sessionId,
      sourceUrl,
      transcript,
    })

    await getTransporter().sendMail({
      from: { address: fromAddress, name: fromName },
      html: email.html,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      to: recipients,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Failed to send support chat email', error)
    return Response.json({ error: '消息暂时无法送达，请稍后重试。' }, { status: 502 })
  }
}
