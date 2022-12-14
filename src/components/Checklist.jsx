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

  const handleChange = (e) => {
    let index = e.target.id
    console.log(index)
    let x = items[index]
    console.log(x.completed)
    // console.log(items[index].text)
    setItems([...items, x])
  }

  const handleCheckbox = (e) => {
    // let index = e.target.name
    // if (items[index].completed === false) {
    //   setItems({ ...items, items[index].completed: true })
    // } else {
    //   setItems({ ...items, [e.target.id]: false })
    // }
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
              id={id}
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
