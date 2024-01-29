import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '@/env.js';
import * as auth from './schema/auth';
import * as users from './schema/users';

const schema = { ...auth, ...users };

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: LibSQLDatabase<typeof schema> | undefined;
}

let db: LibSQLDatabase<typeof schema>;

if (env.NODE_ENV === 'production') {
  db = drizzle(client, { schema });
} else {
  if (!global.db) global.db = drizzle(client, { schema });
  db = global.db;
}

export { db };
