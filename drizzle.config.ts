import type { Config } from 'drizzle-kit'
import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

console.log(process.env.DATABASE_USERNAME)

export default {
  schema: './db/schema.ts',
  out: './drizzle/migrations',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    // host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME!,
    uri: process.env.DATABASE_URI!,
  },
} satisfies Config
