import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BlockFit – Plan Your House on Any Block',
  description: 'BlockFit helps you visualize and validate how your house fits on real-world lots. Enter block dimensions, house size, and see clearances instantly.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'BlockFit – Plan Your House on Any Block',
    description: 'BlockFit helps you visualize and validate how your house fits on real-world lots. Enter block dimensions, house size, and see clearances instantly.',
    type: 'website',
    url: 'https://blockfit.com',
    siteName: 'BlockFit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BlockFit - House Planning Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlockFit – Plan Your House on Any Block',
    description: 'BlockFit helps you visualize and validate how your house fits on real-world lots. Enter block dimensions, house size, and see clearances instantly.',
    images: ['/og-image.png'],
  },
  keywords: ['house planning', 'block fit', 'property visualization', 'house dimensions', 'lot planning', 'real estate planning'],
  authors: [{ name: 'BlockFit' }],
  creator: 'BlockFit',
  publisher: 'BlockFit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
