import List from '@/app/app/[id]/list'
import { getList } from '@/app/app/queries'

export default async function Page({ params }: { params: { id: number } }) {
  const list = await getList(params.id)

  return (
    <ul className="mt-3">
      <List list={list} />
    </ul>
  )
}
