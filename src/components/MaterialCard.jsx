import { useEffect } from 'react'

const MaterialCard = ({ i, material, name, amount, materials, editMode }) => {
  const showButtons = () => {
    let deleteButton = document.getElementById(`mat-del ${i}`)
    deleteButton.removeAttribute('hidden')
  }

  const hideButtons = () => {
    let deleteButton = document.getElementById(`mat-del ${i}`)
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
    <div className="container row">
      <h5 className="col-2">{name}</h5>
      <p className="col-1">{amount}</p>
      <button
        className="col-2"
        id={`mat-del ${i}`}
        onClick={() => {
          materials.list.splice(i, i + 1)
        }}
        hidden
      >
        Delete
      </button>
    </div>
  )
}

export default MaterialCard
