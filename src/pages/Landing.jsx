import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SignInUser } from '../services/Auth'

const Landing = (props) => {
  const navigate = useNavigate()
  const errorMessage = document.getElementById('login-error-msg')
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formState)
    setFormState({
      email: '',
      password: ''
    })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/dashboard')
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          autoComplete="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          autoComplete="current-password"
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p id="login-error-msg"> </p>
      <Link to="./signup">
        <h2>Create Account</h2>
      </Link>
    </div>
  )
}

export default Landing
