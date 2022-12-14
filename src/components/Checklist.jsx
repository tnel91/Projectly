import { useState, useEffect } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const Checklist = ({ listItems, id, editsEnabled }) => {
  const [items, setItems] = useState([])
  const [edited, setEdited] = useState(false)

  const addItem = () => {
    setItems([
      ...items,
      {
        text: '',
        completed: false
      }
    ])
    if (!edited) {
      setEdited(true)
    }
  }

  const handleChange = (e) => {
    let index = parseInt(e.target.id)
    let arr = items.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.value
        }
      }
      return item
    })
    setItems(arr)
    if (!edited) {
      setEdited(true)
    }
  }

  const handleCheckbox = (e) => {
    let index = parseInt(e.target.id)
    let arr = items.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [e.target.name]: e.target.checked
        }
      }
      return item
    })
    setItems(arr)
    if (!edited) {
      setEdited(true)
    }
  }

  const showEditButtons = () => {
    let saveButton = document.getElementById(`li-save-${id}`)
    saveButton.removeAttribute('hidden')
  }

  const saveChecklist = async () => {}

  useEffect(() => {
    if (!edited && items.length === 0) {
      console.log('initial load')
      setItems(listItems.items)
    }
    if (edited) {
      console.log('changed')
      showEditButtons()
    }
  }, [items])

  return editsEnabled ? (
    <div className="border">
      <div>
        <button id={`li-add-${id}`} onClick={addItem}>
          +
        </button>
        <button id={`li-save-${id}`} hidden onClick={saveChecklist}>
          Save
        </button>
      </div>
      <div>
        {items.map((item, i) => (
          <div className="border row" key={i}>
            <input
              name="completed"
              id={i}
              onChange={handleCheckbox}
              className="col-2"
              type="checkbox"
              checked={item.completed}
            />
            <input
              name="text"
              id={i}
              onChange={handleChange}
              className="col-7"
              value={item.text}
            />
            <button hidden id={`li-del-${i}`} className="li-del col-2">
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="border">
      <p>list</p>
      <div>
        {items.map((item, i) => (
          <div className="border row" key={i}>
            <input
              className="col"
              type="checkbox"
              checked={item.completed}
              readOnly
            />
            <p className="col">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checklist
