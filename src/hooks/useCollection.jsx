import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // set reference
    const ref = collection(db, col);

    // set isPending state to true while fetching data
    setIsPending(true);

    // realtime data
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        // update state
        setDocuments(results);
        setError(null);
        setIsPending(false);
      },

      (err) => {
        console.error(err);
        setError("Could not Fetch the data");
        setIsPending(false);
      },
    );

    // cleanup function
    return () => unsub();
  }, [col]);

  return { documents, error, isPending };
};
