import { useState, useEffect } from 'react'

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
        <div className="form-floating">
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
        <div className="form-floating">
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
        <div className="checkbox mb-3">
          <label>
            <input
              id="isPublic"
              type="checkbox"
              checked={details.isPublic}
              onChange={handleCheckbox}
            />
            Viewable by other users?
          </label>
        </div>
      </form>
      {/* //////////////////////////////////////////// */}
      <section id="material-section">
        <h4>Materials</h4>
        <form id="material-form" onSubmit={addMaterial}>
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
      </section>
      <section id="image-section">
        <h4>Images</h4>
        <form id="image-form" onSubmit={addImage}>
          <div className="form-floating">
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
          <button type="submit" form="image-form">
            Add Image
          </button>
        </form>
      </section>
    </div>
  ) : (
    <div>
      <h2>Project Name: {details.projectName}</h2>
      <p>Creator: {details.owner}</p>
      <p>Description: {details.description}</p>
    </div>
  )
}

export default ProjectForm
