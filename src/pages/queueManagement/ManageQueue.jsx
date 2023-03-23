import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";

// styles
import '../../queue-list-in-both.css'
import './ManageQueue.css'

// components
import Navbar from "../../components/Navbar";
import QueueListManage from "../../components/QueueListManage";

const adminPassword = process.env.INAPP_ADMIN_PASSWORD;

export default function ManageQueue() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem(adminPassword) === 'true');

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

  useEffect(() => {
    setIsAdmin(localStorage.getItem(adminPassword) === 'true');
  }, [localStorage.getItem(adminPassword)]);

  return (
    <>
      <Navbar />
      <div className="Manager">
        {isAdmin && 
          <div className="manager-container sm-container"> 
            <h1>Manage Queue List</h1>
            {error && <p>{error}</p>}
            {queueList && <QueueListManage queues={queueList} />}
            {/* TODO: move to the next person button, and add button */}
          </div>
        }

        {!isAdmin && 
        <div className="not-admin">
          <h1>You haven’t verified yourself</h1>
          <p>Go to the verify page and verify yourself by submitting the correct password. If you’re Mia or someone who has permission, you know the password :)</p>
          <Link to='/verify' state={{ route: '/manage-queue' }}>
            <button className="submit-btn modify-btn">
              Verify
            </button>
          </Link>
        </div>
        }
      </div>
    </>
  )
}
