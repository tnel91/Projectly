import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Landing = () => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
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
      <Link to="./signup">
        <h2>Create Account</h2>
      </Link>
    </div>
  )
}

export default Landing
