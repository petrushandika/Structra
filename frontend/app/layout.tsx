import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Structra - AI UI Structure Engineering Engine',
  description: 'Transform visual designs into maintainable frontend structures',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <div className="ml-60 min-h-screen bg-black">{children}</div>
      </body>
    </html>
  )
}
