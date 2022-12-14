// export let BASE_URL = 'https://project-planner-backend.herokuapp.com/api'
// export let BASE_URL = 'http://localhost:3001/api'
export let BASE_URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? 'https://project-planner-backend.herokuapp.com/api'
    : 'http://localhost:3001/api'
