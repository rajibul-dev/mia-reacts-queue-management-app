import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

// styles
import "./Navbar.css";

// icons
import BackBtn from "../icons/back-btn.svg";
import DropDown from "../icons/drop-down.svg";

// logo
import Logo from "../assets/logo.svg";

export default function Navbar({ onRoot = false }) {
  const location = useLocation();
  const { pathname } = location;

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history("/login");
  };

  return (
    <header className={`Navbar${onRoot ? " navroot" : ""}`}>
      <div className="sm-container nav-container">
        {pathname !== "/" ? (
          <Link to="/">
            <button>
              <img
                className="back-icon-svg"
                src={BackBtn}
                alt="left arrow / back button"
              />
              <img
                src={Logo}
                alt="Mia twitch softwares logo"
                className="logo logo-other-pages"
              />
            </button>
          </Link>
        ) : (
          <img src={Logo} alt="Mia twitch softwares logo" className="logo" />
        )}

        <ul>
          {pathname === "/" && (
            <>
              <li className="account-options">
                <span className="welcome-message">
                  Welcome, {user.displayName}
                </span>
                <img
                  src={DropDown}
                  alt="dropdown icon"
                  className="profile-dropdown"
                />
              </li>
            </>
          )}
          {pathname === "/viewer" && (
            <>
              <li>
                <Link
                  className="nav-link"
                  to="/verify"
                  state={{ route: "/manage-queue", cancelRoute: "/viewer" }}
                >
                  Manage queue
                </Link>
              </li>
            </>
          )}
          {pathname === "/manage-queue" && (
            <>
              <li>
                <Link className="nav-link" to="/viewer">
                  Go to view mode
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
