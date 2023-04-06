import React, { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./MiasActionButtons.css";

// icons
import PlayIcon from "../../icons/play-icon.svg";
import NextIcon from "../../icons/next-icon.svg";

export default function MiasActionButtons({ queues }) {
  const [firstOnQueue, setFirstOnQueue] = useState("");
  const [firstLink, setFirstLink] = useState("");
  const [firstID, setFirstID] = useState("");

  const {
    addDocument: tsAddDoc,
    updateDocument: tsUpdateDoc,
    error: tsErr,
    isPending: tsPending,
  } = useFirestore("reactedTimestamps");

  const {
    updateDocument: qlUpdateDoc,
    deleteDocument: qlDelDoc,
    error: qlErr,
    isPending: qlPending,
  } = useFirestore("queueList");

  useEffect(() => {
    if (!queues) return;
    queues.forEach((q) => {
      if (q.onNumber === 1) {
        setFirstOnQueue(q.name);
        setFirstLink(q.videoLink);
        setFirstID(q.id);
      }
    });
  }, [queues]);

  const handlePlayNGrabTs = async (e) => {
    e.preventDefault();
    window.open(firstLink, "_blank");
  };

  const handleMoveToNext = async (e) => {
    e.preventDefault();
    await qlDelDoc(firstID);

    queues.forEach((q) => {
      if (q.onNumber > 1) {
        qlUpdateDoc(q.id, {
          ...q,
          onNumber: q.onNumber - 1,
        });
      }
    });
  };

  return (
    <div className="MiasActionButtons">
      <div className="btn-with-text-flex play-n-grab">
        <button onClick={handlePlayNGrabTs}>
          <img className="play-icon" src={PlayIcon} alt="play icon" />
          <span>Play {firstOnQueue}’s requested video</span>
        </button>
        <p>
          We will make this button able to generate timestamps for the videos
          you are reacting to, if possible
        </p>
      </div>
      <div className="btn-with-text-flex move-n-del">
        <button onClick={handleMoveToNext}>
          <span>Move to the next person</span>
          <img src={NextIcon} alt="next icon" />
        </button>
        <p>
          This will remove the number ‘1’, click it when you have watched the
          video
        </p>
      </div>
    </div>
  );
}
