import { useState, useEffect } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Signup = () => {
  let navigate = useNavigate()
  const errorMessage = document.getElementById('signup-error-msg')
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
      errorMessage.innerHTML = ' '
      await RegisterUser({
        username: formState.username,
        email: formState.email,
        password: formState.password
      })
      setFormState({
        email: '',
        username: '',
        password: '',
        confirmPass: ''
      })
      alert('Account Created! Please log in to continue.')
      navigate('/')
    } else {
      errorMessage.innerHTML = 'Password does not match.'
    }
  }

  return (
    <div className="text-center">
      <form className="m-auto" id="form-register" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-floating">
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Email:"
            autoComplete="email"
            onChange={handleChange}
            value={formState.email}
            required
          />
          <label htmlFor="email">Email:</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="username"
            placeholder="Username:"
            autoComplete="none"
            onChange={handleChange}
            value={formState.username}
            required
          />
          <label htmlFor="username">Username:</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Password:"
            autoComplete="new-password"
            onChange={handleChange}
            value={formState.password}
            required
          />
          <label htmlFor="password">Password:</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="confirmPass"
            type="password"
            placeholder="Confirm password:"
            autoComplete="none"
            onChange={handleChange}
            value={formState.confirmPass}
            required
          />
          <label htmlFor="confirmPass">Confirm Password:</label>
        </div>
        <button
          className="w-100 mt-2 btn btn-lg btn-primary"
          disabled={
            !formState.email ||
            !formState.username ||
            !formState.password ||
            !formState.confirmPass
          }
          type="submit"
        >
          Register
        </button>
      </form>
      <p id="signup-error-msg"> </p>
    </div>
  )
}

export default Signup
