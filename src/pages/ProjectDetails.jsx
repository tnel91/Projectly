import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
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
    const response = await Client.get(`${BASE_URL}/projects/${projectId}`)
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

  return user && authenticated ? (
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
  ) : (
    <div>
      <h3>You must be signed in to use this feature.</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default ProjectDetails
