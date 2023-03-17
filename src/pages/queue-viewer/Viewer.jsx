import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";

// components
import QueueListView from "../../components/QueueListView";

// styles
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
    <div className="Viewer">
      <div className="sm-container">
        <h1>Mia Reacts Queue List</h1>
        {error && <p>{error}</p>}
        {queueList && <QueueListView queues={queueList} />}
      </div>
    </div>
  );
}