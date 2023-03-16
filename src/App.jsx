import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Root from "./pages/root/Root";
import Viewer from "./pages/viewer/Viewer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
