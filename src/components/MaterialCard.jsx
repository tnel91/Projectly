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
    <div className="container border">
      <div className="row align-items-center">
        <h5 className="col-7">{name}</h5>
        <p className="col-3">{amount}</p>
        <button
          className="btn btn-secondary align-self-center border col-2 h-50"
          id={`mat-del ${i}`}
          onClick={handleDelete}
          hidden
        >
          -
        </button>
      </div>
    </div>
  )
}

export default MaterialCard
