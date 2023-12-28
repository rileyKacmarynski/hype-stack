import List from '@/app/app/[id]/list'
import { getList } from '@/app/app/queries'
import ListEmoji from '../_components/list-emoji'

export default async function Page({ params }: { params: { id: string } }) {
  const list = await getList(params.id)

  console.log('calling getList from page')

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
