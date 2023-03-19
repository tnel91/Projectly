import { useState, useEffect } from 'react'
import Checklist from '../components/Checklist'
import Client from '../services/api'
import { BASE_URL } from '../globals'

const Organizer = ({ projectId, editsEnabled }) => {
  const [checklists, setChecklists] = useState([])

  const getChecklists = async () => {
    await Client.get(`${BASE_URL}/checklists/${projectId}`)
      .then((response) => {
        setChecklists(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createChecklist = async () => {
    await Client.post(`${BASE_URL}/checklists/${projectId}`)
      .then((response) => {
        setChecklists([...checklists, response.data])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (checklists.length === 0) {
      getChecklists()
    }
  }, [])

  return (
    <div>
      <h5>Checklists</h5>
      <button
        className="btn btn-primary"
        id="new-checklist-button"
        onClick={createChecklist}
        hidden
      >
        New Checklist
      </button>
      <div className="container">
        <div className="row">
          {checklists.map((checklist, i) => (
            <div
              className="card m-1 g-2 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2"
              key={checklist.id}
            >
              <Checklist
                i={i}
                editsEnabled={editsEnabled}
                id={checklist.id}
                listItems={checklist.list_items}
                setChecklists={setChecklists}
                checklists={checklists}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Organizer
