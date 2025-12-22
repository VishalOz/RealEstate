import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    let timeoutId

    const showNavbar = () => {
      setIsVisible(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // Only hide if the menu is not open
        if (!isOpen) {
          setIsVisible(false)
        }
      }, 2000)
    }

    // Show navbar on scroll or mouse movement
    window.addEventListener('scroll', showNavbar)
    window.addEventListener('mousemove', showNavbar)

    // Initial timeout to hide navbar
    timeoutId = setTimeout(() => {
      if (!isOpen) {
        setIsVisible(false)
      }
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', showNavbar)
      window.removeEventListener('mousemove', showNavbar)
    }
  }, [isOpen])

  return (
    <nav className={`floating-navbar ${isOpen ? 'open' : ''} ${!isVisible ? 'hidden' : ''}`}>
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
