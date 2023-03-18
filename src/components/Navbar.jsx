import React from "react"
import { Link, useLocation } from "react-router-dom"

// styles
import './Navbar.css'
import BackBtn from '../icons/back-btn.svg'

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header className="Navbar">
      <div className="sm-container nav-container">
        <Link to='/'>
          <button>
            <img
              className="back-icon-svg"
              src={BackBtn}
              alt="left arrow / back button"
            />
            <span></span>
          </button>
        </Link>

        <ul>
          {pathname === '/viewer' && (
              <>
                <li>
                  <Link to='/verify' state= {{ route: '/manage-queue', cancelRoute: '/viewer' }}>
                    Manage queue
                  </Link> 
                </li>
              </>
            )
          }
          {pathname === '/manage-queue' && (
              <>
                <li>
                  <Link to='/viewer'>
                    Go to view mode
                  </Link> 
                </li>
              </>
            )
          }
        </ul>
      </div>
    </header>
  )
}
