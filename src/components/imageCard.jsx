import { useEffect } from 'react'

const ImageCard = ({ i, image, images, editMode }) => {
  const showButtons = () => {
    let deleteButton = document.getElementById(`img-del ${i}`)
    deleteButton.removeAttribute('hidden')
  }

  const hideButtons = () => {
    let deleteButton = document.getElementById(`img-del ${i}`)
    deleteButton.setAttribute('hidden', 'hidden')
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
      <button
        id={`img-del ${i}`}
        onClick={() => {
          images.splice(i, i + 1)
        }}
        hidden
      >
        Delete
      </button>
    </div>
  )
}

export default ImageCard
