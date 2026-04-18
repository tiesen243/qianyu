export default {
  appName: process.env.APP_NAME ?? process.env.npm_package_name ?? 'api',
  appVersion:
    process.env.APP_VERSION ?? process.env.npm_package_version ?? '0.0.0',
  appUrl: process.env.APP_URL ?? 'http://localhost:3000',

  port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000,
  env: process.env.NODE_ENV ?? 'development',

  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=public',
}
