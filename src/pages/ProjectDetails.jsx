import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import ImageCard from '../components/imageCard'
import ProjectForm from '../components/ProjectForm'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let { projectId } = useParams()

  const cancelButton = document.getElementById('cancel-changes-button')
  const saveButton = document.getElementById('save-changes-button')
  const editButton = document.getElementById('edit-project-button')

  const [editMode, setEditMode] = useState(false)

  // const [imgUrl, setImgUrl] = useState('')

  // const [materialForm, setMaterialForm] = useState({
  //   name: '',
  //   amount: ''
  // })

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
      startDate: '' + response.startDate,
      endDate: '' + response.endDate,
      isPublic: response.isPublic,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt
    })
  }

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value })
  }

  const handleCheckbox = (e) => {
    if (details.isPublic === false) {
      setDetails({ ...details, [e.target.id]: true })
    } else {
      setDetails({ ...details, [e.target.id]: false })
    }
  }

  const toggleEditMode = () => {
    if (details.ownerId === user.id) {
      if (!editMode) {
        setEditMode(true)
        showCancSaveButtons()
        hideEditButton()
      } else if (editMode) {
        setEditMode(false)
        hideCancSaveButtons()
        showEditButton()
      }
    } else {
      console.log('unauthorized')
    }
  }

  const showEditButton = () => {
    editButton.removeAttribute('hidden')
  }

  const hideEditButton = () => {
    editButton.setAttribute('hidden', 'hidden')
  }

  const showCancSaveButtons = () => {
    cancelButton.removeAttribute('hidden')
    saveButton.removeAttribute('hidden')
  }

  const hideCancSaveButtons = () => {
    cancelButton.setAttribute('hidden', 'hidden')
    saveButton.setAttribute('hidden', 'hidden')
  }

  const cancelChanges = () => {
    toggleEditMode()
  }

  const saveProject = () => {
    toggleEditMode()
    setTimeout(() => {
      showEditButton()
    }, 100)
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

  return user && authenticated ? (
    <div>
      <div className="header row m-2">
        <button
          className="col-1"
          id="edit-project-button"
          hidden
          onClick={toggleEditMode}
        >
          Edit
        </button>
        <button
          className="col-1"
          id="cancel-changes-button"
          hidden
          onClick={cancelChanges}
        >
          Cancel
        </button>
        <button
          className="col-3"
          id="save-changes-button"
          hidden
          onClick={saveProject}
        >
          Save (just toggles for now)
        </button>
      </div>
      <ProjectForm
        details={details}
        editMode={editMode}
        handleChange={handleChange}
        handleCheckbox={handleCheckbox}
      />
      <section id="material-section">
        <div>
          {details.materials.map((material, i) => (
            <div key={i}>
              <h5>{material.name}</h5>
              <p>{material.amount}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="image-section">
        <div>
          {details.images.map((image, i) => (
            <div key={i}>
              <ImageCard
                i={i}
                image={image}
                editMode={editMode}
                images={details.images}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  ) : (
    // Renders if not logged in.
    <div>
      <h3>You must be signed in to use this feature.</h3>
      <button onClick={() => navigate('/')}>Sign In</button>
    </div>
  )
}

export default ProjectDetails
