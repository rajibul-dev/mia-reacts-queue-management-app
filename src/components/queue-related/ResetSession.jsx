import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./ResetSession.css";

export default function ResetSession({ queues }) {
  const { deleteDocument, updateDocument, isPending, error } =
    useFirestore("QJoinStatus");
  const {
    deleteDocument: qListDel,
    updateDocument: qListUpdate,
    isPending: qListWritePending,
    error: qListWriteErr,
  } = useFirestore("queueList");
  const {
    documents,
    error: readErr,
    isPending: readPending,
  } = useCollection("QJoinStatus");
  const {
    documents: qListDocs,
    error: qListDocsErr,
    isPending: qListDocsPending,
  } = useCollection("queueList");

  const resetSessionKeep = (e) => {
    e.preventDefault();
    if (documents) {
      documents.forEach((doc) => {
        updateDocument(doc.id, { canJoin: true });
      });
    }
  };
  const resetSessionNotKeep = (e) => {
    e.preventDefault();
    if (documents) {
      documents.forEach((doc) => {
        updateDocument(doc.id, { canJoin: true });
      });
    }
    if (qListDocs) {
      qListDocs.forEach((doc) => {
        qListDel(doc.id);
      });
    }
  };

  return (
    <section className="ResetSession">
      <h2>Reset session</h2>
      <p>
        By clicking the below buttons, you are resetting the queue as if you
        have done streaming for the day and people will be able to join the
        queue again for the next stream
      </p>
      <div className="reset-btn-flex">
        <button className="not-keep" onClick={resetSessionNotKeep}>
          Reset session and reset the list
        </button>
        <button className="keep" onClick={resetSessionKeep}>
          Reset session but keep the list
        </button>
      </div>
    </section>
  );
}
