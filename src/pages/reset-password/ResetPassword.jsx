import React, { useState } from "react"

// styles
import './ResetPassword.css'
import VisibilityOnIcon from '../../icons/visibility.svg';
import VisibilityOffIcon from '../../icons/visibility-off.svg';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(password, confPass);
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="ResetPassword">
      <div className="rp-container">
        <h1>Reset password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img 
              className="eye-btn"
              src={showPassword ? VisibilityOnIcon : VisibilityOffIcon}
              alt={showPassword ? "visibility on" : "visibility off"}
              onClick={toggleShowPassword}
            />
          </div>
          <input
            className="not-password-input conform-password"
            type='password'
            placeholder="Conform new password"
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            required
          />

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="two-btn">
            <button 
              className="submit-btn"
              type="submit"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
