import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAddDocumentWithCustomID } from "../../hooks/useAddDocumentWithCustomID";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDocument } from "../../hooks/useDocument";

import "./UserJoinQ.css";

export default function UserJoinQ({ queues }) {
  const [videoLink, setVideoLink] = useState("");
  const { user } = useAuthContext();

  const {
    addDocument: addQListDocument,
    error: qListAdderr,
    isPending: qListIsPending,
  } = useFirestore("queueList");
  const {
    addDocument: statAddQListDocument,
    error: statQListAdderr,
    isPending: statQListIsPending,
    updateDocument,
  } = useAddDocumentWithCustomID("QJoinStatus");

  const { document, error, isPending } = useDocument("QJoinStatus", user.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onNumber = queues.length + 1;
    addQListDocument({
      name: user.displayName,
      onNumber,
      videoLink,
      uid: user.uid,
    });
    setVideoLink("");
    statAddQListDocument(user.uid, {
      canJoin: false,
    });
  };

  return (
    <section className="UserJoinQ QAddManually">
      {document && document.canJoin && (
        <form className="add-manually-form" onSubmit={handleSubmit}>
          <input
            className="video-link"
            type="text"
            placeholder="Paste the video link here"
            onChange={(e) => setVideoLink(e.target.value)}
            value={videoLink}
            disabled={qListIsPending}
            required
          />

          <button type="submit">Join the queue</button>
          {qListAdderr && <p className="error">{qListAdderr}</p>}
        </form>
      )}
      {document && !document.canJoin && (
        <div className="add-manually-form">
          <button className="leave-q">Leave queue</button>
          <button className="edit-q">Edit requested link</button>
        </div>
      )}
    </section>
  );
}
