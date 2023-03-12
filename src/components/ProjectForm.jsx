import { useState } from 'react'

const ProjectForm = ({
  details,
  setDetails,
  editMode,
  handleChange,
  handleCheckbox
}) => {
  const [imgUrl, setImgUrl] = useState('')

  const [materialForm, setMaterialForm] = useState({
    name: '',
    amount: ''
  })

  const handleMatChange = (e) => {
    setMaterialForm({ ...materialForm, [e.target.id]: e.target.value })
  }

  const handleUrlChange = (e) => {
    setImgUrl(e.target.value)
  }

  const addMaterial = (e) => {
    e.preventDefault()
    let list = details.materials.list
    list.push(materialForm)
    setDetails({
      ...details,
      materials: {
        list: list
      }
    })
    setMaterialForm({
      name: '',
      amount: ''
    })
  }

  const addImage = (e) => {
    e.preventDefault()
    let imgArr = details.images
    imgArr.push(imgUrl)
    setDetails({
      ...details,
      images: imgArr
    })
    setImgUrl('')
  }

  return editMode ? (
    <div>
      <form className="row g-1"></form>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-6 fw-bold">
          <h2 className="">
            <u>{details.projectName}</u>
          </h2>
        </div>
        <div className="col-6 h5 fw-bold">
          <p>Creator: {details.owner}</p>
        </div>
        <div className="col-6 fw-semibold">
          <p>Start Date: {details.startDate}</p>
        </div>
        <div className="col-6 fw-semibold">
          <p>Target End Date: {details.endDate}</p>
        </div>
        <div>
          <p>{details.description}</p>
        </div>
        <div className="col-6"></div>
        <div className="col-6 fw-semibold">
          <p>Budget: {details.budget}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectForm
