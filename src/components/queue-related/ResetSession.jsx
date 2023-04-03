import React from 'react'

// styles
import './ResetSession.css'

export default function ResetSession() {
  return (
    <section className='ResetSession'>
      <h2>Reset session</h2>
      <p>By clicking the below buttons, you are resetting the queue as if you have done streaming for the day and people will be able to join the queue again for the next stream</p>
      <div className="reset-btn-flex">
        <button className='not-keep'>Reset session and reset the list</button>
        <button className='keep'>Reset session but keep the list</button>
      </div>
    </section>
  )
}
