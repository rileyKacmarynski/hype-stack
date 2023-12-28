import EmptyState from '@/app/app/(empty-state)/empty-state'
import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await currentUser()
  if (!user) redirect('/')

  let profile = await db.query.profiles.findFirst({
    where: eq(profiles.clerkId, user.id),
  })
  if (!profile) {
    // onboarding piece
    await db.insert(profiles).values({
      email: user.emailAddresses[0].emailAddress,
      clerkId: user.id,
      image: user.imageUrl,
    })

    // can't return from mysql I guess, oh well this will
    // be ran once
    profile = await db.query.profiles.findFirst({
      where: eq(profiles.clerkId, user.id),
    })
    if (!profile) throw new Error('unable to query profile')
  }

  const list = await db.query.lists.findFirst({
    columns: { referenceId: true },
    where: (lists, { eq }) => eq(lists.authorId, profile!.id),
    orderBy: (lists, { desc }) => [desc(lists.updatedAt)],
  })

  if (list) {
    redirect(`/app/${list.referenceId}`)
  }

  return <EmptyState />
}
