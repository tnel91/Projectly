import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const response = await Client.post('/register', data)
    return `${response.data.username} account created`
  } catch (error) {
    let errorMsg = document.getElementById('signup-error-msg')
    let res = error.response.data
    if (res.msg === 'unique violation: email must be unique') {
      errorMsg.innerHTML = 'Account with that email address already exists!'
    } else if (res.msg === 'unique violation: username must be unique') {
      errorMsg.innerHTML = 'Account with that username already exists!'
    }
    throw error
  }
}

export const SignInUser = async (data) => {
  try {
    const response = await Client.post('/login', data)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    let errorMsg = document.getElementById('login-error-msg')
    errorMsg.innerText = `${error.response.data.response}`
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
