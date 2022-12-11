import { useState, useEffect } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Signup = () => {
  let navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
    confirmPass: ''
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.password === formState.confirmPass) {
      document.getElementById('signup-msg').innerHTML = ' '
      const res = await RegisterUser({
        username: formState.username,
        email: formState.email,
        password: formState.password
      })
      console.log(res)
      if (res.msg === 'unique violation: email must be unique') {
        document.getElementById('signup-msg').innerHTML =
          'Account with that email address already exists!'
      } else if (res.msg === 'unique violation: username must be unique') {
        document.getElementById('signup-msg').innerHTML =
          'Account with that username already exists!'
      } else {
        setFormState({
          email: '',
          username: '',
          password: '',
          confirmPass: ''
        })
        navigate('/')
      }
    } else {
      document.getElementById('signup-msg').innerHTML =
        'Password does not match.'
    }
  }

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          onChange={handleChange}
          value={formState.email}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="Username"
          autoComplete="none"
          onChange={handleChange}
          value={formState.username}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          autoComplete="new-password"
          onChange={handleChange}
          value={formState.password}
          required
        />
        <label htmlFor="confirmPass">Confirm Password:</label>
        <input
          id="confirmPass"
          type="password"
          placeholder="confirm password"
          autoComplete="none"
          onChange={handleChange}
          value={formState.confirmPass}
          required
        />
        <button
          disabled={
            !formState.email ||
            !formState.username ||
            !formState.password ||
            !formState.confirmPass
          }
          type="submit"
        >
          Log In
        </button>
      </form>
      <p id="signup-msg"> </p>
    </div>
  )
}

export default Signup
