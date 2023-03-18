import React, { useState, useEffect } from "react"

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
      {isAdmin && <h1>admin welcome!</h1>}
      {!isAdmin && <h1>access denied</h1>}
    </div>
  )
}
