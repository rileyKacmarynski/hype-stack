'use server'

import { db } from '@/db'
import { lists, profiles } from '@/db/schema'
import { redirect } from 'next/navigation'
import { getCurrentProfile } from '@/app/app/queries'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { and, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export async function createList() {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const { insertId } = await db.insert(lists).values({
    authorId: profile.id,
    name: 'Untitled',
    emoji: '📄',
    referenceId: nanoid(),
  })

  revalidatePath('/app', 'layout')
  return insertId
}

export async function createListWithRedirect() {
  const insertId = await createList()

  redirect(`/app/${insertId}`)
}

export async function deleteList(id: string) {
  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  await db
    .delete(lists)
    .where(and(eq(lists.referenceId, id), eq(lists.authorId, profile.id)))

  revalidatePath('/app', 'layout')
  revalidatePath('/app/[id]', 'page')
}

const updateSchema = z.object({
  name: z.string().min(1),
  id: z.string().min(1),
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
    .where(and(eq(lists.referenceId, id), eq(lists.authorId, profile.id)))

  revalidatePath('/app', 'layout')
  revalidatePath('/app/[id]', 'page')
}

const updateEmojiSchema = z.object({
  emoji: z.string().emoji(),
  id: z.string().min(1),
})

// making this form data is probably a best practice
// but this is easier for the emoji picker
export async function updateEmoji(fields: { id: string; emoji: string }) {
  noStore()
  const validatedFields = updateEmojiSchema.safeParse(fields)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const { emoji, id } = validatedFields.data

  await db
    .update(lists)
    .set({ emoji })
    .where(and(eq(lists.referenceId, id), eq(lists.authorId, profile.id)))

  revalidatePath('/app', 'layout')
  revalidatePath('/app/[id]', 'page')
}
