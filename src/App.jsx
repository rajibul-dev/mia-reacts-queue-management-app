import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./pages/verify/Verify";
import Root from "./pages/root/Root";
import Viewer from "./pages/queue-viewer/Viewer";
import ManageQueue from "./pages/queueManagement/ManageQueue";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/manage-queue" element={<ManageQueue />} />
      </Routes>
    </BrowserRouter>
  )
}
