import { relations, sql } from 'drizzle-orm'
import {
  int,
  text,
  timestamp,
  boolean,
  mysqlTableCreator,
  serial,
} from 'drizzle-orm/mysql-core'
import { ListenOptions } from 'net'

// export const hypeStack = mysqlSchema('hype_stack')
const hypestackTable = mysqlTableCreator((name) => `hype_stack_${name}`)

export const profiles = hypestackTable('profiles', {
  id: serial('id').primaryKey(),
  clerkId: text('clerk_id').notNull(),
  // just grab image that clerk creates
  image: text('image').notNull(),
  email: text('email').notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type Profile = typeof profiles.$inferSelect
export type CreateProfile = typeof profiles.$inferInsert

export const lists = hypestackTable('lists', {
  id: serial('id').primaryKey(),
  authorId: int('author_id').notNull(),
  name: text('name'),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type List = typeof lists.$inferSelect
export type CreateList = typeof lists.$inferInsert

export const listItems = hypestackTable('list_items', {
  id: serial('id').primaryKey(),
  listId: int('list_id'),
  text: text('text'),
  completed: boolean('completed'),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type ListItem = typeof listItems.$inferSelect
export type CreateListItem = typeof listItems.$inferInsert

export const profileRelations = relations(profiles, ({ many }) => ({
  lists: many(lists),
}))

export const listsRelations = relations(lists, ({ many, one }) => ({
  listItems: many(listItems),
  author: one(profiles, {
    fields: [lists.authorId],
    references: [profiles.id],
  }),
}))

export const listItemsRelations = relations(listItems, ({ one }) => ({
  list: one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  }),
}))
