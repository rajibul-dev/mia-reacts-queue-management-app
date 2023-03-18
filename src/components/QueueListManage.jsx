import React from 'react'

// styles
import './QueueListManage.css'
import DragIndicatorIcon from '../icons/draggable-indicator.svg'
import EditIcon from '../icons/edit-btn-icon.svg'

export default function QueueListManage({ queues }) {

  return (
    <ol className="queue-list-in-both QueueListManage">
      {queues.map((queue) => (
        <li key={queue.id}>
          <button className='drag-btn'>
            <img
              className='drag-icon'
              src={DragIndicatorIcon}
              alt="drag icon / drag button / 6-dots button"
            />
          </button>
          <h2>{queue.onNumber}</h2>
          <div className="flex-name-n-btn">
            <p>{queue.name}</p>
            <a href={queue.videoLink} target='_blank'>
            </a>
          </div>
          <button className='edit-btn'>
            <img
              className='edit-icon'
              src={EditIcon}
              alt="edit button / icon"
            />
          </button>
        </li>
      ))}
    </ol>
  )
}
