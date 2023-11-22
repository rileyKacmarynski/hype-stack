'use server'

import { currentUser } from '@clerk/nextjs'
import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function createList() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const { insertId } = await db.insert(lists).values({
    authorId: profile.id,
    name: 'Untitled',
  })

  redirect(`/app/${insertId}`)
}

async function getCurrentProfile() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  return db.query.profiles.findFirst({
    where: eq(profiles.clerkId, clerkUser.id),
  })
}
