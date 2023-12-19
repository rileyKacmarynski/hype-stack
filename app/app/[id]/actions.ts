'use server'

import { getCurrentProfile, getList } from '@/app/app/queries'
import { db } from '@/db'
import { listItems } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const insertSchema = z.object({
  text: z.string().min(1),
  listId: z.coerce.number().min(1),
})

export async function createItem(form: FormData) {
  noStore()

  const profile = await getCurrentProfile()
  if (!profile) redirect('/')

  const validatedFields = insertSchema.safeParse({
    text: form.get('text'),
    listId: form.get('listId'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { listId, text } = validatedFields.data

  const list = await getList(listId)
  if (list.authorId !== profile.id) {
    redirect('/')
  }

  await db.insert(listItems).values({
    listId,
    text,
    completed: false,
  })

  revalidatePath('/app/[id]', 'page')

  return {
    text: '',
    errors: {
      text: undefined,
    },
  }
}

export async function toggleComplete(form: FormData) {
  const validatedFields = z.coerce
    .number()
    .min(1)
    .safeParse(form.get('listItemId'))
  if (!validatedFields.success) {
    console.log('form', validatedFields.error)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const item = await db.query.listItems.findFirst({
    where: eq(listItems.id, validatedFields.data),
  })

  if (!item) {
    return
  }

  await db
    .update(listItems)
    .set({
      completed: !item.completed,
      updatedAt: new Date(),
    })
    .where(eq(listItems.id, item.id))

  revalidatePath('/app/[id]', 'page')
}

export async function deleteItem(form: FormData) {
  const validatedFields = z.coerce
    .number()
    .min(1)
    .safeParse(form.get('listItemId'))
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const item = await db.query.listItems.findFirst({
    where: eq(listItems.id, validatedFields.data),
  })

  if (!item) {
    return
  }

  await db.delete(listItems).where(eq(listItems.id, validatedFields.data))

  revalidatePath('/app/[id]', 'page')
}