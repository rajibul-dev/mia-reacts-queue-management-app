import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";

// components
import Navbar from "../../components/Navbar";
import QueueListView from "../../components/QueueListView";

// styles
import '../../queue-list-in-both.css'
import "./Viewer.css";

export default function Viewer() {
  const { documents, error } = useCollection("queueList");
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    if (documents) {
      // Sort the queue list based on the onNumber property
      const sortedList = documents.sort(
        (a, b) => a.onNumber - b.onNumber
      );
      setQueueList(sortedList);
    }
  }, [documents]);

  return (
    <>
      <Navbar />
      <div className="Viewer">
        <div className="viewer-container sm-container">
          <h1>Mia Reacts Queue List</h1>
          {error && <p>{error}</p>}
          {queueList && <QueueListView queues={queueList} />}
        </div>
      </div>
    </>
  );
}
