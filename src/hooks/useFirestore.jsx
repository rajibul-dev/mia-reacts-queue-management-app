import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DOCUMENT_PENDING":
    case "UPDATE_DOCUMENT_PENDING":
    case "DELETE_DOCUMENT_PENDING":
      return { ...state, isPending: true, success: null, error: null }
    case "ADD_DOCUMENT_SUCCESS":
    case "UPDATE_DOCUMENT_SUCCESS":
    case "DELETE_DOCUMENT_SUCCESS":
      return { ...state, isPending: false, success: action.payload, error: null }
    case "ADD_DOCUMENT_ERROR":
    case "UPDATE_DOCUMENT_ERROR":
    case "DELETE_DOCUMENT_ERROR":
      return { ...state, isPending: false, success: null, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // set reference
  let collectionStr = col
  const ref = collection(db, collectionStr)

  const addDocument = async (data) => {
    dispatch({ type: "ADD_DOCUMENT_PENDING" })
    try {
      const docRef = await addDoc(ref, data)
      dispatch({ type: "ADD_DOCUMENT_SUCCESS", payload: docRef })
    } catch (error) {
      dispatch({ type: "ADD_DOCUMENT_ERROR", payload: error.message })
    }
  }

  const updateDocument = async (id, data) => {
    dispatch({ type: "UPDATE_DOCUMENT_PENDING" })
    try {
      const docRef = doc(ref, id)
      await updateDoc(docRef, data)
      dispatch({ type: "UPDATE_DOCUMENT_SUCCESS", payload: id })
    } catch (error) {
      dispatch({ type: "UPDATE_DOCUMENT_ERROR", payload: error.message })
    }
  }

  const deleteDocument = async (id) => {
    dispatch({ type: "DELETE_DOCUMENT_PENDING" })
    try {
      const docRef = doc(ref, id)
      await deleteDoc(docRef)
      dispatch({ type: "DELETE_DOCUMENT_SUCCESS", payload: id })
    } catch (error) {
      dispatch({ type: "DELETE_DOCUMENT_ERROR", payload: error.message })
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return { response, addDocument, updateDocument, deleteDocument }
}
