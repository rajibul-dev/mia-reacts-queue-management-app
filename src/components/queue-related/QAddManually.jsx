import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./QAddManually.css";

// components
import CustomToast from "../CustomToast";

export default function QAddManually({ queues }) {
  const [videoLink, setVideoLink] = useState("");
  const [user, setUser] = useState("");
  const [manualErr, setManualError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { addDocument, error, isPending } = useFirestore("queueList");

  const handleToastClose = () => {
    setManualError(null);
    setSuccess(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const onNumber = queues.length + 1;
    addDocument({
      name: user,
      onNumber,
      videoLink,
    });
    setVideoLink("");
    setUser("");
    setSuccess(`Successfully added ${user} to the list!`);
  };

  return (
    <>
      <section
        className={`QAddManually manage${
          queues.length === 0 ? " more-margin" : ""
        }`}
      >
        <h2>Add to queue list manually</h2>
        <form onSubmit={handleSubmit} className="add-manually-form">
          <input
            className="user"
            type="text"
            placeholder="User Name"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <input
            className="video-link"
            type="url"
            placeholder="Paste the video link here"
            onChange={(e) => setVideoLink(e.target.value)}
            value={videoLink}
            required
          />

          <button className="flex-grow" type="submit" disabled={isPending}>
            Add to list
          </button>
        </form>
      </section>
      {error && (
        <CustomToast
          message={error}
          type="error"
          duration={5000}
          onClose={handleToastClose}
          margin="err-margin-3"
        />
      )}
      {success && (
        <CustomToast
          message={success}
          type="success"
          duration={5000}
          onClose={handleToastClose}
          margin="err-margin-3"
        />
      )}
    </>
  );
}
