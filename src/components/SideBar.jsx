import { useEffect, useState } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import ImageWidget from './ImageWidget'
import saveIcon from '../assets/save-64.png'

const SideBar = ({
  handleChange,
  handleFocus,
  handleBlur,
  details,
  imageUrl,
  setImageUrl,
  imageFile,
  setImageFile,
  editsEnabled,
  deleteProject,
  handleCheckbox,
  unsavedChanges
}) => {
  const [unsavedImage, setUnsavedImage] = useState(false)

  const saveImage = async () => {
    if (details.id && editsEnabled && unsavedImage) {
      console.log('saving image')
      if (imageUrl.includes('blob')) {
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
          if (res) {
            console.log('image file saved')
            setUnsavedImage(false)
            return res
          }
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
          if (res) {
            console.log('image url saved')
            setUnsavedImage(false)
            return res
          }
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
    saveImage()
  }, [imageUrl])

  return (
    <div className="row">
      {editsEnabled && (
        <div className="col-12 row">
          <div className="col-4">
            <label className="align-items-center">
              <input
                id="isPublic"
                type="checkbox"
                checked={details.isPublic}
                onChange={handleCheckbox}
              />
              <p className="align-center">Public?</p>
            </label>
          </div>
          <div className="col-4">
            <button className="btn btn-danger" onClick={deleteProject}>
              Delete Project
            </button>
          </div>
          <div className="col-4">
            {unsavedChanges && <img src={saveIcon} alt="saveIcon" />}
          </div>
        </div>
      )}
      <div className="col-12">
        <ImageWidget
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setImageFile={setImageFile}
          editsEnabled={editsEnabled}
          setUnsavedImage={setUnsavedImage}
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
