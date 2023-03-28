import React, { useState } from "react"
import { Link } from "react-router-dom"

// styles
import './Login.css'
import VisibilityOnIcon from '../../icons/visibility.svg';
import VisibilityOffIcon from '../../icons/visibility-off.svg';

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h1>Login</h1>
        {/* <p className="p">
          We can’t let other people manage the queue list. That’s why you need to enter the valid password to verify yourself.
        </p> */}
        <form onSubmit={handleSubmit}>
          <input
            className="not-password-input"
            type='email'
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <Link to='/forgot-password' className="forgot-password">Forgot password?</Link>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="two-btn">
            <button 
              className="submit-btn"
              type="submit"
            >
              Submit
            </button>
          </div>

          <p className="p-under-btn">Don’t have an account? <Link to='/signup' className="forgot-password a-under-btn">Sign-up here</Link></p>
        </form>
      </div>
    </div>
  )
}
