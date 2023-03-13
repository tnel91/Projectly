import { useState } from 'react'

const SideMenu = ({ handleChange, handleFocus, handleBlur, details }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setImageFile(file)
    console.log(file)
  }

  return (
    <div className="row">
      <div
        id="project-img-cont"
        className="col-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          id="project-img"
          className=""
          src={imageFile ? URL.createObjectURL(imageFile) : details.images[0]}
          alt="project image"
        />
        {isHovered && (
          <button
            id="project-img-btn"
            className="btn"
            onClick={() => document.querySelector('#file-input').click()}
          >
            change image
          </button>
        )}
        <input
          hidden
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <h4 className="col-12">
        Owner: <strong>{details.owner}</strong>
      </h4>
      <div className="col-12 form-floating">
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
      <div className="col-12 form-floating">
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
      <div className="col-12 form-floating">
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
      <div id="description" className="col-12 form-floating">
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
    </div>
  )
}

export default SideMenu
