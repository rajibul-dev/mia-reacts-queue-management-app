import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
const dotenv = require('dotenv');
dotenv.config()

// password
const adminPassword = process.env.INAPP_ADMIN_PASSWORD;

// styles
import './Verify.css'
import VisibilityOnIcon from '../../icons/visibility.svg';
import VisibilityOffIcon from '../../icons/visibility-off.svg';

export default function Verify() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();

  const handleCancel = () => {
    history("/");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === adminPassword) {
      localStorage.setItem(adminPassword, true);
      history("/manage-queue"); 
    } else {
      setErrorMessage("Incorrect password, please try again.");
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="Verify">
      <div className="Verify-container">
        <h1>Enter password</h1>
        <p className="p">
          We can’t let other people manage the queue list. That’s why you need to enter the valid password to verify yourself.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
            <img 
              className="eye-btn"
              src={showPassword ? VisibilityOnIcon : VisibilityOffIcon}
              alt={showPassword ? "visibility on" : "visibility off"}
              onClick={toggleShowPassword}
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="two-btn">
            <button 
              className="cancel-btn"
              onClick={handleCancel}
              type='button'
            >
              Cancel
            </button>
            <button 
              className="submit-btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
