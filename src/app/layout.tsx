import type { Metadata } from 'next'
import './globals.css'


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
        <body>{children}</body>
    </html>
  )
}