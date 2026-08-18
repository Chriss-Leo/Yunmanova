import { containsContactInfo } from '@/utilities/contactDetection'
import { describe, expect, it } from 'vitest'

describe('containsContactInfo', () => {
  it.each([
    'csaVVll',
    'ABCDEF',
    'abc12345',
    'a1234567890123456789',
    'abc_def',
    'Chris_Leo_',
    'wxid-A8b_2026',
    '微信号：Chris_Leo_',
    '微信 WX-ID_2026',
    'vx: chris_2026',
    'Wechat: A_b-202608',
    '13800138000',
    '手机号：18612345678',
    'hello@example.com',
  ])('识别联系方式：%s', (value) => {
    expect(containsContactInfo(value)).toBe(true)
  })

  it.each([
    '我需要开发一个微信小程序',
    '预算 20000 元',
    '!@#$%^&*',
    '微信号：!@#$%^&*',
    '12345678',
    '_abcdef',
    'abc:123',
    '微信号：abc:123',
    'abc.123',
    'abc@123',
    'abc12',
    'a12345678901234567890',
    '013800138000',
    '138001380001',
    '这是普通需求描述',
  ])('不把普通需求误判为联系方式：%s', (value) => {
    expect(containsContactInfo(value)).toBe(false)
  })
})
