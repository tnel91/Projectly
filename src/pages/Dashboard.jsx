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
    document.getElementById('my-projects-section').removeAttribute('hidden')
    await Client.get(`${BASE_URL}/projects/user`)
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
    await Client.post('/projects')
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
    if (user && authenticated) {
      getUserProjects()
    }
  }, [user])

  return (
    <div>
      <section id="project-section" className="row container">
        <div hidden id="my-projects-section" className="col-12 col-sm-6">
          <h2>My Projects</h2>
          <button className="btn btn-primary" onClick={createNewProject}>
            Create New Project
          </button>
          <div id="my_projects">
            {userProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.project_name}
                  owner={project.owner.username}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="public-projects-section" className="col-12 col-sm-6">
          <h2>Public Projects</h2>
          <div id="public_projects">
            {publicProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.project_name}
                  owner={project.owner.username}
                  onClick={navProjectDetails}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
