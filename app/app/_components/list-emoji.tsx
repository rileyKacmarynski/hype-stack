'use client'

import EmojiPopover from '@/components/emoji-popover'
import { updateEmoji } from '../actions'
import { startTransition, useOptimistic } from 'react'
import { useAppStore } from './app-wrapper'

export default function ListEmoji({
  emoji,
  id,
}: {
  emoji: string
  id: string
}) {
  const { setLists } = useAppStore()

  function changeEmoji(emoji: string) {
    setLists((lists) =>
      lists.map((l) => (l.referenceId === id ? { ...l, emoji } : l))
    )

    startTransition(() => {
      updateEmoji({ emoji, id })
    })
  }

  return <EmojiPopover onChange={changeEmoji}>{emoji}</EmojiPopover>
}
