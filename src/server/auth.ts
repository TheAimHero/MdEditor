import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/server/db';
import { env } from '@/env';
import { type Adapter } from 'next-auth/adapters';
import { users } from './db/schema/users';
import { accounts, sessions, verificationTokens } from './db/schema/auth';
import { type SQLiteTableFn, sqliteTable } from 'drizzle-orm/sqlite-core';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession['user'];
  }

  // interface User {
  //   role: "USER" | "MOD" | "ADMIN";
  // }
}

type TableFnParams = Parameters<SQLiteTableFn>;
function dumbAdapter(
  name: TableFnParams[0],
  columns: TableFnParams[1],
  extraConfig: TableFnParams[2],
) {
  switch (name) {
    case 'user':
      return users;
    case 'account':
      return accounts;
    case 'session':
      return sessions;
    case 'verification_token':
      return verificationTokens;
    default:
      return sqliteTable(name, columns, extraConfig);
  }
}

export const authOptions: NextAuthOptions = {
  // @fix: make the session callback object smaller
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
  },
  adapter: DrizzleAdapter(
    db,
    dumbAdapter as SQLiteTableFn<undefined>,
  ) as Adapter,
  pages: { signIn: '/auth/login', error: '/auth/error' },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Md.',
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        console.log(credentials);
        if (!credentials?.password || !credentials.password) {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, credentials.email),
          with: { accounts: true },
        });
        if (user?.accounts.length !== 0) {
          throw new Error('Sign in with Google');
        }
        if (!user) {
          const userArr = await db
            .insert(users)
            .values({
              email: credentials.email,
              password: await bcrypt.hash(credentials.password, 10),
              id: randomUUID(),
            })
            .returning();
          const user = userArr[0];
          if (!user) {
            throw new Error('Failed to create user');
          }
          return { id: user.id, email: user.email, name: user.name };
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password!,
        );
        if (isValid) return { id: user.id, email: user.email, name: user.name };
        return null;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);
