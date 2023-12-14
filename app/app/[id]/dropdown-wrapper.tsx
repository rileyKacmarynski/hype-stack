'use client'

import ListDropdownMenu from '@/app/app/_components/list-dropdown-menu'
import { RenamePopover } from '@/app/app/_components/rename-popover'
import { RenameStoreProvider } from '@/app/app/_components/rename-store'
import { List } from '@/app/app/queries'

export default function DropdownWrapper({ list }: { list: List }) {
  return (
    <RenameStoreProvider>
      <RenamePopover list={list}>
        <ListDropdownMenu list={list} />
      </RenamePopover>
    </RenameStoreProvider>
  )
}
