import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
// import About from './pages/About'
import Dashboard from './pages/Dashboard'
// import Profile from './pages/Profile'
import ProjectDetails from './pages/ProjectDetails'
import Signup from './pages/Signup'
import { CheckSession } from './services/Auth'
import { DragDropContext } from '@hello-pangea/dnd'

function App() {
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [dragged, setDragged] = useState(null)

  const handleLogout = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  const onDragEnd = (result, k) => {
    const { destination, source, draggableId } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    setDragged(result)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
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
            {/* <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} /> */}
            <Route
              path="/dashboard"
              element={<Dashboard user={user} authenticated={authenticated} />}
            />
            <Route
              path="/project/:projectId"
              element={
                <ProjectDetails
                  user={user}
                  authenticated={authenticated}
                  dragged={dragged}
                  setDragged={setDragged}
                />
              }
            />
          </Routes>
        </main>
      </DragDropContext>
    </div>
  )
}

export default App
