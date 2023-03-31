import React, { useEffect, useState } from "react"
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { useNavigate } from "react-router-dom"

// styles
import './ResetPassword.css'
import VisibilityOnIcon from '../../icons/visibility.svg';
import VisibilityOffIcon from '../../icons/visibility-off.svg';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, error, isPending } = useForgotPassword()

  const queryParams = new URLSearchParams(window.location.search);
  const oobCode = queryParams.get('oobCode');
  const history = useNavigate();

  useEffect(() => {
    if (!oobCode) {
      history('/login')
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confPass) {
      resetPassword(oobCode, password);
      history('/login')
    } else {
      setErrorMessage('Please write the "conform password" correctly')
    }
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
          {error && <p className="error">{error}</p>}

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
