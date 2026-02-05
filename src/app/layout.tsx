import type { Metadata } from 'next'
import { Orbitron } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'One Wrong Click | ASTRA',
  description: 'You are online. The internet is watching. A Cyber Awareness Game.',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#050510',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={orbitron.variable}>
        <div className="scanlines" />
        {children}
      </body>
    </html>
  )
}
