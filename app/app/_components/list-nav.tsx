'use client'

import { useAppStore } from './app-wrapper'
import ListMenuItem from './list-menu-item'

export default function ListNav() {
  const { lists } = useAppStore()

  return (
    <nav className="flex flex-col mb-1">
      {lists.map((l) => (
        <ListMenuItem key={l.referenceId} list={l} />
      ))}
    </nav>
  )
}
