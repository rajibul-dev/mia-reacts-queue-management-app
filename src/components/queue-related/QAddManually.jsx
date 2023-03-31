import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./QAddManually.css";

export default function QAddManually({ queues }) {
  const [videoLink, setVideoLink] = useState("");
  const [user, setUser] = useState("");

  const { addDocument, error, isPending } = useFirestore("queueList");

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
  };

  return (
    <section className="QAddManually">
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
          type="text"
          placeholder="Paste the video link here"
          onChange={(e) => setVideoLink(e.target.value)}
          value={videoLink}
          required
        />

        <button
          type="submit"
          disabled={isPending}
        >
          Add to list
        </button>
      </form>
    </section>
  );
}
