import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font'

export const metadata: Metadata = {
  title: 'Hype Stack',
  description: 'App built on the most hype tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-stone-50 dark:bg-stone-900 font-sans antialiased',
          GeistSans.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
