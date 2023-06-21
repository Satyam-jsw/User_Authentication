import React from 'react'
import { NavLink, Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              ALEX
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link" aria-current="page">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link" aria-current="page">
                  Contact
                </NavLink>
              </li>

              <li className="nav-item ">
                <NavLink to="/login" className="nav-link" >
                  login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" >
                  Registration
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to="/logout" className="nav-link"> Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>



    </>
  )
}

export default Navbar