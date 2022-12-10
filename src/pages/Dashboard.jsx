import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Dashboard = () => {
  let navigate = useNavigate()
  const [publicProjects, setPublicProjects] = useState([])

  const getPublicRecipes = async () => {
    await axios
      .get(`${BASE_URL}/projects`)
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
  return (
    <div>
      <header>Header</header>
      <div id="public_projects">
        <h2>Public Projects</h2>
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
    </div>
  )
}

export default Dashboard
