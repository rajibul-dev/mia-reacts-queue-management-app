import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSignup } from "../../hooks/useSignup";

// styles
import './Signup.css'
import VisibilityOnIcon from '../../icons/visibility.svg';
import VisibilityOffIcon from '../../icons/visibility-off.svg';

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, error, isPending } = useSignup()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confPass) {
      signup(email, password, name)
    } else {
      setErrorMessage('Please enter the password correctly in conform password field')
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="Signup">
      <div className="signup-container">
        <h1>Create account</h1>
        <p className="p">
          You need to create an account to access this website
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="not-password-input"
            type='text'
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <input
            className="not-password-input"
            type='email'
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
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
            name="conform-password"
            placeholder="Conform password"
            value={confPass}
            onChange={(e) => setConfPass(e.target.value)}
            required
          />

          {errorMessage && <p className="error">{errorMessage}</p>}
          {error && <p className="error">{error}</p>}

          <div className="two-btn">
            <button 
              className="submit-btn"
              type="submit"
            >
              Create account
            </button>
          </div>

          <p className="p-under-btn">Already have an account? <Link to='/login' className="forgot-password a-under-btn">Login here</Link></p>
        </form>
      </div>
    </div>
  )
}
