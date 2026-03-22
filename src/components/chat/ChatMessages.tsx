import { useRef, useEffect } from 'react'
import type { Message } from '@/types/chat'
import Divider from '@/components/ui/Divider'
import FollowUpSuggestions from './FollowUpSuggestions'
import PromptPolisher from './PromptPolisher'
import CopyButton from './CopyButton'
import { INITIAL_SUGGESTIONS, polishPrompt } from '@/lib/suggestions'

type Props = {
  messages: Message[]
  loading: boolean
  followUps: string[]
  followUpsLoading: boolean
  error: string
  onSuggestion: (s: string) => void
  onSend: (text: string) => void
}

function renderContent(text: string) {
  const lines = text.split('\n')

  return (
    <>
      {lines.map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g)

        const formatted = parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className=" font-semibold text-ink">{part}</strong>
            : <span key={j}>{part}</span>
        )

        return (
          <span key={i}>
            {formatted}
            {i < lines.length - 1 && <br />}
          </span>
        )
      })}
    </>
  )
}

export default function ChatMessages({
  messages, loading, followUps, followUpsLoading,
  error, onSuggestion, onSend,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, followUps])

  let lastAssistantIndex = -1
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === 'assistant') { lastAssistantIndex = i; break }
  }

  const lastUserBeforeAssistant = lastAssistantIndex > 0
    ? messages.slice(0, lastAssistantIndex).reverse().find(m => m.role === 'user')
    : null

  return (
    <div className="flex-1 overflow-y-auto bg-parchment">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="text-center pt-6">
            <p className="font-sans text-xs tracking-widest uppercase text-saffron mb-4">
              Begin your inquiry
            </p>
            <h2 className="font-garamond text-4xl font-normal text-ink mb-2">
              What do you seek to learn?
            </h2>
            <p className="font-garamond italic text-stone text-lg mb-10">
              Ask the Rishi about the epics, the gods, the cosmos, and the philosophy of dharma.
            </p>
            <div className="flex flex-col gap-2">
              {INITIAL_SUGGESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => onSuggestion(q)}
                  className="w-full px-5 py-3 border border-chalk bg-paper font-garamond text-base text-ink text-left cursor-pointer transition-all duration-150 hover:bg-crimson hover:text-paper hover:border-crimson"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && <Divider label="Inquiry" />}

        {messages.map((msg, i) => {
          const isAssistant = msg.role === 'assistant'
          const isLastMsg = i === messages.length - 1
          const isLastAssistant = i === lastAssistantIndex

          return (
            <div key={msg.id} className="mb-6">
              <div className="grid gap-2 md:gap-4" style={{ gridTemplateColumns: '32px 1fr' }} >

                <p className={`font-sans text-xs tracking-widest uppercase text-right pt-1
                  ${isAssistant ? 'text-saffron' : 'text-chalk'}`}>
                  {isAssistant ? 'Rishi' : 'You'}
                </p>

                <div>
                  {/* message bubble */}
                  <div className={`font-garamond text-lg leading-relaxed pl-4
                    ${isAssistant
                      ? 'border-l-2 border-saffron text-ink'
                      : 'border-l-2 border-chalk text-stone'
                    }`}>
                    {renderContent(msg.content)}
                  </div>

                  {isAssistant && (
                    <div className="pl-4 mt-3 flex items-center justify-between">
                      <div>
                        {isLastAssistant && !loading && lastUserBeforeAssistant && (
                          <PromptPolisher
                            onPolish={(optionId) =>
                              onSend(polishPrompt(lastUserBeforeAssistant.content, optionId))
                            }
                          />
                        )}
                      </div>

                      <CopyButton text={msg.content} />
                    </div>
                  )}
                </div>
              </div>

              {isAssistant && isLastMsg && (
                <FollowUpSuggestions
                  suggestions={followUps}
                  loading={followUpsLoading}
                  onSelect={onSuggestion}
                />
              )}
            </div>
          )
        })}

        {/* loading */}
        {loading && (
          <div className="grid gap-2 md:gap-4 mb-5" style={{ gridTemplateColumns: '32px 1fr' }}>
            <p className="font-sans text-xs tracking-widest uppercase text-right pt-1 text-saffron">
              Rishi
            </p>
            <p className="font-garamond text-lg italic text-stone border-l-2 border-saffron pl-4">
              The Rishi reflects upon the ancient texts...
            </p>
          </div>
        )}

        {/* error */}
        {error && (
          <div className="mb-6 grid gap-2 md:gap-4" style={{ gridTemplateColumns: '32px 1fr' }}>
            <div />
            <div className="border border-chalk bg-paper px-4 py-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="text-saffron font-sans text-base leading-none mt-0.5">!</span>
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase text-saffron mb-1">
                    Something went wrong
                  </p>
                  <p className="font-garamond text-base text-stone leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSuggestion('__dismiss_error__')}
                className="font-sans text-xs text-chalk hover:text-stone flex-shrink-0 cursor-pointer transition-colors mt-0.5"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}