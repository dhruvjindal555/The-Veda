'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const TEXTS = ['Mahabharata', 'Ramayana', 'Bhagavad Gita']

export default function Home() {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT */}
      <div className="px-8 py-10 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-chalk order-2 md:order-1">
        <p className="font-sans text-xs tracking-widest uppercase text-stone hidden md:block">
          Veda — Vol. I
        </p>

        <div className="flex flex-col gap-6 md:gap-8">
          <p className="font-sans text-xs tracking-widest uppercase text-stone leading-relaxed">
            Knowledge from<br />
            Mahabharata · Ramayana · Puranas
          </p>
          <blockquote className="font-garamond text-base md:text-lg italic text-stone leading-relaxed max-w-xs">
            "The soul is neither born nor does it die at any time. It is unborn, eternal, ever-existing, and primeval."
            <cite className="not-italic block mt-4 font-sans text-xs tracking-widest uppercase text-chalk">
              — Bhagavad Gita, Chapter 2
            </cite>
          </blockquote>
        </div>

        <p className="font-sans text-xs tracking-widest uppercase text-chalk hidden md:block">
          MMXXVI
        </p>
      </div>

      {/* RIGHT */}
      <div className="px-8 py-10 md:p-16 flex flex-col justify-between order-1 md:order-2">
        <p className="font-sans text-xs tracking-widest uppercase text-stone md:hidden mb-6">
          Veda — Vol. I
        </p>

        <div className="flex flex-col gap-8 md:gap-10">
          <h1 className="font-garamond font-normal leading-none tracking-tight text-ink text-7xl md:text-9xl">
            The<br /><em>Veda</em>
          </h1>

          <div className="flex flex-col gap-5 max-w-xs">
            <p className="font-garamond text-base md:text-lg leading-relaxed text-stone">
              A scholarly guide trained on the epics, Puranas, and philosophies of India. Explore mythology not as legend, but as living wisdom.
            </p>

            <button
              onClick={() => router.push('/chat')}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="cursor-pointer inline-flex items-center gap-3 px-8 py-4 bg-crimson text-paper font-sans text-xs tracking-widest uppercase w-fit transition-all duration-200 hover:bg-saffron active:scale-95 select-none"
            >
              Enter the Sacred Space
              <span className={`transition-transform duration-200 ${hovered ? 'translate-x-1' : ''}`}>
                →
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-chalk pt-6 grid grid-cols-3 gap-4 mt-8 md:mt-0">
          {TEXTS.map(t => (
            <p key={t} className="font-sans text-xs tracking-widest uppercase text-stone">
              {t}
            </p>
          ))}
        </div>
      </div>
    </main>
  )
}