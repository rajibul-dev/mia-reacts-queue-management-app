import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useForgotPassword } from "../../hooks/useForgotPassword";

// styles
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { forgotPassword, error, isPending } = useForgotPassword()

  const handleSubmit = (event) => {
    event.preventDefault();
    forgotPassword(email);
  }

  return (
    <div className="ForgotPassword">
      <div className="fp-container">
        <h1>Forgot password</h1>
        <p className="p">
          A password-reset link will be sent to you in your email
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="not-password-input"
            type='email'
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          {errorMessage && <p className="error">{errorMessage}</p>}
          {error && <p className="error">{error}</p>}

          <div className="two-btn">
            <button 
              className="submit-btn"
              type="submit"
            >
              Get password recovery link
            </button>
          </div>

          <p className="p-under-btn">Go back to login page <Link to='/login' className="forgot-password a-under-btn">Login</Link></p>
        </form>
      </div>
    </div>
  )
}
