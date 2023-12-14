'use server'

import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/app/app/queries'
import { revalidatePath } from 'next/cache'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export async function createList() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const { insertId } = await db.insert(lists).values({
    authorId: profile.id,
    name: 'Untitled',
  })

  revalidatePath('/app', 'layout')
  return insertId
}

export async function createListWithRedirect() {
  const insertId = await createList()

  redirect(`/app/${insertId}`)
}

export async function deleteList(id: number) {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  await db
    .delete(lists)
    .where(and(eq(lists.id, id), eq(lists.authorId, profile.id)))

  revalidatePath('/app', 'layout')
  revalidatePath('/app/[id]', 'layout')
}

const updateSchema = z.object({
  name: z.string().min(1),
  id: z.coerce.number().min(1),
})

export async function updateList(form: FormData) {
  const validatedFields = updateSchema.safeParse({
    name: form.get('name'),
    id: form.get('id'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, id } = validatedFields.data

  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  await db
    .update(lists)
    .set({ name })
    .where(and(eq(lists.id, id), eq(lists.authorId, profile.id)))

  revalidatePath('/app', 'layout')
  revalidatePath('/app/[id]', 'layout')
}
