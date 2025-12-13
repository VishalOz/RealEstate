import React from 'react'
import { useNavigate } from 'react-router-dom'

import Footer from './Footer.jsx'


import Home2 from '../assets/Hero.png'

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'



const App = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate('/search')}
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

      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginTop: '50px', marginBottom: '50px', fontFamily: '"Inter", sans-serif'}}>
        <div className={`row p-3 g-4`}>
          <div className={`col-md-3 col-sm-6 radius`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <LocationOnOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Top Locations</h4>
              <p className={`text-black-50`}>Properties in prime areas with key amenities.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <ApartmentOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Elite Estates</h4>
              <p className={`text-black-50`}>Upscale properties with luxury designs.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <HomeWorkOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Budget Homes</h4>
              <p className={`text-black-50`}>Affordable options for families and individuals.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <LocalOfferOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Best Deals</h4>
              <p className={`text-black-50`}>Competitive pricing on quality properties.</p>
            </div>  
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
