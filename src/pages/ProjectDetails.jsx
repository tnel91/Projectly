import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import SideMenu from '../components/SideMenu'
import ProjectHeader from '../components/ProjectHeader'
import Organizer from '../components/Organizer'

const ProjectDetails = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let { projectId } = useParams()

  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState('')
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [editsEnabled, setEditsEnabled] = useState(false)
  const [checklists, setChecklists] = useState([])
  const [details, setDetails] = useState({
    owner: '',
    ownerId: '',
    id: null,
    projectName: '',
    description: '',
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
    setUnsavedChanges(true)
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
    setDetails({ ...details, [e.target.id]: e.target.checked })
  }

  const getProjectDetails = async () => {
    const project = await Client.get(`${BASE_URL}/projects/${projectId}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log(error)
      })
    if (project.image.includes('uploads')) {
      try {
        let uint8Array = new Uint8Array(project.image_file.data)
        let image = new Blob([uint8Array], {
          type: 'image/jpeg'
        })
        let newFile = new File([image], 'image.jpg', { type: 'image/jpeg' })
        setImageFile(newFile)
        setImageUrl(URL.createObjectURL(newFile))
      } catch (error) {
        console.log(error)
      }
    } else if (project.image) {
      console.log('img is not a file')
      setImageUrl(project.image)
      setImageFile('')
    } else {
      console.log('no image')
      setImageUrl('')
      setImageFile('')
    }
    setDetails({
      owner: project.owner.username,
      ownerId: project.owner.id,
      id: project.id,
      projectName: project.project_name,
      description: project.description,
      budget: project.budget,
      startDate: project.start_date,
      endDate: project.end_date,
      isPublic: project.is_public,
      createdAt: project.created_at,
      updatedAt: project.updated_at
    })
  }

  const saveProject = async () => {
    if (details.id) {
      // console.log(details)
      await Client.put(`/projects/${details.id}`, details, {})
        .then((response) => {
          console.log('saved')
          setUnsavedChanges(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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

  const inputs = document.getElementsByTagName('input')

  useEffect(() => {
    console.log('editsEnabled: ', editsEnabled)
    if (editsEnabled) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled')
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute('disabled', 'disabled')
      }
    }
  }, [editsEnabled])

  useEffect(() => {
    saveProject()
  }, [details.isPublic, details.startDate, details.endDate])

  useEffect(() => {
    if (!details.id) {
      getProjectDetails()
    }
    if (user && authenticated && user.id === details.ownerId) {
      setEditsEnabled(true)
    }
  }, [user, details.id])

  return (
    <div className="row">
      <section className="col-4">
        <SideMenu
          details={details}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleFocus={handleFocus}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          imageFile={imageFile}
          setImageFile={setImageFile}
          editsEnabled={editsEnabled}
        />
      </section>
      <div className="col-8">
        <section className="row">
          <ProjectHeader
            details={details}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleCheckbox={handleCheckbox}
            unsavedChanges={unsavedChanges}
          />
        </section>
        <section className="col" id="checklist-section">
          <Organizer projectId={projectId} editsEnabled={editsEnabled} />
        </section>
      </div>
    </div>
  )
}

export default ProjectDetails
