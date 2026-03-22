'use client'
import { useState, useRef, useEffect } from 'react'
import { POLISH_OPTIONS } from '@/lib/suggestions'

type Props = {
  onPolish: (optionId: string) => void
}

export default function PromptPolisher({ onPolish }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 border font-sans text-xs tracking-wider uppercase cursor-pointer transition-all duration-150
          ${open
            ? 'border-saffron text-saffron bg-saffron/5'
            : 'border-chalk text-stone hover:border-saffron hover:text-saffron'
          }`}
      >
        Refine
        <span className={`text-xs transition-transform duration-150 inline-block ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute z-50 bottom-full mb-1 left-0 bg-paper border border-chalk min-w-max shadow-md">
          {POLISH_OPTIONS.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => { onPolish(opt.id); setOpen(false) }}
              className={`block w-full text-left px-4 py-2.5 font-sans text-xs tracking-wide text-stone cursor-pointer transition-colors hover:bg-crimson hover:text-paper
                ${i < POLISH_OPTIONS.length - 1 ? 'border-b border-chalk' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}