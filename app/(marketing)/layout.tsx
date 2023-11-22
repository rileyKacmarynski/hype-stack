import Logo from '@/app/(marketing)/_components/logo'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
  currentUser,
} from '@clerk/nextjs'
import Link from 'next/link'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  return (
    <div className="">
      <div
        className={cn(
          'container fixed top-0 flex items-center justify-between h-14 bg-stone-50 dark:bg-stone-900 w-full border-b border-b-transparent'
          // apply these if we're not at the top
          // 'border-b-stone-200 dark:border-b-stone-700 '
        )}
      >
        <Logo />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button asChild size="xs">
                <Link href="/app">Go to app</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton redirectUrl="/app" mode="modal">
                <Button size="xs" variant="ghost">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton redirectUrl="/app" mode="modal">
                <Button size="xs" variant="default">
                  Try for free
                </Button>
              </SignUpButton>
            </>
          )}
          <ThemeToggle className="-ml-2" />
        </div>
      </div>
      <main className="container pt-14">{children}</main>
    </div>
  )
}
