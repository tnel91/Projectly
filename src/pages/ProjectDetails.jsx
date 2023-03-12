import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import MaterialCard from '../components/MaterialCard'
import ProjectForm from '../components/ProjectForm'
import Checklist from '../components/Checklist'
import PhotoComponent from '../components/PhotoComponent'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let { projectId } = useParams()

  const [editsEnabled, setEditsEnabled] = useState(false)

  const [editMode, setEditMode] = useState(true)

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

  const [holding, setHolding] = useState('')

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value })
  }

  const handleFocus = (e) => {
    console.log('holding set')
    setHolding(e.target.value)
  }

  const handleBlur = (e) => {
    if (e.target.value.length > 0) {
      saveProject()
    } else {
      console.log('value is 0')
      setDetails({ ...details, [e.target.id]: holding })
    }
    setHolding('')
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
        console.log('Project Saved')
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

  // const toggleEditMode = () => {
  //   if (details.ownerId === user.id) {
  //     if (!editMode) {
  //       setEditMode(true)
  //       showCancSaveDelButtons()
  //       hideEditButton()
  //     } else if (editMode) {
  //       setEditMode(false)
  //       hideCancSaveDelButtons()
  //       showEditButton()
  //     }
  //   } else {
  //     console.log('unauthorized')
  //   }
  // }

  const cancelChanges = () => {
    // toggleEditMode()
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

  return (
    <div className="row">
      <section className="col-2">
        <h1>{details.owner}</h1>
        <div className="form-floating">
          <input
            id="budget"
            className="form-control"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Budget"
            value={details.budget}
          />
          <label htmlFor="budget">Budget:</label>
        </div>
        <div className="form-floating">
          <input
            type="date"
            id="startDate"
            className="form-control"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Start Date"
            value={details.startDate}
          />
          <label htmlFor="startDate">Start Date:</label>
        </div>
        <div className="form-floating">
          <input
            type="date"
            id="endDate"
            className="form-control"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="End Date"
            value={details.endDate}
          />
          <label htmlFor="endDate">End Date:</label>
        </div>
        <div className="form-floating">
          <textarea
            id="description"
            className="form-control"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Description"
            value={details.description}
          />
          <label htmlFor="description">Description</label>
        </div>
      </section>
      <div className="col-10">
        <section className="col-">
          <div className="form-floating col-6">
            <input
              id="projectName"
              className="form-control"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Project Name"
              value={details.projectName}
              required
            />
            <label htmlFor="projectName">Project Name</label>
          </div>
        </section>
        <section className="col-" id="checklist-section">
          <h5>Checklists</h5>
          <button
            className="btn btn-primary"
            id="new-checklist-button"
            onClick={createChecklist}
            hidden
          >
            New Checklist
          </button>
          <div className="container">
            <div className="row">
              {checklists.map((checklist, i) => (
                <div
                  className="card m-1 g-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
                  key={checklist.id}
                >
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
          </div>
        </section>
      </div>
      <div hidden className="container bg-light m-4">
        <div className="row">
          <div className="border border-danger btn-group col-12">
            <div className="btn-group">
              <button
                className="col-1 btn btn-primary border"
                id="edit-project-button"
                hidden
                // onClick={toggleEditMode}
              >
                Edit
              </button>
              <button
                className="col-1 btn btn-warning border"
                id="cancel-changes-button"
                hidden
                onClick={cancelChanges}
              >
                Cancel
              </button>
              <button
                className="col-1 btn btn-success border"
                id="save-changes-button"
                hidden
                onClick={saveProject}
              >
                Save
              </button>
              <button
                className="col-1 btn btn-danger border"
                id="delete-project-button"
                hidden
                onClick={deleteProject}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="border border-primary col-lg-6">
            <section className="border container-lg">
              <ProjectForm
                details={details}
                editMode={editMode}
                handleChange={handleChange}
                handleCheckbox={handleCheckbox}
                setDetails={setDetails}
              />
            </section>
          </div>
          <div className="border border-danger col-lg-6">
            <section className="border container" id="image-section">
              <div className="row">
                {details.images.map((image, i) => (
                  <div className="col-sm-12" key={i}>
                    <PhotoComponent
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
