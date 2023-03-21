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
      list_items: {
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
    saveButton.setAttribute('hidden', 'hidden')
  }

  const deleteChecklist = async () => {
    // let res = window.confirm('Delete Checklist?')
    let res = true
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
    <div className="">
      <div className="btn-group-sm" role="group">
        <button
          className="btn btn-warning border"
          id={`li-add-${id}`}
          onClick={addItem}
        >
          +
        </button>
        <button
          className="btn btn-success border"
          id={`li-save-${id}`}
          hidden
          onClick={saveChecklist}
        >
          Save
        </button>
        <button
          className="btn btn-danger border"
          id={`li-del-${id}`}
          onClick={deleteChecklist}
        >
          Delete
        </button>
      </div>
      <div className="container">
        <div className="row">
          {items.map((item, i) => (
            <div className="col-12 row justify-content-md-center g-0" key={i}>
              <input
                className="col-2 align-self-center h-50"
                name="completed"
                id={i}
                onChange={handleCheckbox}
                type="checkbox"
                checked={item.completed}
              />
              <textarea
                className="col-8"
                name="text"
                id={i}
                onChange={handleChange}
                value={item.text}
              />
              <button
                id={i}
                className="btn btn-secondary align-self-center border col-2 h-50"
                onClick={deleteItem}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row">
        {items.map((item, i) => (
          <div className="col-12 row justify-content-md-center g-0" key={i}>
            <input
              className="col-2"
              type="checkbox"
              checked={item.completed}
              readOnly
            />
            <textarea className="col-10" value={item.text} readOnly />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Checklist
