import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [favouritesCount, setFavouritesCount] = useState(0)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Load and sync favourites count from localStorage
  useEffect(() => {
    const updateFavouritesCount = () => {
      const saved = localStorage.getItem('favourites')
      const favourites = saved ? JSON.parse(saved) : []
      setFavouritesCount(favourites.length)
    }

    // Initial load
    updateFavouritesCount()

    // Listen for storage changes
    window.addEventListener('storage', updateFavouritesCount)
    
    // Poll for changes (for same-tab updates)
    const interval = setInterval(updateFavouritesCount, 500)

    return () => {
      window.removeEventListener('storage', updateFavouritesCount)
      clearInterval(interval)
    }
  }, [])

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
      }, 1000)
    }

    // Show navbar on scroll or mouse movement
    window.addEventListener('scroll', showNavbar)
    window.addEventListener('mousemove', showNavbar)

    // Initial timeout to hide navbar
    timeoutId = setTimeout(() => {
      if (!isOpen) {
        setIsVisible(false)
      }
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', showNavbar)
      window.removeEventListener('mousemove', showNavbar)
    }
  }, [isOpen])

  return (
    <>
      {/* Fixed Header with Logo and Favorites */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 120px 0px 50px',
          zIndex: 1001,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none'
        }}
      >
        {/* Logo and Title - Left side */}
        <div 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              marginLeft: '50px'
            }}
          >
            <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>YN</span>
          </div>
        </div>

        {/* Favorites Button - Right side */}
        <button
          onClick={() => navigate('/favorites')}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#1a1a2e',
            gap: '8px',
            border: 'none',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            color: 'white',
            pointerEvents: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
          }}
        >
          <FavoriteIcon style={{ fontSize: '20px', color: '#ffff' }} />
          <span>Favorites</span>
        </button>
      </div>

      {/* Floating Navigation Menu */}
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
    </>
  )
}

export default NavigationBar
