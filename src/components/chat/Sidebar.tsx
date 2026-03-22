'use client'
import { useState } from 'react'
import type { Conversation } from '@/types/chat'

type Props = {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export default function Sidebar({
  conversations, activeId, onSelect, onNew, onDelete,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-ink/40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-crimson border-b border-white/10 flex-shrink-0">
        <p className="font-garamond text-lg italic text-paper leading-none">The Veda</p>
        <button
          onClick={() => setOpen(p => !p)}
          className="flex flex-col gap-1 cursor-pointer p-1"
        >
          <span className={`block w-5 h-px bg-paper/70 transition-all duration-200 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-px bg-paper/70 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-paper/70 transition-all duration-200 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Sidebar panel */}
      <aside className={`
        fixed md:relative z-30 md:z-auto
        top-0 left-0 md:top-auto md:left-auto
        h-full
        w-72 md:w-60
        bg-crimson flex flex-col flex-shrink-0 overflow-hidden
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>

        <div className="hidden md:flex px-5 pt-6 pb-4 border-b border-white/10 flex-shrink-0 items-start justify-between">
          <div>
            <p className="font-garamond text-xl italic text-paper leading-none">The Veda</p>
            <p className="font-sans text-xs tracking-widest uppercase text-white/30 mt-1">
              Indian Mythology Guide
            </p>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="font-garamond text-xl italic text-paper leading-none">The Veda</p>
            <p className="font-sans text-xs tracking-widest uppercase text-white/30 mt-1">
              Indian Mythology Guide
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/40 hover:text-white/80 text-2xl cursor-pointer transition-colors leading-none"
          >
            ×
          </button>
        </div>

        {/* New conversation */}
        <div className="px-4 pt-3 pb-2 flex-shrink-0">
          <button
            onClick={() => { onNew(); setOpen(false) }}
            className="w-full py-2 border border-white/20 font-sans text-xs tracking-widest uppercase text-white/50 cursor-pointer transition-all duration-150 hover:border-saffron hover:text-saffron hover:bg-white/5"
          >
            + New Inquiry
          </button>
        </div>

        <div className="px-5 pt-3 pb-1 flex-shrink-0">
          <p className="font-sans text-xs tracking-widest uppercase text-white/25">
            History
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-1">
          {conversations.length === 0 && (
            <p className="font-garamond italic text-white/25 text-sm text-center mt-8 px-4">
              No conversations yet.
            </p>
          )}

          {conversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => { onSelect(conv.id); setOpen(false) }}
              className={`group relative flex items-start px-3 py-2 mb-px cursor-pointer border-l-2 transition-all duration-150 rounded-r
                ${activeId === conv.id
                  ? 'border-saffron bg-white/10'
                  : 'border-transparent hover:border-white/20 hover:bg-white/5'
                }`}
            >
              <div className="flex-1 min-w-0">
                <p className={`font-garamond text-sm leading-tight truncate ${activeId === conv.id ? 'text-paper' : 'text-white/55'}`}>
                  {conv.title}
                </p>
                <p className="font-sans text-xs text-white/25 mt-0.5">
                  {timeAgo(conv.updatedAt)}
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onDelete(conv.id) }}
                className="opacity-0 group-hover:opacity-100 ml-2 mt-0.5 flex-shrink-0 text-white/30 hover:text-white/80 transition-opacity text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}