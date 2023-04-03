import React from 'react'

// styles
import './MiasActionButtons.css'

export default function MiasActionButtons() {
  return (
    <div className='MiasActionButtons'>
      <div className="btn-with-text-flex">
        <button>Play Raji’s requested video</button>
        <p>Playing the video using this button will grab the timestamp of your stream, and store it in the database</p>
      </div>
      <div className="btn-with-text-flex">
        <button>Move to the next person</button>
        <p>This will remove the number ‘1’, click it when you have watched the video</p>
      </div>
    </div>
  )
}
