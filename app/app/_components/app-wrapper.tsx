'use client'

import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { List } from '../queries'

export type StateProps = {
  lists: List[]
}

export type AppStore = StateProps & {
  setLists: (value: React.SetStateAction<List[]>) => void
}

const AppContext = createContext<AppStore | null>(null)

export function useAppStore() {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('useRenameStore must be used within a context provider')

  return context
}

export default function AppWrapper({
  children,
  lists,
}: {
  children: React.ReactNode
  lists: List[]
}) {
  // TODO: figure out some better state management solution
  const [state, setState] = useState(lists)

  // I don't like this. Let's see how it works
  // if the lists we get from the server change, use those
  useEffect(() => {
    console.log('got new lists from the server', lists)
    setState(lists)
  }, [lists])

  return (
    <AppContext.Provider value={{ lists: state, setLists: setState }}>
      {children}
    </AppContext.Provider>
  )
}
