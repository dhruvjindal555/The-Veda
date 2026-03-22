import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Veda — A Guide to Indian Mythology',
  description: 'A scholarly guide trained on the Mahabharata, Ramayana, Puranas and Vedic philosophy.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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