'use client'

import { PlusIcon } from 'lucide-react'
import { PanelItem } from './panel-item'
import { createList } from '../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AddListButton() {
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const toastId = toast.loading('Creating list')
    const listId = await createList()
    toast.success('List created', {
      id: toastId,
      action: {
        label: 'take me there',
        onClick: () => router.push(`/app/${listId}`),
      },
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <PanelItem type="submit" Icon={PlusIcon}>
        Add a list
      </PanelItem>
    </form>
  )
}
