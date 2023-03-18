import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

// styles
import './ManageQueue.css'

const adminPassword = process.env.INAPP_ADMIN_PASSWORD;

export default function ManageQueue() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem(adminPassword) === 'true');

  useEffect(() => {
    setIsAdmin(localStorage.getItem(adminPassword) === 'true');
  }, [localStorage.getItem(adminPassword)]);

  return (
    <div>
      {isAdmin && 
        <h1>admin welcome!</h1>
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
  )
}
