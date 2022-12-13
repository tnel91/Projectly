import { useEffect } from 'react'

const ImageCard = ({ i, image, images, editMode }) => {
  const showButtons = () => {
    let deleteButton = document.getElementById(`img-del ${i}`)
    deleteButton.removeAttribute('hidden')
  }

  useEffect(() => {
    if (editMode) {
      showButtons()
    }
  }, [])

  return (
    <div>
      <img src={image} alt={`Image URL: ${image}`} />
      <button
        id={`img-del ${i}`}
        onClick={() => {
          if (editMode) images.splice(i, i + 1)
        }}
        hidden
      >
        Delete
      </button>
    </div>
  )
}

export default ImageCard
