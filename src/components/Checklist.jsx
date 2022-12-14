import { useState, useEffect } from 'react'

const Checklist = ({ li, id, editsEnabled }) => {
  const [listItems, setListItems] = useState(null)

  useEffect(() => {
    setListItems(li)
  }, [])

  return (
    <div>
      <p>list</p>
      <div>
        {/* {listItems.map((listItem, index) => (
          <div key={index}></div>
        ))} */}
      </div>
    </div>
  )
}

export default Checklist
