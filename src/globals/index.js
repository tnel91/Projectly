// export let BASE_URL = 'http://localhost:3001/api'
export let BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
