import './index.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProjectDetails from './pages/ProjectDetails'
import Signup from './pages/Signup'
import { CheckSession } from './services/Auth'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  let navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
    navigate('/')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    console.log(process.env.NODE_ENV)
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <header>
        <Navbar
          user={user}
          authenticated={authenticated}
          handleLogout={handleLogout}
        />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/dashboard"
            element={<Dashboard user={user} authenticated={authenticated} />}
          />
          <Route
            path="/project/:projectId"
            element={
              <ProjectDetails user={user} authenticated={authenticated} />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
