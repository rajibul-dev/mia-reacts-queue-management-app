import React, { useState, useRef, useEffect } from "react";

// style
import "./AccountOptions.css";

// icons
import DropDownIcon from "../../icons/drop-down.svg";
import ProfileIcon from "../../icons/profile.svg"
import LogoutIcon from "../../icons/logout.svg"

export default function AccountOptions({ user, logoutFunction }) {
  const [isMenuOptionsVisible, setIsMenuOptionsVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigationClick = () => {
    setIsMenuOptionsVisible(!isMenuOptionsVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".acc-opt-flex")
      ) {
        setIsMenuOptionsVisible(false);
      }
    };
    

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <li className="account-options">
      <div className="acc-opt-flex" onClick={handleNavigationClick}>
        <p className="welcome-message">Welcome, {user.displayName}</p>
        <img src={DropDownIcon} alt="dropdown icon" className="profile-dropdown" />
      </div>

      {isMenuOptionsVisible && (
        <div className="menuOptions" ref={dropdownRef}>
          <ul>
            <li>
              <img className="profile-icon" src={ProfileIcon} alt="profile icon, person icon" />
              <span>Profile</span>
            </li>
          </ul>
          <div onClick={logoutFunction} className="logout">
            <span>Logout</span>
            <img className="logout-icon" src={LogoutIcon} alt="" />
          </div>
        </div>
      )}
    </li>
  );
}
