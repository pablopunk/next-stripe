const dev = process.env.NODE_ENV !== 'production'

export const SITE_URL = dev
  ? 'http://localhost:3000'
  : 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL
export const API_URL = SITE_URL + '/api'
