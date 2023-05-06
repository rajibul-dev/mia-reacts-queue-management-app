import React, { useEffect, useState } from "react";

// styles
import "./QListView.css";
import CopyBtn from "./CopyBtn";

export default function QueueListView({ queues }) {
  return (
    <>
      <CopyBtn queues={queues} />
      <ol className="queue-list-in-both QueueListView">
        {queues.map((queue) => (
          <li key={queue.id}>
            <h2>{queue.onNumber}</h2>
            <div className="flex-name-n-btn">
              <p>{queue.name}</p>
              <a href={queue.videoLink} target="_blank"></a>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
