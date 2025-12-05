import React from 'react'


import Home2 from './assets/Hero.png'

const App = () => {
  return (
    <div>
      <div className={`container d-flex justify-content-center min-vh-100`} style={{position: 'relative'}}>
        <img src={Home2} style={{borderRadius:'50px', width:'80rem', height:'45rem', marginTop:'30px'}}/>
        <div style={{position: 'absolute', bottom: '140px', left: '70px'}}>
          <p className="text-white mb-2 mx-2 fs-6 fw-light" style={{maxWidth: '500px', fontFamily: '"Inter", sans-serif'}}>
            Modern Luxury Residence
          </p>
          <h1 className={`text-white fw-light`} style={{fontFamily: '"Roboto", sans-serif', fontSize:'55px'}}>Crafted for Modern Living</h1>
          <p className={`text-white fs-5 mb-2 fw-light`} style={{maxWidth: '500px', fontFamily: '"Inter", sans-serif'}}>
            Modern architecture, prestigious settings, timeless design.
          </p>
          <button
            className={`bg-white px-4 py-2 fw-light small border-0 mx-2`}
            style={{
              fontFamily: '"Inter", sans-serif',
              borderRadius: '999px',   
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Get Started
          </button>

        </div>
      </div>
    </div>
  )
}

export default App
