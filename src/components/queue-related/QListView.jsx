import React from "react"

// styles
import './QListView.css'

export default function QueueListView({ queues }) {
  return (
    <ol className="queue-list-in-both QueueListView">
      {queues.map((queue) => (
        <li key={queue.id}>
          <h2>{queue.onNumber}</h2>
          <div className="flex-name-n-btn">
          <p>{queue.name}</p>
          <a href={queue.videoLink} target='_blank'>
          </a>
          </div>
        </li>
      ))}
    </ol>
  )
}
