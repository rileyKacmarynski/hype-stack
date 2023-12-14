import DropdownWrapper from '@/app/app/[id]/dropdown-wrapper'
import ListDropdownMenu from '@/app/app/_components/list-dropdown-menu'
import { RenameStoreProvider } from '@/app/app/_components/rename-store'
import { getList } from '@/app/app/queries'
import { ListIcon } from 'lucide-react'
import React from 'react'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: number }
}) {
  const list = await getList(params.id)

  return (
    <>
      <header className="flex py-1  px-4  gap-2">
        <div className="gap-2 flex border-b border-b-stone-200 dark:border-b-stone-800 text-stone-700 dark:text-stone-300 items-center text-sm">
          <ListIcon className="h-5 w-5 shrink-0 text-stone-400" />
          {list.name}
        </div>
        <div className="ml-auto">
          <DropdownWrapper list={list} />
        </div>
      </header>
      <main className="flex-1 py-6 px-4">{children}</main>
    </>
  )
}
