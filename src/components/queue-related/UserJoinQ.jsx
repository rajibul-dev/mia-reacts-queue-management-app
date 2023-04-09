import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAddDocumentWithCustomID } from "../../hooks/useAddDocumentWithCustomID";

import "./UserJoinQ.css";

// components
import CustomToast from "../CustomToast";

export default function UserJoinQ({ queues, document, user }) {
  const [videoLink, setVideoLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleToastClose = () => {
    setError(null);
    setSuccess(null);
  };

  const {
    addDocument: addQListDocument,
    deleteDocument: delQListDoc,
    updateDocument: updateQListDoc,
    error: qListAdderr,
    isPending: qListIsPending,
  } = useFirestore("queueList");
  const {
    addDocument: statAddQListDocument,
    error: statQListAdderr,
    isPending: statQListIsPending,
    updateDocument,
  } = useAddDocumentWithCustomID("QJoinStatus");

  const handleSubmit = (e) => {
    e.preventDefault();
    const onNumber = queues.length + 1;
    addQListDocument({
      name: user.displayName,
      onNumber,
      videoLink,
      uid: user.uid,
    });
    statAddQListDocument(user.uid, {
      canJoin: false,
    });
    setSuccess("Successfully added you to the queue!");
  };

  const handleLeave = () => {
    setVideoLink("");
    queues.forEach((q) => {
      if (q.uid && q.uid === user.uid) {
        delQListDoc(q.id);
      }
      statAddQListDocument(user.uid, {
        canJoin: true,
      });
    });
    setSuccess("Successfully removed you from the queue");
  };

  const handleEditing = () => {
    setIsEditing(true);
    queues.forEach((q) => {
      if (q.uid && q.uid === user.uid) {
        setVideoLink(q.videoLink);
      }
    });
  };

  const handleEditCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    queues.forEach((q) => {
      if (q.uid && q.uid === user.uid) {
        updateQListDoc(q.id, {
          ...q,
          videoLink,
        });
      }
    });
    setIsEditing(false);
    setSuccess("Successfully updated your link!");
  };

  return (
    <>
      <section className="UserJoinQ QAddManually">
        {document && document.canJoin && !isEditing && (
          <form className="add-manually-form" onSubmit={handleSubmit}>
            <input
              className="video-link"
              type="url"
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
        {document && !document.canJoin && !isEditing && (
          <div className="add-manually-form user-action-btns">
            <button className="leave-q" onClick={handleLeave}>
              Leave queue
            </button>
            <button className="edit-q" onClick={handleEditing}>
              Edit requested link
            </button>
          </div>
        )}
        {isEditing && (
          <form
            className="add-manually-form userEdit"
            onSubmit={handleEditSubmit}
          >
            <input
              className="video-link"
              type="url"
              placeholder="Paste the video link here"
              onChange={(e) => setVideoLink(e.target.value)}
              value={videoLink}
              disabled={qListIsPending}
              required
            />

            <div className="two-btn-flex">
              <button className="cancel" onClick={handleEditCancel}>
                Cancel
              </button>
              <button type="submit">Save changes</button>
            </div>
            {qListAdderr && <p className="error">{qListAdderr}</p>}
          </form>
        )}
      </section>
      {error && (
        <CustomToast
          message={error}
          type="error"
          duration={5000}
          onClose={handleToastClose}
          margin="err-margin-2"
        />
      )}
      {success && (
        <CustomToast
          message={success}
          type="success"
          duration={5000000}
          onClose={handleToastClose}
          margin="err-margin-2"
        />
      )}
    </>
  );
}
