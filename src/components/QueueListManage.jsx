import React, { useState } from "react"

// styles
import "./QueueListManage.css"

// components
import QueueEditForm from "./QueueEditForm"

// icons
import DragIndicatorIcon from "../icons/draggable-indicator.svg"
import EditIcon from "../icons/edit-btn-icon.svg"

export default function QueueListManage({ queues }) {
  const [editingQueues, setEditingQueues] = useState([])

  const handleEditBtnClick = (queueId) => {
    setEditingQueues([...editingQueues, queueId])
  }

  const handleFormClose = (queueId) => {
    setEditingQueues(editingQueues.filter((id) => id !== queueId))
  }

  return (
    <ol className="queue-list-in-both QueueListManage">
      {queues.map((queue) => (
        <li
          key={queue.id}
          className={editingQueues.includes(queue.id) ? "editing" : null}
        >
          {editingQueues.includes(queue.id) ? null : (
            <button className="drag-btn">
              <img
                className="drag-icon"
                src={DragIndicatorIcon}
                alt="drag icon / drag button / 6-dots button"
              />
            </button>
          )}
          
          <h2>{queue.onNumber}</h2>

          {editingQueues.includes(queue.id) ? (
            <QueueEditForm
              queue={queue}
              onClose={() => handleFormClose(queue.id)}
            />
          ) : (
            <>
              <div className="flex-name-n-btn">
                <p>{queue.name}</p>
                <a href={queue.videoLink} target="_blank"></a>
              </div>
              <button className="edit-btn">
                <img
                  className="edit-icon"
                  src={EditIcon}
                  alt="edit button / icon"
                  onClick={() => handleEditBtnClick(queue.id)}
                />
              </button>
            </>
          )}
        </li>
      ))}
    </ol>
  )
}
