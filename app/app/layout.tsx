import SidePanel from '@/app/app/_components/side-panel'
import { createList } from '@/app/app/actions'
import { getUserLists } from '@/app/app/queries'
import ThemeToggle from '@/components/theme-toggle'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserButton, currentUser } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

import ListMenuItem from '@/app/app/_components/list-menu-item'
import AddListButton from './_components/add-list-button'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user) {
    redirect('/')
  }

  const lists = await getUserLists()

  return (
    <div className="flex min-h-screen ">
      <SidePanel className="@container/panel py-2 px-1 text-stone-500 dark:text-stone-300 gap-3">
        <div className="flex h-42 items-center justify-start gap-2 px-2 py-1">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                },
              },
            }}
          />
          <div className="text-sm font-medium tracking-wide truncate">
            {user.emailAddresses[0].emailAddress}
          </div>
        </div>
        <div>
          <nav className="flex flex-col mb-1">
            {lists.map((l) => (
              <ListMenuItem key={l.id} list={l} />
            ))}
          </nav>
          <AddListButton />
        </div>
        <ThemeToggle className="mt-auto -ml-1" />
      </SidePanel>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
