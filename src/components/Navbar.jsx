import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

// styles
import './Navbar.css'
import BackBtn from '../icons/back-btn.svg'

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;

  const { user } = useAuthContext()
  const { logout } = useLogout()

  return (
    <header className="Navbar">
      <div className="sm-container nav-container">
        {pathname !== '/' ?
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
          :
          <span className="welcome-message">
            {user && `Welcome, ${user.displayName}`}
          </span>
        }

        <ul>
          {pathname === '/' && (
              <>
                <li>
                  {user ?
                  <Link onClick={logout}>
                    Log out
                  </Link> 
                  :
                  <Link to='/login'>
                    Login
                  </Link>
                  }
                </li>
              </>
            )
          }
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
