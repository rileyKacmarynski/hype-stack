import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <div className="px-4 h-8 flex border-b border-b-stone-200 dark:border-b-stone-800 text-stone-800 dark:text-stone-300 items-center text-sm">
          Journal
        </div>
      </header>
      <main className="flex-1 py-6 px-4">{children}</main>
    </>
  )
}
