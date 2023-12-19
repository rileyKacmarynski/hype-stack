'use client'

import { cn } from '@/lib/utils'
import {
  useScroll,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { useState } from 'react'

const borderOffset = 72

export default function Header({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, borderOffset], [96, 56])
  const [showBorder, setShowBorder] = useState(scrollY.get() > 0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest <= borderOffset && showBorder) {
      setShowBorder(false)
    } else if (latest > borderOffset && !showBorder) {
      setShowBorder(true)
    }
  })

  return (
    <motion.div
      style={{ height }}
      className={cn(
        'container z-10 fixed top-0 flex items-center justify-between h-14 bg-stone-50 dark:bg-stone-900 w-full border-b border-b-transparent',
        showBorder && 'border-b-stone-200 dark:border-b-stone-700 '
      )}
    >
      {children}
    </motion.div>
  )
}
