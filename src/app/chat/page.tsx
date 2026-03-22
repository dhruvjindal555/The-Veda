'use client'
import { useRouter }      from 'next/navigation'
import { useState }       from 'react'
import Sidebar            from '@/components/chat/Sidebar'
import ChatMessages       from '@/components/chat/ChatMessages'
import ChatInput          from '@/components/chat/ChatInput'
import { useChatHistory } from '@/hooks/useChatHistory'
import type { Message }   from '@/types/chat'

export default function ChatPage() {
  const router = useRouter()

  const [error,            setError]            = useState('')
  const [loading,          setLoading]          = useState(false)
  const [followUps,        setFollowUps]        = useState<string[]>([])
  const [followUpsLoading, setFollowUpsLoading] = useState(false)

  const {
    conversations,
    active,
    activeId,
    mounted,
    setActiveId,
    newConversation,
    appendMessage,
    deleteConversation,
  } = useChatHistory()

  if (!mounted) return null

  const fetchFollowUps = async (msgs: { role: string; content: string }[]) => {
    setFollowUps([])
    setFollowUpsLoading(true)
    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: msgs, mode: 'followups' }),
      })
      const data = await res.json()
      if (data.followups) setFollowUps(data.followups)
    } catch {
    } finally {
      setFollowUpsLoading(false)
    }
  }

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setError('')
    setFollowUps([])

    let convId = activeId
    if (!convId || !active) {
      convId = newConversation()
    }

    const userMsg: Message = {
      id:        `${Date.now()}-user`,
      role:      'user',
      content:   text,
      timestamp: Date.now(),
    }

    appendMessage(convId!, userMsg)
    setLoading(true)

    const currentMessages = [
      ...(active?.messages ?? []),
      userMsg,
    ].map(m => ({ role: m.role, content: m.content }))

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: currentMessages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')

      const assistantMsg: Message = {
        id:        `${Date.now()}-assistant`,
        role:      'assistant',
        content:   data.reply,
        timestamp: Date.now(),
      }

      appendMessage(convId!, assistantMsg)
      fetchFollowUps([...currentMessages, { role: 'assistant', content: data.reply }])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestion = (s: string) => {
    if (s === '__dismiss_error__') { setError(''); return }
    send(s)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-paper">

      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={id => { setActiveId(id); setFollowUps([]); setError('') }}
        onNew={() => { newConversation(); setFollowUps([]); setError('') }}
        onDelete={deleteConversation}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">

        {/* Header */}
        <header className="px-5 md:px-8 py-3 md:py-4 border-b border-chalk bg-paper flex items-center justify-between flex-shrink-0">
          <div className="flex flex-col min-w-0">
            <span className="font-sans text-xs tracking-widest uppercase text-saffron">
              The Veda
            </span>
            <span className="font-garamond text-sm italic text-stone truncate mt-0.5">
              {active && active.messages.length > 0
                ? active.title
                : 'Begin a sacred inquiry'}
            </span>
          </div>
          <button
            onClick={() => router.push('/')}
            className="font-sans text-xs tracking-widest uppercase text-stone cursor-pointer transition-colors hover:text-ink flex-shrink-0 ml-6"
          >
            ← Return
          </button>
        </header>

        {/* No active conversation */}
        {!active ? (
          <div className="flex-1 flex items-center justify-center bg-parchment px-6">
            <div className="text-center">
              <p className="font-garamond text-2xl font-normal text-ink mb-2">
                No inquiry selected
              </p>
              <p className="font-garamond italic text-stone mb-6">
                Start a new inquiry or select one from the sidebar.
              </p>
              <button
                onClick={newConversation}
                className="px-6 py-3 bg-crimson text-paper font-sans text-xs tracking-widest uppercase cursor-pointer hover:bg-saffron transition-colors"
              >
                + New Inquiry
              </button>
            </div>
          </div>
        ) : (
          <>
            <ChatMessages
              messages={active.messages}
              loading={loading}
              followUps={followUps}
              followUpsLoading={followUpsLoading}
              error={error}
              onSuggestion={handleSuggestion}
              onSend={send}
            />
            <ChatInput
              onSend={send}
              loading={loading}
              placeholder="Ask the Rishi anything about Indian mythology..."
            />
          </>
        )}
      </div>
    </div>
  )
}