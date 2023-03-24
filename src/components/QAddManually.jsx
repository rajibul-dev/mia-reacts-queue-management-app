import React, { useEffect, useState } from 'react'
import { AutoComplete, Input, Button } from 'antd';
import { useFirestore } from '../hooks/useFirestore';
import { useCollection } from '../hooks/useCollection';

// styles
import './QAddManually.css'

const options = [
  {label: "Ai Higuchi", value: "Ai Higuchi"},
  {label: "Adini Love Tunes", value: "Adini Love Tunes"},
  {label: "Raji", value: "Raji"},
  {label: "Kapt", value: "Kapt"}
]

export default function QAddManually({ queues }) {
  const [videoLinkValue, setVideoLinkValue] = useState('')
  const [userValue, setUserValue] = useState('')
  const { error:firestoreError, addDocument } = useFirestore('queueList')
  const { documents, error: readError } = useCollection("queueList");
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    setQueueList(documents)
  }, [documents])

  const handleSubmit = (event) => {
    event.preventDefault()
    const onNumber = queueList.length + 1
    console.log(videoLinkValue, userValue, onNumber)
    addDocument({
      name: userValue,
      onNumber,
      videoLink: videoLinkValue
    })
  }

  return (
    <section className='QAddManually'>
      <h2>Add to queue list manually</h2>
      <form onSubmit={handleSubmit} className='add-manually-form'>
        <Input
          className='video-link-input'
          type="text" 
          placeholder='Paste the video link here'
          value={videoLinkValue}
          onChange={(event) => setVideoLinkValue(event.target.value)}
        />
        <AutoComplete 
          className='auto-complete-input'
          placeholder="Select User ▼"
          options={options}
          onSelect={(value) => {
            setUserValue(value)
          }}
          filterOption={true}
        />
        <Button className='add-manually-btn' onClick={handleSubmit}>
          Add to list
        </Button>
      </form>
    </section>
  )
}
