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
      <header className="flex py-1 px-6 border-b border-stone-200 dark:border-stone-800 border-1 gap-2">
        <div className="ml-auto">
          <DropdownWrapper list={list} />
        </div>
      </header>
      <main className="flex-1 py-6">{children}</main>
    </>
  )
}
