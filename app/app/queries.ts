import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getList = cache(async (id: string) => {
  const list = await db.query.lists.findFirst({
    with: {
      listItems: true,
    },
    where: eq(lists.referenceId, id),
  })

  // this component queries for the
  // most recently update list and opens that one
  // not sure I like relying on the server component
  // to have that logic
  if (!list) {
    redirect('/app')
  }

  return list
})

export type ListWithItems = Awaited<ReturnType<typeof getList>>

export const getUserLists = cache(async () => {
  const profile = await getCurrentProfile()
  if (!profile) {
    redirect('/')
  }

  return await db.query.lists.findMany({
    where: eq(lists.authorId, profile.id),
    orderBy: [desc(lists.updatedAt)],
  })
})

export type List = Awaited<ReturnType<typeof getUserLists>>[number]

export const getCurrentProfile = cache(async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  return db.query.profiles.findFirst({
    where: eq(profiles.clerkId, clerkUser.id),
  })
})
