import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'

const ProjectDetails = (props) => {
  let { projectId } = useParams()
  const [details, setDetails] = useState(null)

  const getProjectDetails = async () => {
    await axios
      .get(`${BASE_URL}/projects/${projectId}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getProjectDetails()
  }, [])
  return (
    <div>
      <p>stuff</p>
    </div>
  )
}

export default ProjectDetails
