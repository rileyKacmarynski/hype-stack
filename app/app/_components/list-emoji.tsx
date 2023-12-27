'use client'

import EmojiPopover from '@/components/emoji-popover'
import { updateEmoji } from '../actions'
import { startTransition } from 'react'

export default function ListEmoji({
  children,
  id,
}: {
  children: React.ReactNode
  id: number
}) {
  function changeEmoji(emoji: string) {
    startTransition(() => {
      updateEmoji({ emoji, id })
    })
  }

  return <EmojiPopover onChange={changeEmoji}>{children}</EmojiPopover>
}
