'use client'

import { Minus, Plus } from '@phosphor-icons/react'
import { useState } from 'react'

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const expanded = open === index
        return (
          <div className="faq-item" key={item.question}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`faq-${index}`}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span>{item.question}</span>
              {expanded ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            {expanded && <p id={`faq-${index}`}>{item.answer}</p>}
          </div>
        )
      })}
    </div>
  )
}
