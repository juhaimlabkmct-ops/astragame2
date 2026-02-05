import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Wrong Click | ASTRA',
  description: 'You are online. The internet is watching. A Cyber Awareness Game.',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#050510',
}

import CyberBackground from '@/components/ui/CyberBackground'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <CyberBackground />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  )
}
