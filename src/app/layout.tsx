import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Element Kimya',
  description: 'Element Kimya web sitesi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}