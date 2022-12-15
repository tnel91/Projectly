import { useEffect } from 'react'

const PhotoComponent = ({ i, image, editMode, details, setDetails }) => {
  const showButtons = () => {
    let deleteButton = document.getElementById(`img-del ${i}`)
    deleteButton.removeAttribute('hidden')
  }

  const hideButtons = () => {
    let deleteButton = document.getElementById(`img-del ${i}`)
    deleteButton.setAttribute('hidden', 'hidden')
  }

  const handleDelete = () => {
    let newList = details.images
    newList.splice(i, i + 1)
    setDetails({
      ...details,
      images: newList
    })
  }

  useEffect(() => {
    if (editMode) {
      showButtons()
    } else {
      hideButtons()
    }
  }, [editMode])

  return (
    <div className="container card">
      <div className="row">
        <img
          className="col-11 img-flid"
          src={image}
          alt={`Image URL: ${image}`}
        />
        <div className="col-1 ow">
          <button hidden className="col-12 btn btn-success">
            ↑
          </button>
          <button
            className="col-12 btn btn-danger"
            id={`img-del ${i}`}
            onClick={handleDelete}
            hidden
          >
            X
          </button>
          <button hidden className="col-12 btn btn-success text-center">
            ↓
          </button>
        </div>
      </div>
    </div>
  )
}

export default PhotoComponent
