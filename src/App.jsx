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
      </Routes>
      <Routes>
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
