import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import MaterialCard from '../components/MaterialCard'
import ProjectForm from '../components/ProjectForm'
import Checklist from '../components/Checklist'
import ImageCard from '../components/ImageCard'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let { projectId } = useParams()

  const [editsEnabled, setEditsEnabled] = useState(false)

  const [editMode, setEditMode] = useState(false)

  const [checklists, setChecklists] = useState([])

  const [details, setDetails] = useState({
    owner: '',
    ownerId: '',
    id: null,
    projectName: '',
    tags: '',
    description: '',
    materials: { list: [] },
    images: [],
    budget: '',
    startDate: '',
    endDate: '',
    isPublic: false,
    createdAt: null,
    updatedAt: null
  })

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
      tags: response.tags,
      description: response.description,
      materials: { list: response.materials.list },
      images: response.images,
      budget: response.budget,
      startDate: response.startDate,
      endDate: response.endDate,
      isPublic: response.isPublic,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt
    })
  }

  const getChecklists = async () => {
    await Client.get(`${BASE_URL}/checklists/${projectId}`)
      .then((response) => {
        setChecklists(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createChecklist = async () => {
    await Client.post(`${BASE_URL}/checklists/${projectId}`)
      .then((response) => {
        setChecklists([...checklists, response.data])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const saveProject = async () => {
    await Client.put(`/projects/${details.id}`, details)
      .then((response) => {
        // console.log(response.data[1][0])
        toggleEditMode()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteProject = async () => {
    let res = window.confirm('Delete project forever?')
    if (res) {
      await Client.delete(`/projects/${details.id}`)
        .then((response) => {
          console.log(response)
          navigate('/dashboard')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const toggleEditMode = () => {
    if (details.ownerId === user.id) {
      if (!editMode) {
        setEditMode(true)
        showCancSaveDelButtons()
        hideEditButton()
      } else if (editMode) {
        setEditMode(false)
        hideCancSaveDelButtons()
        showEditButton()
      }
    } else {
      console.log('unauthorized')
    }
  }

  const cancelChanges = () => {
    toggleEditMode()
    getProjectDetails()
  }

  const enableEditMode = () => {
    showEditButton()
    showNewChecklistButton()
    setEditsEnabled(true)
  }

  const showNewChecklistButton = () => {
    let button = document.getElementById('new-checklist-button')
    button.removeAttribute('hidden')
  }

  const showEditButton = () => {
    let editButton = document.getElementById('edit-project-button')
    editButton.removeAttribute('hidden')
  }

  const hideEditButton = () => {
    let editButton = document.getElementById('edit-project-button')
    editButton.setAttribute('hidden', 'hidden')
  }

  const showCancSaveDelButtons = () => {
    let cancelButton = document.getElementById('cancel-changes-button')
    let saveButton = document.getElementById('save-changes-button')
    let deleteButton = document.getElementById('delete-project-button')
    cancelButton.removeAttribute('hidden')
    saveButton.removeAttribute('hidden')
    deleteButton.removeAttribute('hidden')
  }

  const hideCancSaveDelButtons = () => {
    let cancelButton = document.getElementById('cancel-changes-button')
    let saveButton = document.getElementById('save-changes-button')
    let deleteButton = document.getElementById('delete-project-button')
    cancelButton.setAttribute('hidden', 'hidden')
    saveButton.setAttribute('hidden', 'hidden')
    deleteButton.setAttribute('hidden', 'hidden')
  }

  useEffect(() => {
    if (checklists.length === 0) {
      getChecklists()
    }
    if (!details.id) {
      getProjectDetails()
    }
    if (user && user.id === details.ownerId) {
      enableEditMode()
    }
  }, [user, details.id])

  return user && authenticated ? (
    <div>
      <section className="container border navar navbar-expand-lare bg-light row m-2">
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
          className="col-1"
          id="save-changes-button"
          hidden
          onClick={saveProject}
        >
          Save
        </button>
        <button
          className="col-1"
          id="delete-project-button"
          hidden
          onClick={deleteProject}
        >
          Delete
        </button>
      </section>
      <section className="border container">
        <ProjectForm
          details={details}
          editMode={editMode}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          setDetails={setDetails}
        />
      </section>
      <section className="border container" id="material-section">
        <h5>Materials</h5>
        <div>
          {details.materials.list.map((material, i) => (
            <div key={i}>
              <MaterialCard
                i={i}
                name={material.name}
                amount={material.amount}
                materials={details.materials}
                editMode={editMode}
                details={details}
                setDetails={setDetails}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="border container" id="image-section">
        <h5>Images</h5>
        <div>
          {details.images.map((image, i) => (
            <div key={i}>
              <ImageCard
                i={i}
                image={image}
                editMode={editMode}
                images={details.images}
                details={details}
                setDetails={setDetails}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="border container" id="checklist-section">
        <h5>Checklists</h5>
        <button id="new-checklist-button" onClick={createChecklist} hidden>
          New Checklist
        </button>
        <div className="row">
          {checklists.map((checklist, i) => (
            <div className="col" key={checklist.id}>
              <Checklist
                i={i}
                editsEnabled={editsEnabled}
                id={checklist.id}
                listItems={checklist.listItems}
                setChecklists={setChecklists}
                checklists={checklists}
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
