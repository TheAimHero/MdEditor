import { sql, relations } from 'drizzle-orm';
import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { accounts } from './auth';

export const users = sqliteTable('user', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text('name', { length: 255 }),
  email: text('email', { length: 255 }).notNull(),
  password: text('password', { length: 255 }),
  emailVerified: int('emailVerified', {
    mode: 'timestamp',
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text('image', { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
