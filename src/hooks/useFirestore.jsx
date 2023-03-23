import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, addDoc, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

export const useFirestore = (col) => {
  const [error, setError] = useState(null)

  const addDocument = async (data) => {
    try {
      await addDoc(collection(db, col), data)
    } catch (err) {
      console.error(err)
      setError('Could not add the document')
    }
  }

  const updateDocument = async (id, data) => {
    try {
      const docRef = doc(db, col, id)
      await setDoc(docRef, data, { merge: true })
    } catch (err) {
      console.error(err)
      setError('Could not update the document')
    }
  }

  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, col, id)
      await deleteDoc(docRef)
    } catch (err) {
      console.error(err)
      setError('Could not delete the document')
    }
  }

  return { error, addDocument, updateDocument, deleteDocument }
}