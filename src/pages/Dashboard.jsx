import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import axios from 'axios'
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
      userId: user.id,
      projectName: 'New Project',
      projectType: 'test',
      materials: {
        list: []
      },
      images: [],
      isPublic: true
    }
    await Client.post('/projects', newProject)
      .then((response) => {
        console.log(response.data.id)
        navigate(`/project/${response.data.id}`)
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
      <section id="project-section" className="r">
        <div className="container p-5">
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
        <div className="container p-5">
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
