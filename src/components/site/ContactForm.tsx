'use client'

import { ArrowRight } from '@phosphor-icons/react'
import { FormEvent, useState } from 'react'

type FormState = 'idle' | 'error' | 'ready'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const company = String(form.get('company') || '').trim()
    const contact = String(form.get('contact') || '').trim()
    const need = String(form.get('need') || '').trim()

    if (!name || !contact || !need) {
      setState('error')
      return
    }

    setState('ready')
    const subject = encodeURIComponent(`项目咨询 - ${company || name}`)
    const body = encodeURIComponent(`姓名：${name}\n公司：${company}\n联系方式：${contact}\n\n项目需求：\n${need}`)
    window.location.href = `mailto:chrisleo.yu.cn@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <form aria-labelledby="contact-form-title" className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-heading">
        <h2 id="contact-form-title">项目咨询</h2>
        <p>填写核心信息即可，我们会从最关键的问题开始沟通。</p>
      </div>
      <div className="form-grid">
        <label>
          <span>姓名 *</span>
          <input aria-invalid={state === 'error'} name="name" autoComplete="name" placeholder="如何称呼你" />
        </label>
        <label>
          <span>公司</span>
          <input name="company" autoComplete="organization" placeholder="企业或团队名称" />
        </label>
      </div>
      <label>
        <span>联系方式 *</span>
        <input aria-invalid={state === 'error'} name="contact" autoComplete="email" placeholder="邮箱、手机号或微信号" />
      </label>
      <label>
        <span>项目需求 *</span>
        <textarea aria-invalid={state === 'error'} name="need" rows={6} placeholder="请简单描述业务目标、当前阶段和希望解决的问题" />
      </label>
      {state === 'error' && <p className="form-error" role="alert">请填写姓名、联系方式和项目需求后再提交。</p>}
      {state === 'ready' && (
        <p aria-live="polite" className="form-success">邮件客户端已打开。如果没有自动打开，请直接发送邮件到下方邮箱。</p>
      )}
      <button className="button button-primary" type="submit">
        发送咨询 <ArrowRight size={18} />
      </button>
      <small>提交后将调用你的默认邮件客户端，网站不会在浏览器中保存表单内容。</small>
    </form>
  )
}
