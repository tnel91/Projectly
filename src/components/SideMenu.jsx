import { useEffect, useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const SideMenu = ({
  handleChange,
  handleFocus,
  handleBlur,
  details,
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [url, setUrl] = useState('')

  const handleImageUrl = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setImageUrl(url)
    document.querySelector('#url-input').setAttribute('hidden', true)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    setUrl('')
    document.querySelector('#url-input').setAttribute('hidden', true)
  }

  const handleImageSet = (event) => {
    document.querySelector('#url-input').setAttribute('hidden', true)
    const file = event.target.files[0]
    setImageUrl(URL.createObjectURL(file))
    setImageFile(file)
  }

  const saveImage = async () => {
    if (imageUrl.includes('blob')) {
      console.log('saving file')
      const formData = new FormData()
      formData.append('imageFile', imageFile)
      formData.append('id', details.id)
      console.log(formData)
      try {
        const res = await Client.put(
          `${BASE_URL}/projects/${details.id}/image-file`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        // console.log(res)
        return res
      } catch (err) {
        console.log(err)
        throw err
      }
    } else if (imageUrl.includes('http', 'https', 'www')) {
      console.log('saving url')
      try {
        const res = await Client.put(
          `${BASE_URL}/projects/${details.id}/image-url`,
          {
            imageUrl: imageUrl,
            id: details.id
          }
        )
        console.log(res)
        return res
      } catch (err) {
        console.log(err)
        throw err
      }
    } else {
      console.log('no image to save')
    }
  }

  useEffect(() => {
    console.log('image url changed')
    saveImage()
  }, [imageUrl])

  return (
    <div className="row">
      <div
        id="project-img-cont"
        className="col-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img id="project-img" className="" src={imageUrl} alt="not found" />
        {isHovered && (
          <div id="project-img-dropdown" className="dropdown">
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
                  onClick={() => document.querySelector('#file-input').click()}
                >
                  Upload
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() =>
                    document
                      .querySelector('#url-input')
                      .removeAttribute('hidden')
                  }
                >
                  Link
                </a>
              </li>
            </ul>
          </div>
        )}
        <input
          hidden
          type="file"
          name="avatar"
          id="file-input"
          accept="image/*"
          onChange={handleImageSet}
        />
        <form
          hidden
          id="url-input"
          className="input-group"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control"
            type="url"
            onChange={handleImageUrl}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
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
