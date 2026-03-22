'use client'
import { useState, useEffect, useRef } from 'react'
import PromptPolisher from './PromptPolisher'
import { polishPrompt } from '@/lib/suggestions'

type Props = {
  onSend: (text: string) => void
  loading: boolean
  placeholder?: string
}

export default function ChatInput({ onSend, loading, placeholder }: Props) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!loading) textareaRef.current?.focus()
  }, [loading])

  const handleSend = (text: string) => {
    if (!text.trim() || loading) return
    onSend(text)
    setInput('')
  }

  const handlePolish = (optionId: string) => {
    if (!input.trim()) return
    setInput(polishPrompt(input, optionId))
  }

  const charCount = input.length
  const isLong    = charCount > 300

  return (
    <div className="px-4 md:px-8 py-3 md:py-4 border-t border-chalk bg-paper flex-shrink-0">
      <div className="max-w-2xl mx-auto">

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-2 min-h-6">
          <div>
            {input.trim().length > 3 && !loading && (
              <PromptPolisher onPolish={handlePolish} />
            )}
          </div>
          <div className="flex items-center gap-3">
            {isLong && (
              <span className="font-sans text-xs text-chalk">
                {charCount}
              </span>
            )}
            <p className="font-sans text-xs text-chalk hidden sm:block">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        <div className="flex gap-2 md:gap-3 items-stretch">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(input)
              }
            }}
            disabled={loading}
            placeholder={loading ? 'The Rishi is responding...' : placeholder ?? 'Ask the Rishi anything...'}
            rows={2}
            className="flex-1 px-3 md:px-4 py-3 bg-parchment border border-chalk font-garamond text-base text-ink placeholder:text-chalk resize-none outline-none leading-relaxed focus:border-saffron transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={loading || !input.trim()}
            className="px-4 md:px-7 bg-crimson text-paper font-sans text-xs tracking-widest uppercase cursor-pointer transition-colors duration-150 hover:bg-saffron disabled:bg-chalk disabled:cursor-not-allowed"
          >
            {loading ? '...' : 'Ask'}
          </button>
        </div>

      </div>
    </div>
  )
}