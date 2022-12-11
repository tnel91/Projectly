import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const response = await Client.post('/register', data)
    return `${response.data.username} account created`
  } catch (error) {
    return error.response.data
  }
}
