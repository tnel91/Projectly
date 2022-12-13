import { useEffect } from 'react'

const ImageCard = ({ i, image, editMode, details, setDetails }) => {
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
    <div className="container">
      <img className="w-25" src={image} alt={`Image URL: ${image}`} />
      <button id={`img-del ${i}`} onClick={handleDelete} hidden>
        Delete
      </button>
    </div>
  )
}

export default ImageCard
