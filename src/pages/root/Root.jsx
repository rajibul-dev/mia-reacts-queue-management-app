import React from "react"

// styles
import './Root.css'

export default function Root() {
  return (
    <div className="Root">
      <h1>What do you want to do?</h1>
      
      <div className="btn-flex-initial">
        <button>
          I’m a viewer and I want to see the queue list
        </button>

        <button>
          I’m Mia and I want to manage the queue for the stream
        </button>
      </div>
    </div>
  )
}
