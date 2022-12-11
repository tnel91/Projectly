import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'

const ProjectDetails = (props) => {
  let { projectId } = useParams()
  const [details, setDetails] = useState({
    name: '',
    owner: '',
    type: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    materials: [],
    images: []
  })

  const getProjectDetails = async () => {
    const response = await axios
      .get(`${BASE_URL}/projects/${projectId}`)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    setDetails({
      name: response.projectName,
      owner: response.owner.username,
      type: response.projectType,
      description: response.description,
      startDate: response.startDate,
      endDate: response.endDate,
      budget: response.budget,
      materials: response.materials.list,
      images: response.images
    })
  }

  useEffect(() => {
    getProjectDetails()
  }, [])

  return (
    <div>
      <h2>Project Name: {details.name}</h2>
      <p>Creator: {details.owner}</p>
      <p>Description: {details.description}</p>
      <div>
        <h4>Materials</h4>
        {details.materials.map((material, i) => (
          <div key={i}>
            <h5>{material.name}</h5>
            <p>{material.amount}</p>
          </div>
        ))}
      </div>
      <div>
        <h4>Images</h4>
        {details.images.map((image, i) => (
          <div key={i}>
            <img src={image} alt="Image" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectDetails
