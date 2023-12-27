'use client'

import { useTheme } from 'next-themes'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import useIsMounted from '@/lib/hooks/use-is-mounted'
import { useState } from 'react'

export type EmojiPickerProps = {
  onChange: (emoji: string) => void
  children: React.ReactNode
  asChild?: boolean
}

export default function EmojiPopover({
  onChange,
  children,
  asChild,
}: EmojiPickerProps) {
  const [picking, setPicking] = useState(false)
  const { resolvedTheme } = useTheme()

  const isMounted = useIsMounted()
  if (!isMounted) return null

  const themeMap = {
    dark: 'dark',
    light: 'light',
  }
  const pickerTheme =
    themeMap[(resolvedTheme || 'light') as keyof typeof themeMap]

  function pickEmoji(emoji: string) {
    onChange(emoji)
    setPicking(false)
  }

  return (
    <Popover open={picking} onOpenChange={setPicking}>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none truncate">
        <Picker
          data={data}
          theme={resolvedTheme}
          height={350}
          onEmojiSelect={(data: { native: string }) => pickEmoji(data.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
