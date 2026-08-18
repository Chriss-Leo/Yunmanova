const phonePattern = /(?<!\d)1[3-9]\d{9}(?!\d)/
const emailPattern = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/i
const explicitWeChatPattern =
  /(?:微\s*信(?:号|id)?|vx|wechat)\s*(?:是|为|[:：])?\s*([^\s，。；;、！？!?,]+)/i
const weChatIDPattern = /^[A-Za-z][A-Za-z0-9_-]{5,19}$/

/**
 * 微信号可能直接作为一条消息发送，因此不能只依赖“微信：”前缀。
 * 微信号长度为 6–20 位，必须以字母开头，后续仅允许字母、数字、下划线和减号。
 */
function isStandaloneWeChatID(value: string) {
  return weChatIDPattern.test(value.trim())
}

export function containsContactInfo(value: string) {
  if (phonePattern.test(value) || emailPattern.test(value)) return true

  const explicitWeChat = value.match(explicitWeChatPattern)?.[1]
  if (explicitWeChat && isStandaloneWeChatID(explicitWeChat)) return true

  return isStandaloneWeChatID(value)
}
