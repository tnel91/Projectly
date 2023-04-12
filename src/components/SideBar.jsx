import { useEffect, useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import ImageWidget from './ImageWidget'

const SideBar = ({
  handleChange,
  handleFocus,
  handleBlur,
  details,
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile,
  editsEnabled
}) => {
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const saveImage = async () => {
    if (details.id && editsEnabled && unsavedChanges) {
      console.log('saving image')
      if (imageUrl.includes('blob')) {
        // console.log('saving file')
        const formData = new FormData()
        formData.append('imageFile', imageFile)
        formData.append('id', details.id)
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
          console.log('image file saved')
          setUnsavedChanges(false)
          return res
        } catch (err) {
          console.log(err)
          throw err
        }
      } else if (imageUrl.includes('http', 'https', 'www')) {
        try {
          const res = await Client.put(
            `${BASE_URL}/projects/${details.id}/image-url`,
            {
              imageUrl: imageUrl,
              id: details.id
            }
          )
          console.log('image url saved')
          setUnsavedChanges(false)
          return res
        } catch (err) {
          console.log(err)
          throw err
        }
      } else {
        console.log('no image to save')
      }
    }
  }

  useEffect(() => {
    // console.log('image url changed')
    saveImage()
  }, [imageUrl])

  return (
    <div className="row">
      <div className="col-12">
        <ImageWidget
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImageFile={setImageFile}
          editsEnabled={editsEnabled}
          setUnsavedChanges={setUnsavedChanges}
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
      <div className="col-12 form-floating">
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

export default SideBar
