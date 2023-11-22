import Logo from '@/app/(marketing)/_components/logo'
import SidePanel from '@/app/app/_components/side-panel'
import ThemeToggle from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { UserButton, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <SidePanel>
        <div className="flex h-42 items-center justify-start gap-2 py-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  // width: '24px',
                  // height: '24px',
                },
              },
            }}
          />
          <div className="text-sm font-medium text-stone-500 tracking-wide dark:text-stone-300 truncate">
            {user.emailAddresses[0].emailAddress}
          </div>
        </div>
        <nav className="truncate">nav goes here</nav>
        <ThemeToggle className="mt-auto -ml-1" />
      </SidePanel>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
