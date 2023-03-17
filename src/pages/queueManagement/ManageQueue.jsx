import React from "react"

// styles
import './ManageQueue.css'
const isAdmin = localStorage.getItem("isAdmin") === "true";

export default function ManageQueue() {
  return (
    <div>
      {isAdmin && <h1>admin</h1>}
      {!isAdmin && <h1>not admin</h1>}
    </div>
  )
}
