import { useEffect, useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const SideMenu = ({
  handleChange,
  handleFocus,
  handleBlur,
  details
  // setDetails
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const handleImageSet = (event) => {
    const file = event.target.files[0]
    console.log(file)
    setImageFile(file)
    setImageUrl(URL.createObjectURL(file))
  }

  const handleImageUpload = async () => {
    if (imageUrl.comtains('blob')) {
      console.log('blob')
      const formData = new FormData()
      formData.append('image', imageFile)
      const res = await Client.put(
        `${BASE_URL}/projects/${details.id}/image`,
        formData
      )
      console.log(res)
    } else {
      console.log('url')
      const res = await Client.put(
        `${BASE_URL}/projects/${details.id}/image`,
        imageUrl
      )
      console.log(res)
    }
  }

  // const res = await Client.post(
  //   `${BASE_URL}/projects/${details.id}/image`,
  //   formData
  // ) //, { headers: { 'Content-Type': 'multipart/form-data' } })
  // console.log(res)

  const handleImageUrl = (event) => {
    setImageUrl(event.target.value)
  }

  useEffect(() => {
    if (details.image && details.image instanceof Blob) {
      let parsedImg = URL.createObjectURL(details.image)
      setImageUrl(parsedImg)
    } else {
      setImageUrl(details.image)
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
