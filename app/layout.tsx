import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import { GeistSans } from 'geist/font'
import { ClerkProvider } from '@clerk/nextjs'

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
    <ClerkProvider
    // appearance={{
    //   baseTheme: dark,
    //   variables: { colorBackground: '#292524', shadowShimmer: '#0c0a09' },
    // }}
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-stone-50 text-stone-900 dark:text-stone-100 dark:bg-stone-900 font-sans antialiased',
            GeistSans.className
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
