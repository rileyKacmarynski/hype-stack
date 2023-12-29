'use client'

import List from '@/app/app/[id]/list'
import { getList } from '@/app/app/queries'
import ListEmoji from '../_components/list-emoji'
import { useAppStore } from '../_components/app-wrapper'
import { redirect } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  // TODO: figure out some better state management solution
  const { lists } = useAppStore()
  const list = lists.find((l) => l.referenceId === params.id)
  if (!list) redirect('/app')

  return (
    <>
      <div className="text-3xl  flex px-6 pb-4 gap-2 items-center">
        <div className="w-8">
          <ListEmoji id={list.referenceId} emoji={list.emoji} />
        </div>
        <h1 className="ml-2 text-stone-800 dark:text-stone-300 font-semibold">
          {list.name}
        </h1>
      </div>
      <ul className="px-1">
        <List list={list} />
      </ul>
    </>
  )
}
