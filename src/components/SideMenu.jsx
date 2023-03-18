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

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value)
  }

  const handleImageSet = (event) => {
    const file = event.target.files[0]
    setImageFile(file)
    setImageUrl(URL.createObjectURL(file))
  }

  const handleImageUpload = async () => {
    if (imageUrl.includes('blob')) {
      console.log('blob')
      const formData = new FormData()
      formData.append('imageFile', imageFile)
      formData.append('id', details.id)
      console.log(formData)
      const res = await Client.put(
        `${BASE_URL}/projects/${details.id}/image-file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('url!')
      await Client.put(`${BASE_URL}/projects/${details.id}/image-url`, {
        imageUrl: imageUrl,
        id: details.id
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    if (details.image && details.image instanceof Blob) {
      let parsedImg = URL.createObjectURL(details.image)
      setImageUrl(parsedImg)
    } else {
      setImageUrl(imageUrl)
    }
  }, [details.image])

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
          name="avatar"
          id="file-input"
          accept="image/*"
          onChange={handleImageSet}
        />
        <input type="URL" onChange={handleImageUrl} />
        <p>{imageFile.name}</p>
        <button onClick={handleImageUpload}>Upload</button>
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
