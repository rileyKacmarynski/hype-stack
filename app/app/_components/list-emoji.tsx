'use client'

import EmojiPopover from '@/components/emoji-popover'
import { updateEmoji } from '../actions'
import { startTransition, useOptimistic } from 'react'

export default function ListEmoji({
  emoji,
  id,
}: {
  emoji: string
  id: number
}) {
  function changeEmoji(emoji: string) {
    startTransition(() => {
      updateEmoji({ emoji, id })
    })
  }

  return <EmojiPopover onChange={changeEmoji}>{emoji}</EmojiPopover>
}
