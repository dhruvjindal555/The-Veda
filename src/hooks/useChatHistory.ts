'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Conversation, Message } from '@/types/chat'

const STORAGE_KEY = 'veda_chat_history'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function generateTitle(messages: Message[]): string {
  const first = messages.find(m => m.role === 'user')
  if (!first) return 'New inquiry'
  return first.content.slice(0, 42) + (first.content.length > 42 ? '...' : '')
}

function loadFromStorage(): Conversation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(conversations: Conversation[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  } catch {}
}

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId]           = useState<string | null>(null)
  const [mounted, setMounted]             = useState(false)

  useEffect(() => {
    const stored = loadFromStorage()
    if (stored.length > 0) {
      setConversations(stored)
      setActiveId(stored[0].id)
    } else {
      const fresh = makeFresh()
      setConversations([fresh])
      setActiveId(fresh.id)
    }
    setMounted(true)
  }, [])

  function makeFresh(): Conversation {
    return {
      id:        generateId(),
      title:     'New inquiry',
      messages:  [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }

  const newConversation = useCallback(() => {
    const fresh = makeFresh()
    setConversations(prev => {
      const updated = [fresh, ...prev]
      saveToStorage(updated)
      return updated
    })
    setActiveId(fresh.id)
    return fresh.id
  }, [])

  const appendMessage = useCallback((convId: string, message: Message) => {
    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id !== convId) return c
        const msgs = [...c.messages, message]
        return {
          ...c,
          messages:  msgs,
          title:     generateTitle(msgs),
          updatedAt: Date.now(),
        }
      })
      saveToStorage(updated)
      return updated
    })
  }, [])

  const deleteConversation = useCallback((convId: string) => {
    setConversations(prev => {
      const updated = prev.filter(c => c.id !== convId)
      saveToStorage(updated)
      if (activeId === convId) {
        setActiveId(updated[0]?.id ?? null)
      }
      return updated
    })
  }, [activeId])

  const active = conversations.find(c => c.id === activeId) ?? null

  return {
    conversations,
    active,
    activeId,
    mounted,
    setActiveId,
    newConversation,
    appendMessage,
    deleteConversation,
  }
}