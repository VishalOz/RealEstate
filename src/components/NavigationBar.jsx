import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <nav className="floating-navbar">
      <ul className="nav-list">
        <li>
            <NavLink to="/" end>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/about">About us</NavLink>
        </li>
        <li>
            <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
