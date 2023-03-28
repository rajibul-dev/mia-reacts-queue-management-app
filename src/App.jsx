import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Verify from "./pages/verify/Verify";
import Root from "./pages/root/Root";
import Viewer from "./pages/queue-viewer/Viewer";
import ManageQueue from "./pages/queueManagement/ManageQueue";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
const dotenv = require('dotenv');
dotenv.config();
const adminPassword = process.env.INAPP_ADMIN_PASSWORD;
const isAdmin = localStorage.getItem(adminPassword) === 'true';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/verify"
          element={!isAdmin ? <Verify /> : <Navigate to="/manage-queue" /> }
        />
        <Route path="/manage-queue" element={<ManageQueue />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}