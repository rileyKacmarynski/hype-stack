'use client'

import { useRenameStore } from '@/app/app/_components/rename-store'
import { deleteList, updateEmoji } from '@/app/app/actions'
import { List } from '@/app/app/queries'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { MoreHorizontalIcon, PenIcon, TrashIcon } from 'lucide-react'

export default function ListDropdownMenu({
  list,
  showOnHover = false,
}: {
  list: List
  showOnHover?: boolean
}) {
  const { setRenaming } = useRenameStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'ml-auto h-6 px-1 hover:bg-stone-300 hover:dark:bg-stone-700',
            showOnHover && 'text-transparent group-hover/item:text-current'
          )}
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.preventDefault()} className="w-48">
        <DropdownMenuItem className="w-full" onClick={() => setRenaming(true)}>
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
  )
}
