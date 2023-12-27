'use client'

import { createItem, deleteItem, toggleComplete } from '@/app/app/[id]/actions'
import { ListWithItems } from '@/app/app/queries'
import EmojiPopover from '@/components/emoji-popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { TrashIcon } from 'lucide-react'
import React, { startTransition, useRef, useState } from 'react'

export default function ListView({ list }: { list: ListWithItems }) {
  const [emoji, setEmoji] = useState('')

  return (
    <AnimatePresence initial={false}>
      {list.listItems.map((item) => (
        <motion.li
          transition={{
            type: 'tween',
            ease: 'easeIn',
            duration: 0.2,
            opacity: { duration: 0.1 },
          }}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="group"
          key={item.id}
        >
          <div className="flex items-center py-1 pb-1">
            <DeleteItem id={item.id} text={item.text} />
            <ToggleComplete item={item} />
          </div>
        </motion.li>
      ))}
      <li key="form">
        <ListItemForm listId={list.id} />
      </li>
    </AnimatePresence>
  )
}

function ListItemForm({ listId }: { listId: number }) {
  const ref = useRef<HTMLFormElement | null>(null)

  async function onAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    await createItem(data)
    ref.current?.reset()
  }

  return (
    <div className="w-full max-w-[400px] flex flex-grow items-center gap-3 py-1 mb-1 ml-6">
      <Checkbox disabled checked={false} />
      <form ref={ref} onSubmit={onAddItem}>
        <Input
          type="text"
          name="text"
          className="h-auto p-0 text-base border-t-0 border-b border-l-0 border-r-0 rounded-none outline-none ring-0 border-b-stone-400 text-stone-600 focus:ring-0 focus:placeholder:text-transparent placeholder:text-stone-400"
          placeholder="Add item"
        />
        <input type="hidden" name="listId" value={listId} />
        <button type="submit" className="hidden" />
      </form>
    </div>
  )
}

function DeleteItem({ id, text }: { id: number; text: string | null }) {
  function onDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(() => {
      deleteItem(data)
    })
  }

  return (
    <form className="top-[2.5px] relative" onSubmit={onDelete}>
      <input type="hidden" name="listItemId" value={id} />
      <Button
        variant="ghost"
        aria-label={`delete item ${text}`}
        className="w-5 h-5 p-0 mr-1 transition opacity-0 text-stone-400 focus:ring-0 focus:opacity-100 group-hover:opacity-100 focus:bg-stone-100 dark:focus:bg-stone-800"
      >
        <TrashIcon className="w-4 h-4 stroke-2" />
      </Button>
    </form>
  )
}

function ToggleComplete({
  item,
}: {
  item: ListWithItems['listItems'][number]
}) {
  const ref = useRef<HTMLFormElement | null>(null)

  function onToggleCheck(e: React.FormEvent<HTMLFormElement>) {
    console.log('in on submit')
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(() => {
      toggleComplete(data)
    })
  }

  return (
    <>
      <form className="top-1 relative" ref={ref} onSubmit={onToggleCheck}>
        <input type="hidden" name="listItemId" value={item.id} />
        <Checkbox
          className=""
          onCheckedChange={(e) => {
            // I guess this doesn't work
            // ref.current?.submit()
            const event = new Event('submit', { bubbles: true })
            ref?.current?.dispatchEvent(event)
          }}
          checked={item.completed ?? false}
          id={`item-${item.id}`}
        />
      </form>
      <label
        className={cn(
          'text-stone-600 dark:text-stone-100 relative pl-3 cursor-pointer transition duration-300',
          'before:absolute before:h-[2px] before:w-[calc(100%-0.75rem)]',
          'before:transition  before:duration-200 before:scale-x-0 before:origin-left before:bg-transparent before:top-1/2',
          item.completed &&
            'text-stone-400 dark:text-stone-400  before:bg-stone-400 before:scale-x-100'
        )}
        htmlFor={`item-${item.id}`}
      >
        {item.text}
      </label>
    </>
  )
}
