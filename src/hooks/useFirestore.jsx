import { useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export const useFirestore = (col) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const addDocument = async (data) => {
    setIsPending(true);
    try {
      await addDoc(collection(db, col), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      setError("Could not add the document");
    } finally {
      setIsPending(false);
    }
  };

  const updateDocument = async (id, data) => {
    setIsPending(true);
    try {
      const docRef = doc(db, col, id);
      await setDoc(docRef, data, { merge: true });
    } catch (err) {
      console.error(err);
      setError("Could not update the document");
    } finally {
      setIsPending(false);
    }
  };

  const deleteDocument = async (id) => {
    setIsPending(true);
    try {
      const docRef = doc(db, col, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
      setError("Could not delete the document");
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, addDocument, updateDocument, deleteDocument };
};
