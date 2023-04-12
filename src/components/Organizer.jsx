import { useState, useEffect } from 'react'
import Checklist from '../components/Checklist'
import Client from '../services/api'
import { BASE_URL } from '../globals'
import { Draggable, Droppable } from '@hello-pangea/dnd'

const Organizer = ({
  projectId,
  editsEnabled,
  dragged,
  setDragged,
  ownerId
}) => {
  const [checklists, setChecklists] = useState(null)

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

  const updateOrder = async (idArr) => {
    await Client.put(`${BASE_URL}/checklists/order`, {
      ownerId: ownerId,
      idArr: idArr
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (
      dragged?.source?.droppableId === 'organizer' &&
      dragged?.destination?.droppableId === 'organizer'
    ) {
      const { source, destination } = dragged
      let newChecklists = [...checklists]
      const [draggedList] = newChecklists.splice(source.index, 1)
      newChecklists.splice(destination.index, 0, draggedList)
      let idArr = []
      let updatedChecklists = newChecklists.map((checklist, i) => {
        checklist.order_index = i
        idArr.push(checklist.id)
        return checklist
      })
      updateOrder(idArr)
      setChecklists(updatedChecklists)
      setDragged(null)
    }
  }, [dragged])

  useEffect(() => {
    if (!checklists) {
      getChecklists()
    }
  }, [checklists])

  return (
    <Droppable droppableId="organizer" direction="horizontal">
      {(provided) => (
        <div
          id="tile-section"
          className="border border-danger"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {checklists &&
            checklists.map((checklist, i) => (
              <Draggable
                key={checklist.id}
                draggableId={`${checklist.id}`}
                index={i}
              >
                {(provided) => (
                  <div
                    className="card p-1 g-1 project-tile"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {
                      <Checklist
                        i={i}
                        editsEnabled={editsEnabled}
                        id={checklist.id}
                        listItems={checklist.list_items}
                        setChecklists={setChecklists}
                        checklists={checklists}
                      />
                    }
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Organizer
