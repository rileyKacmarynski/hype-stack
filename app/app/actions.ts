'use server'

import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/app/app/queries'

export async function createList() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const { insertId } = await db.insert(lists).values({
    authorId: profile.id,
    name: 'Untitled',
  })

  return insertId
}

export async function createListWithRedirect() {
  const insertId = await createList()

  redirect(`/app/${insertId}`)
}
