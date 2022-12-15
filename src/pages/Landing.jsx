import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
    <div className="text-center">
      <h1>Spicy Burps</h1>
      <form id="form-signin" className="m-auto" onSubmit={handleSubmit}>
        <h3>Welcome!</h3>
        <h1 className="h3 m-3">Please sign in</h1>
        <div className="form-floating">
          <input
            className="form-control"
            id="email"
            type="email"
            placeholder="Email:"
            autoComplete="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Password:"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
        </div>
        <div className="row">
          <button className="m-2 col btn btn-lg btn-primary" type="submit">
            Log In
          </button>
          <button
            className="m-2 col btn btn-lg btn-secondary"
            type="button"
            onClick={() => navigate('./signup')}
          >
            Create Account
          </button>
        </div>
        <p id="login-error-msg"> </p>
      </form>
    </div>
  )
}

export default Landing
