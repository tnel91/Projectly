import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const response = await Client.post('/register', data)
    return response.data
  } catch (error) {
    throw error
  }
}
