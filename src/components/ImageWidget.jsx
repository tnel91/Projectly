import { useState, useRef } from 'react'

const ImageWidget = ({ imageUrl, setImageUrl, setImageFile, editsEnabled }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [url, setUrl] = useState('')
  const [urlEditMode, setUrlEditMode] = useState(false)

  const fileInputRef = useRef(null)

  const handleImageUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setImageUrl(url)
    setUrlEditMode(false)
  }

  const handleImageSet = (event) => {
    setUrlEditMode(false)
    const file = event.target.files[0]
    setImageUrl(URL.createObjectURL(file))
    setImageFile(file)
  }

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setUrl('')
        setUrlEditMode(false)
      }}
    >
      <img className="w-100" src={imageUrl} alt="not found" />
      {editsEnabled && isHovered && !urlEditMode && (
        <div className="dropdown position-absolute top-0 end-0 text-white">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Change Image
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => fileInputRef.current.click()}
              >
                Upload
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => setUrlEditMode(true)}
              >
                Link
              </a>
            </li>
          </ul>
        </div>
      )}
      <input
        ref={fileInputRef}
        hidden
        type="file"
        name="avatar"
        id="file-input"
        accept="image/*"
        onChange={handleImageSet}
      />
      {editsEnabled && urlEditMode && (
        <div>
          <form
            className="input-group position-absolute top-0"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control"
              type="url"
              placeholder="Enter image URL"
              onChange={handleImageUrl}
              required
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ImageWidget
