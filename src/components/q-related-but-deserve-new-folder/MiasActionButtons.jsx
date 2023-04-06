import React from 'react'

// styles
import './MiasActionButtons.css'

// icons
import PlayIcon from '../../icons/play-icon.svg'
import NextIcon from '../../icons/next-icon.svg'

export default function MiasActionButtons() {
  return (
    <div className='MiasActionButtons'>
      <div className="btn-with-text-flex play-n-grab">
        <button><img className='play-icon' src={PlayIcon} alt="play icon" /><span>Play Raji’s requested video</span></button>
        <p>Playing the video using this button will grab the timestamp of your stream, and store it in the database</p>
      </div>
      <div className="btn-with-text-flex move-n-del">
        <button>
          <span>Move to the next person</span>
          <img src={NextIcon} alt="next icon" />
        </button>
        <p>This will remove the number ‘1’, click it when you have watched the video</p>
      </div>
    </div>
  )
}
