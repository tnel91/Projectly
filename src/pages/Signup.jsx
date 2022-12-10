import { useState, useEffect } from 'react'

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
    confirmPass: ''
  })

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formState.password === formState.confirmPass) {
      document.getElementById('signup-msg').innerHTML = ''
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
        <button type="submit">Log In</button>
      </form>
      <p id="signup-msg"></p>
    </div>
  )
}

export default Signup
