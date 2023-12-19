'use client'

import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
      <Toaster />
    </ThemeProvider>
  )
}
