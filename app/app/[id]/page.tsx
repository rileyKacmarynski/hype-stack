import List from '@/app/app/[id]/list'
import { getList } from '@/app/app/queries'
import { ListIcon } from 'lucide-react'

export default async function Page({ params }: { params: { id: number } }) {
  const list = await getList(params.id)

  return (
    <>
      <div className="flex px-6 pb-4 gap-2 items-center">
        <ListIcon className="h-8 w-8" />
        <h1 className="text-3xl text-stone-800 dark:text-stone-300 font-semibold">
          {list.name}
        </h1>
      </div>
      <ul className="px-1">
        <List list={list} />
      </ul>
    </>
  )
}
