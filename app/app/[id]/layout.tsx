'use client'

import DropdownWrapper from '@/app/app/[id]/dropdown-wrapper'
import { getList } from '@/app/app/queries'
import React from 'react'
import { useAppStore } from '../_components/app-wrapper'
import { redirect } from 'next/navigation'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  // const list = await getList(params.id)
  const { lists } = useAppStore()
  const list = lists.find((l) => l.referenceId === params.id)
  if (!list) redirect('/app')

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
