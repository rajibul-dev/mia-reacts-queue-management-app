import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Verify from "./pages/verify/Verify";
import Root from "./pages/root/Root";
import Viewer from "./pages/queue-viewer/Viewer";
import ManageQueue from "./pages/queueManagement/ManageQueue";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import { useAuthContext } from "./hooks/useAuthContext";
const dotenv = require("dotenv");
dotenv.config();
const adminPassword = process.env.INAPP_ADMIN_PASSWORD;
const isAdmin = localStorage.getItem(adminPassword) === "true";
const loggedInBefore = localStorage.getItem("logged-in-before") === "true";

export default function App() {
  const { user, authIsReady } = useAuthContext();

  useEffect(() => {
    if (user) {
      localStorage.setItem("logged-in-before", true);
    }
  }, [user]);

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                user ? (
                  <Root />
                ) : (
                  <Navigate to={`${loggedInBefore ? "/login" : "/signup"}`} />
                )
              }
            />
            <Route
              path="/viewer"
              element={
                user ? (
                  <Viewer />
                ) : (
                  <Navigate to={`${loggedInBefore ? "/login" : "/signup"}`} />
                )
              }
            />
            <Route
              path="/verify"
              element={!isAdmin ? <Verify /> : <Navigate to="/manage-queue" />}
            />
            <Route
              path="/manage-queue"
              element={
                user ? (
                  <ManageQueue />
                ) : (
                  <Navigate to={`${loggedInBefore ? "/login" : "/signup"}`} />
                )
              }
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
