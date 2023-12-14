import { createContext, useContext, useState } from 'react'

export type RenameStore = {
  renaming: boolean
  setRenaming: (value: React.SetStateAction<boolean>) => void
}

const RenameStoreContext = createContext<RenameStore | null>(null)

export function useRenameStore() {
  const context = useContext(RenameStoreContext)
  if (!context)
    throw new Error('useRenameStore must be used within a context provider')

  return context
}

export function RenameStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [renaming, setRenaming] = useState(false)

  return (
    <RenameStoreContext.Provider value={{ renaming, setRenaming }}>
      {children}
    </RenameStoreContext.Provider>
  )
}
