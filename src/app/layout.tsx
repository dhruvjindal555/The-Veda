import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Veda — A Guide to Indian Mythology',
  description: 'A scholarly guide trained on the Mahabharata, Ramayana, Puranas and Vedic philosophy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body className="bg-paper text-ink antialiased" >
        {children}
      </body>
    </html>
  )
}