import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getList = cache(async (id: number) => {
  const list = await db.query.lists.findFirst({
    with: {
      listItems: true,
    },
    where: eq(lists.id, id),
  })

  if (!list) {
    redirect('/')
  }

  return list
})

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
