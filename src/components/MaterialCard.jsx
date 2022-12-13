import { useEffect } from 'react'

const MaterialCard = ({ i, name, amount, editMode, details, setDetails }) => {
  const showButtons = () => {
    let deleteButton = document.getElementById(`mat-del ${i}`)
    deleteButton.removeAttribute('hidden')
  }

  const hideButtons = () => {
    let deleteButton = document.getElementById(`mat-del ${i}`)
    deleteButton.setAttribute('hidden', 'hidden')
  }

  const handleDelete = () => {
    let newList = details.materials.list
    newList.splice(i, i + 1)
    setDetails({
      ...details,
      materials: {
        list: newList
      }
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
    <div className="container row">
      <h5 className="col-2">{name}</h5>
      <p className="col-1">{amount}</p>
      <button
        className="col-2"
        id={`mat-del ${i}`}
        onClick={handleDelete}
        hidden
      >
        Delete
      </button>
    </div>
  )
}

export default MaterialCard
