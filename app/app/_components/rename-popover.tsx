'use client'
import { updateList } from '@/app/app/actions'
import { List } from '@/app/app/queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverAnchor } from '@radix-ui/react-popover'
import EmojiPopover from '@/components/emoji-popover'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Loader2Icon, PenSquareIcon } from 'lucide-react'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useRenameStore } from '@/app/app/_components/rename-store'

export function RenamePopover({
  children,
  list,
}: {
  children: React.ReactNode
  list: List
}) {
  const { renaming, setRenaming } = useRenameStore()
  const [isPending, startTransition] = useTransition()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(async () => {
      await updateList(data)
      setRenaming(false)
    })
  }

  return (
    <Popover modal={true} open={renaming} onOpenChange={setRenaming}>
      <PopoverAnchor />
      {children}
      <PopoverContent className="p-1">
        <form
          // I can show a loading indicator, but there's
          // no way to hide the popover after the form submit
          // action={updateList}
          onSubmit={onSubmit}
          className="flex text-stone-600 dark:text-stone-300 gap-1 items-center"
        >
          <Input
            name="name"
            type="text"
            defaultValue={list.name ?? 'Untitled'}
            className="p-1 h-8"
            disabled={isPending}
          />
          <input name="id" type="hidden" value={list.referenceId} />
          <Button
            aria-label="submit form"
            variant="ghost"
            size="icon"
            className="h-8"
            type="submit"
            disabled={isPending}
          >
            <MotionConfig transition={{ duration: 0.125 }}>
              <AnimatePresence mode="wait">
                {!isPending ? (
                  <motion.div
                    key="pen"
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <PenSquareIcon className="h-6 w-6 text-stone-500 dark:text-stone-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="loader"
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2Icon className="h-6 w-6 text-stone-500 animate-spin dark:text-stone-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
