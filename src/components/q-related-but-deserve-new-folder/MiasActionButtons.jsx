import React, { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";

const channelName = "miavocalcoach";

// styles
import "./MiasActionButtons.css";

// components
import CustomToast from "../CustomToast";

// icons
import PlayIcon from "../../icons/play-icon.svg";
import NextIcon from "../../icons/next-icon.svg";
import RedoIcon from "../../icons/redo-icon.svg";

export default function MiasActionButtons({ queues }) {
  const [firstOnQueue, setFirstOnQueue] = useState("");
  const [firstLink, setFirstLink] = useState("");
  const [firstID, setFirstID] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [timestampAdded, setTimestampAdded] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleToastClose = () => {
    setError(null);
    setSuccess(null);
  };

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

  const {
    documents: reactedTimestamps,
    error: readErr,
    isPending: readPending,
  } = useCollection("reactedTimestamps");

  useEffect(() => {
    if (!queues) return;
    queues.forEach((q) => {
      if (q.onNumber === 1) {
        setFirstOnQueue(q.name);
        setFirstLink(q.videoLink);
        setFirstID(q.id);
        q.timestampAdded ? setTimestampAdded(true) : setTimestampAdded(false);
        if (!timestamp) {
          if (q.timestamp) {
            setTimestamp(q.timestamp);
          }
        }
      }
    });
  }, [queues, timestamp]);

  const handlePlayNGrabTs = async (e) => {
    e.preventDefault();
    window.open(firstLink, "_blank");
    setError(null);

    // Make a request to the Twitch API
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
      {
        headers: {
          "Client-ID": "jvj6lrcutu1hfe358ii4ohi3owq660",
          Authorization: "Bearer " + "r3azycyz3z0kk4ngd0jkle1mro1zis",
        },
      },
    );

    // Parse the response as JSON
    const data = await response.json();

    // Extract the stream's started_at timestamp from the response
    const startedAt = data.data[0]?.started_at;

    // If the stream is live, compute the current timestamp based on the stream's started_at time
    if (startedAt) {
      // create timestamp in string format
      const startedAtDate = new Date(startedAt);
      const now = new Date();
      const diffSeconds = (now.getTime() - startedAtDate.getTime()) / 1000;
      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = Math.floor(diffSeconds % 60);
      const timestamp = `${hours}h${minutes}m${seconds}s`;
      setTimestamp(timestamp);
      uploadDataToDatabase(timestamp);
    } else {
      // If the stream is not live, set the timestamp to null
      setTimestamp(null);
      setError(
        "You are not streaming right now, thus you can't pick timestamp of the stream",
      );
    }
  };

  const uploadDataToDatabase = (timestamp) => {
    // upload data to the database
    if (timestamp) {
      tsAddDoc({
        user: firstOnQueue,
        reactedVideo: firstLink,
        timestamp,
        qListID: firstID,
      });
      qlUpdateDoc(firstID, {
        timestampAdded: true,
        timestamp,
      });
      setSuccess("Successfully added timestamp!");
    }
  };

  const overwriteTimestamp = async (e) => {
    e.preventDefault();
    setError(null);

    // Make a request to the Twitch API
    const response = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
      {
        headers: {
          "Client-ID": "jvj6lrcutu1hfe358ii4ohi3owq660",
          Authorization: "Bearer " + "r3azycyz3z0kk4ngd0jkle1mro1zis",
        },
      },
    );

    // Parse the response as JSON
    const data = await response.json();

    // Extract the stream's started_at timestamp from the response
    const startedAt = data.data[0]?.started_at;

    // If the stream is live, compute the current timestamp based on the stream's started_at time
    if (startedAt) {
      // create timestamp in string format
      const startedAtDate = new Date(startedAt);
      const now = new Date();
      const diffSeconds = (now.getTime() - startedAtDate.getTime()) / 1000;
      const hours = Math.floor(diffSeconds / 3600);
      const minutes = Math.floor((diffSeconds % 3600) / 60);
      const seconds = Math.floor(diffSeconds % 60);
      const timestamp = `${hours}h${minutes}m${seconds}s`;
      setTimestamp(timestamp);
      uploadOverwrittenDataToDatabase(timestamp);
    } else {
      // If the stream is not live, set the timestamp to null
      setTimestamp(null);
      setError(
        "You are not streaming right now, thus you can't pick timestamp of the stream",
      );
    }
  };

  const uploadOverwrittenDataToDatabase = (timestamp) => {
    if (timestamp) {
      reactedTimestamps.forEach((item) => {
        if (item.qListID === firstID) {
          tsUpdateDoc(item.id, {
            timestamp,
          });
        }
      });
      qlUpdateDoc(firstID, {
        timestampAdded: true,
        timestamp,
      });
      setSuccess("Successfully updated timestamp!");
    }
  };

  const handleMoveToNext = async (e) => {
    e.preventDefault();
    setTimestamp(null);
    setError(null);
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
    <>
      <div className="MiasActionButtons">
        {!timestampAdded && (
          <div className="btn-with-text-flex play-n-grab">
            <button onClick={handlePlayNGrabTs}>
              <img className="play-icon" src={PlayIcon} alt="play icon" />
              <span>Play {firstOnQueue}’s requested video</span>
            </button>
            <p>
              Playing the video using this button will grab the timestamp of
              your stream, and store it in the database
            </p>
          </div>
        )}
        {timestampAdded && (
          <div className="btn-with-text-flex play-n-grab">
            <button onClick={overwriteTimestamp}>
              <img className="redo-icon" src={RedoIcon} alt="redo icon" />
              <span>Overwrite timestamp to be now</span>
            </button>
            <p>
              The current timestamp of {firstOnQueue}'s requested video that you
              are reacting or reacted is set to <strong>{timestamp}</strong>
            </p>
          </div>
        )}
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
      {error && (
        <CustomToast
          message={error}
          type="error"
          duration={5000}
          onClose={handleToastClose}
          margin="err-margin"
        />
      )}
      {success && (
        <CustomToast
          message={success}
          type="success"
          duration={5000}
          onClose={handleToastClose}
          margin="err-margin"
        />
      )}
    </>
  );
}
