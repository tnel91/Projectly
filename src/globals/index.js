export let BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://project-planner-backend.herokuapp.com/api'
    : 'http://localhost:3001/api'
