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
  console.log('emoji', emoji)

  const [optimisticEmoji, changeOptimistic] = useOptimistic(
    emoji,
    (state, optimisticValue) =>
      typeof optimisticValue === 'string' ? optimisticValue : state
  )
  console.log('optimistic', optimisticEmoji)

  function changeEmoji(emoji: string) {
    // I think I'm supposed to use a transition here
    startTransition(() => {
      changeOptimistic(emoji)
      updateEmoji({ emoji, id })
    })
  }

  return <EmojiPopover onChange={changeEmoji}>{optimisticEmoji}</EmojiPopover>
}
