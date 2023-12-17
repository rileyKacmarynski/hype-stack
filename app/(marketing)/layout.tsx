import Logo from '@/app/(marketing)/_components/logo'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SignInButton,
  SignUpButton,
  UserButton,
  currentUser,
} from '@clerk/nextjs'
import Link from 'next/link'
import Header from './_components/header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  return (
    <div>
      <Header>
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
      </Header>
      <main className="container pt-28">{children}</main>
    </div>
  )
}
