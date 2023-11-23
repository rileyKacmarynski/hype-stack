import SidePanel from '@/app/app/_components/side-panel'
import { createList } from '@/app/app/actions'
import { getUserLists } from '@/app/app/queries'
import ThemeToggle from '@/components/theme-toggle'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { UserButton, currentUser } from '@clerk/nextjs'
import { ListIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

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

  console.log(lists)

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
              <Button
                key={l.id}
                variant="ghost"
                className="w-full rounded-sm py-1 px-2 hover:bg-stone-200 hover:text-stone-500 group gap-2 justify-start h-auto"
                asChild
              >
                <Link href={`/app/${l.id}`}>
                  <ListIcon className="h-5 w-5 group-hover:text-stone-400 text-stone-400" />
                  <span className="truncate sr-only @[100px]:not-sr-only">
                    {l.name}
                  </span>
                </Link>
              </Button>
            ))}
          </nav>
          <form action={createList}>
            <PanelItem type="submit" Icon={PlusIcon}>
              Add a list
            </PanelItem>
          </form>
        </div>
        <ThemeToggle className="mt-auto -ml-1" />
      </SidePanel>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}

export interface PanelItemProps extends ButtonProps {
  // TODO: I'll have to figure something out if we want emojis here too
  Icon: typeof PlusIcon
}

export function PanelItem({
  children,
  Icon,
  asChild,
  ...buttonProps
}: PanelItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full rounded-sm py-1 px-2 hover:bg-stone-200 hover:text-stone-500 group gap-2 justify-start h-auto',
        buttonProps?.className
      )}
      {...buttonProps}
    >
      <Icon className="h-5 w-5 group-hover:text-stone-400 text-stone-400" />
      <span className="truncate sr-only @[100px]:not-sr-only">{children}</span>
    </Button>
  )
}
