import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {

    // set reference
    const ref = collection(db, col)

    // realtime data
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({
          ...doc.data(),
          id: doc.id
        })
      })
      // update state
      setDocuments(results)
      setError(null)
    },
    
    (err) => {
      console.error(err)
      setError('Could not Fetch the data')
    })
    
    // cleanup function
    return () => unsub()

  }, [col])

  return { documents, error }
}
