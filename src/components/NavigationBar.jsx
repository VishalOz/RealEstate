import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className={`floating-navbar ${isOpen ? 'open' : ''}`}>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isOpen ? 'open' : ''}`}></span>
      </button>
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        <li>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search" onClick={closeMenu}>Search</NavLink>
        </li>
        <li>
            <NavLink to="/about" onClick={closeMenu}>About us</NavLink>
        </li>
        <li>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
