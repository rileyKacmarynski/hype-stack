'use client'

import { List } from '@/app/app/queries'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ListIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { RenamePopover } from './rename-popover'
import {
  RenameStoreProvider,
  useRenameStore,
} from '@/app/app/_components/rename-store'
import ListDropdownMenu from '@/app/app/_components/list-dropdown-menu'
import ListEmoji from './list-emoji'

export default function ListMenuItemWithRenameStore({ list }: { list: List }) {
  return (
    <RenameStoreProvider>
      <ListMenuItem list={list} />
    </RenameStoreProvider>
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
          <div onClick={(e) => e.preventDefault()}>
            <ListEmoji id={list.id}>{list.emoji}</ListEmoji>
          </div>
          <span className="sr-only @[100px]:not-sr-only @[100px]:truncate">
            {list.name}
          </span>
          <ListDropdownMenu list={list} showOnHover />
        </Link>
      </Button>
    </RenamePopover>
  )
}
