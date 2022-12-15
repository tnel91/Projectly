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
      <form className="row g-1">
        <div className="form-floating col-6">
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
        <div className="row mb-3 col-6">
          <label className="row align-items-center">
            <input
              className="col-2 h-50"
              id="isPublic"
              type="checkbox"
              checked={details.isPublic}
              onChange={handleCheckbox}
            />
            <p className="col-10 align-center">Viewable by other users?</p>
          </label>
        </div>
        <div className="form-floating col-12">
          <input
            id="tags"
            className="form-control"
            onChange={handleChange}
            placeholder="Tags"
            value={details.tags}
          />
          <label htmlFor="tags">Tags (separate by commas):</label>
        </div>
        <div className="form-floating col-4">
          <input
            id="budget"
            className="form-control"
            onChange={handleChange}
            placeholder="Budget"
            value={details.budget}
          />
          <label htmlFor="budget">Budget:</label>
        </div>
        <div className="form-floating col-4">
          <input
            type="date"
            id="startDate"
            className="form-control"
            onChange={handleChange}
            placeholder="Start Date"
            value={details.startDate}
          />
          <label htmlFor="startDate">Start Date:</label>
        </div>
        <div className="form-floating col-4">
          <input
            type="date"
            id="endDate"
            className="form-control"
            onChange={handleChange}
            placeholder="End Date"
            value={details.endDate}
          />
          <label htmlFor="endDate">End Date:</label>
        </div>
        <div className="form-floating col-12">
          <textarea
            id="description"
            className="form-control"
            onChange={handleChange}
            placeholder="Description"
            value={details.description}
          />
          <label htmlFor="description">Description</label>
        </div>
      </form>
      <section id="image-section">
        <form className="row g-1" id="image-form" onSubmit={addImage}>
          <div className="form-floating col-12">
            <input
              id="img-url"
              className="form-control"
              onChange={handleUrlChange}
              placeholder="Image URL:"
              value={imgUrl}
              required
            />
            <label htmlFor="img-url">Image URL:</label>
          </div>
          <button
            className="btn btn-primary col-4"
            type="submit"
            form="image-form"
          >
            Add Image
          </button>
        </form>
      </section>
      <section id="material-section">
        <form
          className="row container g-1"
          id="material-form"
          onSubmit={addMaterial}
        >
          <div className="form-floating col-6">
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
          <div className="form-floating col-6">
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
          <button
            className="btn btn-primary col-4"
            type="submit"
            form="material-form"
          >
            Add Material
          </button>
        </form>
      </section>
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
