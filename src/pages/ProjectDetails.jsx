import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let { projectId } = useParams()
  const [editMode, setEditMode] = useState(false)
  const [details, setDetails] = useState({
    owner: '',
    ownerId: '',
    id: null,
    projectName: '',
    tags: '',
    description: '',
    materials: [],
    images: [],
    budget: '',
    startDate: '',
    endDate: '',
    isPublic: false,
    createdAt: null,
    updatedAt: null
  })

  const [materialForm, setMaterialForm] = useState({
    name: '',
    amount: ''
  })

  const getProjectDetails = async () => {
    const response = await Client.get(`${BASE_URL}/projects/${projectId}`)
      .then((response) => {
        // console.log(response.data)
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    setDetails({
      owner: response.owner.username,
      ownerId: response.owner.id,
      id: response.id,
      projectName: response.projectName,
      tags: '' + response.projectType,
      description: '' + response.description,
      materials: response.materials.list,
      images: response.images,
      budget: '' + response.budget,
      startDate: response.startDate,
      endDate: response.endDate,
      isPublic: response.isPublic,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt
    })
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value })
  }

  const handleMatChange = (e) => {
    setMaterialForm({ ...materialForm, [e.target.id]: e.target.value })
  }

  const addMaterial = (e) => {
    e.preventDefault()
    console.log(materialForm)
    details.materials.push(materialForm)
    setMaterialForm({
      name: '',
      amount: ''
    })
  }

  const toggleEditMode = () => {
    if (details.ownerId === user.id) {
      setEditMode((current) => !current)
    } else {
      console.log('unauthorized')
    }
  }

  const showEditButton = () => {
    let editButton = document.getElementById('edit-project-button')
    editButton.removeAttribute('hidden')
  }

  useEffect(() => {
    if (!details.id) {
      getProjectDetails()
    }
    if (user) {
      if (user.id === details.ownerId) {
        showEditButton()
      }
    }
  }, [user, details.id])

  if (user && authenticated) {
    return editMode ? (
      <div>
        <button onClick={toggleEditMode}>Save (just toggles for now)</button>
        <form>
          <div className="form-floating">
            <input
              id="projectName"
              className="form-control"
              onChange={handleChange}
              placeholder="Project Name"
              value={details.projectName}
              required
            />
            <label htmlFor="projectName">Project Name</label>
          </div>
          <div className="form-floating">
            <input
              id="description"
              className="form-control"
              onChange={handleChange}
              placeholder="Description"
              value={details.description}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className="form-floating">
            <input
              id="tags"
              className="form-control"
              onChange={handleChange}
              placeholder="Tags"
              value={details.tags}
            />
            <label htmlFor="tags">Tags (separate by commas):</label>
          </div>
          <div className="form-floating">
            <input
              id="budget"
              className="form-control"
              onChange={handleChange}
              placeholder="Budget"
              value={details.budget}
            />
            <label htmlFor="budget">Budget:</label>
          </div>
        </form>
        <form id="material-form" onSubmit={addMaterial}>
          <h4>Materials</h4>
          <div className="form-floating">
            <input
              id="name"
              className="form-control"
              onChange={handleMatChange}
              placeholder="Material Name:"
              value={materialForm.name}
              required
            />
            <label htmlFor="name">Material Name:</label>
          </div>
          <div className="form-floating">
            <input
              id="amount"
              className="form-control"
              onChange={handleMatChange}
              placeholder="Amount:"
              value={materialForm.amount}
              required
            />
            <label htmlFor="amount">Amount:</label>
          </div>
          <button type="submit" form="material-form">
            Add Material
          </button>
        </form>
        <div>
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
        <button id="edit-project-button" hidden onClick={toggleEditMode}>
          Edit
        </button>
        <h2>Project Name: {details.projectName}</h2>
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
  } else {
    return (
      <div>
        <h3>You must be signed in to use this feature.</h3>
        <button onClick={() => navigate('/')}>Sign In</button>
      </div>
    )
  }
}

export default ProjectDetails
