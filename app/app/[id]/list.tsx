'use client'

import { createItem, deleteItem, toggleComplete } from '@/app/app/[id]/actions'
import { List, ListWithItems } from '@/app/app/queries'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { TrashIcon } from 'lucide-react'
import React, { startTransition, useRef } from 'react'
import { useAppStore } from '../_components/app-wrapper'
import { nanoid } from 'nanoid'

export default function ListView({ list }: { list: ListWithItems }) {
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
          key={item.referenceId}
        >
          <div className="flex items-center py-1 pb-1">
            <DeleteItem id={item.referenceId} text={item.text} />
            <ToggleComplete item={item} />
          </div>
        </motion.li>
      ))}
      <li key="form">
        <ListItemForm listId={list.referenceId} />
      </li>
    </AnimatePresence>
  )
}

function ListItemForm({ listId }: { listId: string }) {
  const ref = useRef<HTMLFormElement | null>(null)
  const { setLists } = useAppStore()

  async function onAddItem(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const id = nanoid()

    setLists((lists) =>
      lists.map((l) => {
        if (l.referenceId === listId) {
          const newItem: List['listItems'][number] = {
            referenceId: id,
            text: data.get('text')?.toString() ?? '',
            id: 1,
            listId: l.id,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          return { ...l, listItems: [...l.listItems, newItem] }
        }
        return l
      })
    )
    ref.current?.reset()

    await createItem(data, id)
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

function DeleteItem({ id, text }: { id: string; text: string | null }) {
  const { setLists } = useAppStore()

  function onDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLists((lists) =>
      lists.map((l) => {
        if (l.listItems.find((i) => i.referenceId === id)) {
          return {
            ...l,
            listItems: l.listItems.filter((i) => i.referenceId !== id),
          }
        }
        return l
      })
    )

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
  const { setLists } = useAppStore()

  function onToggleCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // yo, this sucks
    setLists((lists) =>
      lists.map((l) => {
        if (l.listItems.find((i) => i.referenceId === item.referenceId)) {
          const newList = {
            ...l,
            listItems: l.listItems.map((i) =>
              i.referenceId === item.referenceId
                ? { ...i, completed: !i.completed }
                : i
            ),
          }

          return newList
        }
        return l
      })
    )

    const data = new FormData(e.currentTarget)
    startTransition(() => {
      toggleComplete(data)
    })
  }

  return (
    <>
      <form className="top-1 relative" ref={ref} onSubmit={onToggleCheck}>
        <input type="hidden" name="listItemId" value={item.referenceId} />
        <Checkbox
          className=""
          onCheckedChange={(e) => {
            // I guess this doesn't work
            // ref.current?.submit()
            const event = new Event('submit', { bubbles: true })
            ref?.current?.dispatchEvent(event)
          }}
          checked={item.completed ?? false}
          id={`item-${item.referenceId}`}
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
        htmlFor={`item-${item.referenceId}`}
      >
        {item.text}
      </label>
    </>
  )
}
