import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const Dashboard = ({ user, authenticated }) => {
  let navigate = useNavigate()
  const [publicProjects, setPublicProjects] = useState([])
  const [userProjects, setUserProjects] = useState([])

  const getPublicProjects = async () => {
    await Client.get(`${BASE_URL}/projects`)
      .then((response) => {
        setPublicProjects(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getUserProjects = async () => {
    await Client.get(`${BASE_URL}/projects/user/${user.id}`)
      .then((response) => {
        setUserProjects(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const navProjectDetails = (id) => {
    navigate(`/project/${id}`)
  }

  const createNewProject = async () => {
    let newProject = {
      userId: user.id
    }
    await Client.post('/projects', newProject)
      .then((response) => {
        navProjectDetails(response.data.id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (publicProjects.length === 0) {
      getPublicProjects()
    }
    if (user) {
      getUserProjects()
    }
  }, [user])

  return user && authenticated ? (
    <div>
      <header>
        <button onClick={createNewProject}>Create New Project</button>
      </header>
      <section id="project-section" className="row container">
        <div className="col-12 col-sm-6">
          <h2>My Projects</h2>
          <div id="my_projects">
            {userProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.projectName}
                  owner={project.owner.username}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <h2>Public Projects</h2>
          <div id="public_projects">
            {publicProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.projectName}
                  owner={project.owner.username}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div>
      <h3>You must be signed in to use this feature.</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default Dashboard
