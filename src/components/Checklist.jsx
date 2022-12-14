import { useState, useEffect } from 'react'

const Checklist = ({ listItems, id, editsEnabled }) => {
  const [items, setItems] = useState([])

  const addItem = () => {
    setItems([
      ...items,
      {
        text: '',
        completed: false
      }
    ])
  }

  if (listItems.items === items) {
    //make save button invisible
    console.log('ha')
  } else {
    // make visible
    console.log('noooo')
  }

  const handleChange = (e) => {
    let index = parseInt(e.target.id)
    console.log(items)
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
  }

  const handleCheckbox = (e) => {
    let index = parseInt(e.target.id)
    console.log(items)
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
  }

  useEffect(() => {
    setItems(listItems.items)
  }, [])

  return editsEnabled ? (
    <div className="border">
      <div>
        <button>Save</button>
        <button onClick={addItem}>+</button>
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
            <button className="col-2">-</button>
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
