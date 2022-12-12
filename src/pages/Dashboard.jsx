import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import axios from 'axios'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const Dashboard = ({ user, authenticated }) => {
  let navigate = useNavigate()
  const [publicProjects, setPublicProjects] = useState([])

  const getPublicRecipes = async () => {
    await Client.get(`${BASE_URL}/projects`)
      .then((response) => {
        setPublicProjects(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const navProjectDetails = (id) => {
    navigate(`/project/${id}`)
  }

  useEffect(() => {
    getPublicRecipes()
  }, [])
  return user && authenticated ? (
    <div>
      <header>
        <button>Create New Project</button>
      </header>
      <div className="row">
        <section className="container p-5">
          <h2>Public Projects</h2>
          <div id="public_projects">
            {publicProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.projectName}
                  owner={project.owner.userName}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2>My Projects</h2>
          <div id="my_projects">
            {publicProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.projectName}
                  owner={project.owner.userName}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>
      <h3>You must be signed in to use this feature.</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default Dashboard
