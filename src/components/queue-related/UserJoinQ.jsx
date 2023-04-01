import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./UserJoinQ.css";

export default function UserJoinQ({ queues }) {
  const [videoLink, setVideoLink] = useState("");
  const { addDocument, error, isPending } = useFirestore("queueList");

  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const onNumber = queues.length + 1;
    addDocument({
      name: user.displayName,
      onNumber,
      videoLink,
    });
    setVideoLink("");
  };

  return (
    <section className="UserJoinQ QAddManually">
      <form className="add-manually-form" onSubmit={handleSubmit}>
        <input
          className="video-link"
          type="text"
          placeholder="Paste the video link here"
          onChange={(e) => setVideoLink(e.target.value)}
          value={videoLink}
          disabled={isPending}
          required
        />

        <button type="submit">Join the queue</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}
