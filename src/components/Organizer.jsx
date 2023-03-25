import { useState, useEffect } from 'react'
import Checklist from '../components/Checklist'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

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
    console.log('editsEnabled', editsEnabled)
  }, [editsEnabled])

  useEffect(() => {
    if (checklists.length === 0) {
      getChecklists()
    }
  }, [])

  return (
    <DragDropContext>
      <Droppable>
        {(provided) => (
          <div id="tile-section" className="border border-danger">
            {checklists.map((checklist, i) => (
              <Draggable key={checklist.id}>
                {(provided) => (
                  <div className="card p-1 g-1 project-tile" key={checklist.id}>
                    <Checklist
                      i={i}
                      editsEnabled={editsEnabled}
                      id={checklist.id}
                      listItems={checklist.list_items}
                      setChecklists={setChecklists}
                      checklists={checklists}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            <button
              hidden={!editsEnabled}
              className="btn btn-primary"
              id="new-checklist-button"
              onClick={createChecklist}
            >
              New Checklist
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Organizer
