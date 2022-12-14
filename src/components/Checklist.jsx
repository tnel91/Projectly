import { useState, useEffect } from 'react'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const Checklist = ({
  i,
  listItems,
  id,
  editsEnabled,
  checklists,
  setChecklists
}) => {
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

  const deleteItem = (e) => {
    let index = parseInt(e.target.id)
    let arr = items.filter((item, i) => {
      if (index !== i) {
        return item
      }
    })
    setItems(arr)
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

  const saveChecklist = async () => {
    await Client.put(`${BASE_URL}/checklists/${id}`, {
      listItems: {
        items: items
      }
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    setEdited(false)
    let saveButton = document.getElementById(`li-save-${id}`)
    console.log(saveButton)
    saveButton.setAttribute('hidden', 'hidden')
  }

  const deleteChecklist = async () => {
    let res = window.confirm('Delete Checklist?')
    if (res) {
      await Client.delete(`${BASE_URL}/checklists/${id}`)
        .then(() => {
          let arr = checklists.filter((checklist, index) => {
            if (index !== i) {
              return checklist
            }
          })
          setChecklists(arr)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (!edited && items.length === 0) {
      setItems(listItems.items)
    }
    if (edited) {
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
        <button id={`li-del-${id}`} onClick={deleteChecklist}>
          Del
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
            <button id={i} className="col-2" onClick={deleteItem}>
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
