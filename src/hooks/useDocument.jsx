import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const docRef = doc(db, collectionName, docId);

    // Set isPending state to true while fetching data
    setIsPending(true);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        setDocument({ ...doc.data(), id: doc.id });
        setError(null);
        setIsPending(false);
      },
      (err) => {
        console.error(err);
        setError("Could not fetch the data");
        setIsPending(false);
      },
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { document, error, isPending };
};
