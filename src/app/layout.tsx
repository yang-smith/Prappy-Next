import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Prappy',
  description: 'Let Prappy make you happy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>{children}
        <Analytics />
        </body>
    </html>
  )
}