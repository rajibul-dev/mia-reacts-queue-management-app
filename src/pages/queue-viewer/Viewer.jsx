import React, { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";

// components
import Navbar from "../../components/Navbar";
import QueueListView from "../../components/queue-related/QListView";
import EmptyQueue from "../../components/queue-related/EmptyQ";
import QIsPending from "../../components/queue-related/QIsPending";
import UserJoinQ from "../../components/queue-related/UserJoinQ";

// styles
import "../../QGeneral.css";
import "./Viewer.css";

export default function Viewer() {
  const { documents, error, isPending } = useCollection("queueList");
  const [queueList, setQueueList] = useState([]);

  const { user } = useAuthContext();

  const {
    document,
    error: statusErr,
    isPending: statusPending,
  } = useDocument("QJoinStatus", user.uid);

  useEffect(() => {
    if (documents) {
      // Sort the queue list based on the onNumber property
      const sortedList = documents.sort((a, b) => a.onNumber - b.onNumber);
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
          {isPending && <QIsPending />}
          {!isPending && (
            <UserJoinQ
              queues={queueList}
              document={document}
              statusErr={statusErr}
              user={user}
            />
          )}
          {queueList &&
          queueList.length !== 0 &&
          !isPending &&
          !statusPending ? (
            <QueueListView queues={queueList} />
          ) : null}
          {queueList &&
          queueList.length === 0 &&
          !isPending &&
          !statusPending ? (
            <EmptyQueue />
          ) : null}
        </div>
      </div>
    </>
  );
}
