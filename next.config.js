/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AIRTABLE_KEY: process.env.AIRTABLE_KEY,
    DATABASE_ID: process.env.DATABASE_ID
  }
}

module.exports = nextConfig
