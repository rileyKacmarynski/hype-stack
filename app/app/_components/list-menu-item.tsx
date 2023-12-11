'use client'

import { deleteList, updateList } from '@/app/app/actions'
import { List } from '@/app/app/queries'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { PopoverAnchor } from '@radix-ui/react-popover'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import {
  ChevronRight,
  ChevronRightIcon,
  ListIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  PenIcon,
  PenSquareIcon,
  SaveIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useTransition,
} from 'react'
import { useFormStatus } from 'react-dom'
import { create, createStore, useStore } from 'zustand'
import { useRouter } from 'next/navigation'

type RenameStore = {
  renaming: boolean
  setRenaming: (value: React.SetStateAction<boolean>) => void
}

const RenameStoreContext = createContext<RenameStore | null>(null)

function useRenameStore() {
  const context = useContext(RenameStoreContext)
  if (!context)
    throw new Error('useRenameStore must be used within a context provider')

  return context
}

export default function ListWithRenameStore({ list }: { list: List }) {
  const [renaming, setRenaming] = useState(false)

  return (
    <RenameStoreContext.Provider value={{ renaming, setRenaming }}>
      <ListMenuItem list={list} />
    </RenameStoreContext.Provider>
  )
}

function ListMenuItem({ list }: { list: List }) {
  const { id } = useParams()
  const { setRenaming } = useRenameStore()

  return (
    <RenamePopover list={list}>
      <Button
        key={list.id}
        variant="ghost"
        className={cn(
          'w-full rounded-sm py-1 px-2 hover:bg-stone-200 hover:text-stone-500 group/item gap-2 justify-start h-auto',
          Number(id) === list.id &&
            'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-100'
        )}
        asChild
      >
        <Link href={`/app/${list.id}`}>
          <ListIcon className="h-5 w-5 shrink-0 text-stone-400" />
          <span className="sr-only @[100px]:not-sr-only @[100px]:truncate">
            {list.name}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                // TODO: make this work with the container query stuff so it doesn't show when collapsed
                className="ml-auto h-6 px-1 text-transparent group-hover/item:text-current hover:bg-stone-300 hover:dark:bg-stone-700"
              >
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onClick={(e) => e.preventDefault()}
              className="w-48"
            >
              <DropdownMenuItem
                className="w-full"
                onClick={() => setRenaming(true)}
              >
                <PenIcon className="h-4 w-4 mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => deleteList(list.id)}
                className="focus:text-rose-950 focus:bg-rose-100/60 dark:focus:bg-rose-950/30 dark:focus:text-rose-100"
              >
                <TrashIcon className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Link>
      </Button>
    </RenamePopover>
  )
}

function RenamePopover({
  children,
  list,
}: {
  children: React.ReactNode
  list: List
}) {
  const { renaming, setRenaming } = useRenameStore()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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
          <input name="id" type="hidden" value={list.id} />
          <Button
            aria-label="submit form"
            variant="ghost"
            size="icon"
            className="h-8 "
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
