import { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const useAddDocumentWithCustomID = (col) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const addDocument = async (id, data) => {
    setIsPending(true);
    try {
      const docRef = doc(db, col, id);
      await setDoc(docRef, data);
    } catch (err) {
      console.error(err);
      setError("Could not add the document");
    } finally {
      setIsPending(false);
    }
  };

  const updateDocument = async (docId, newData) => {
    setIsPending(true);
    try {
      const docRef = doc(db, col, docId);
      await updateDoc(docRef, newData);
    } catch (err) {
      console.error(err);
      setError("Could not update the document");
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, addDocument, updateDocument };
};
