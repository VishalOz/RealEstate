import React from 'react'
import { useNavigate } from 'react-router-dom'


import Home1 from '/images/Hero.png'
import ho1 from '/images/ho1.jpg'
import ho3 from '/images/ho3.jpg'
import ho4 from '/images/ho4.jpg'
import ho5 from '/images/ho5.jpg'
import ho2 from '/images/ho2.jpg'
import light from '/images/light.png'


import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'

import Button from '@mui/material/Button'


const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={`container d-flex justify-content-center min-vh-100`} style={{position: 'relative', marginBottom: '100px'}}>
        <img src={Home1} style={{borderRadius:'50px', width:'80rem', height:'47rem', marginTop:'5px'}}/>
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

      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginTop: '50px', marginBottom: '100px'}}>
        <div className={`row p-3 g-4`}>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <LocationOnOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Top Locations</h4>
              <p className={``}>Properties in prime areas with key amenities.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <ApartmentOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Elite Estates</h4>
              <p className={``}>Upscale properties with luxury designs.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <HomeWorkOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Budget Homes</h4>
              <p className={``}>Affordable options for families and individuals.</p>
            </div>
          </div>
          <div className={`col-md-3 col-sm-6`}>
            <div className={`card p-3 shadow-md border-0`} style={{borderRadius: '20px'}}>
              <LocalOfferOutlinedIcon fontSize="medium" />
              <h4 className={`mt-5`}>Best Deals</h4>
              <p className={``}>Competitive pricing on quality properties.</p>
            </div>  
          </div>
        </div>
      </div>
      <div className={`col mb-5`}>
            <div className={`container d-flex justify-content-center h-100 align-items-center border-0`} style={{borderRadius: '50px', backgroundColor: '#ffff', maxWidth: '150px', 
              margin: '0 auto'}}>
              <p>Premium Estates</p>
            </div>
            <h2 className={`text-center fontSize`}>Discover homes designed to inspire.</h2>
            <p className={`text-center`}>Luxury residences where design meets comfort</p>
      </div>

      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginTop: '50px', marginBottom: '100px'}}>
        <div className={`row p-3 g-4`}>
          <div className={`col-md-6 col-sm-6`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              <img src={ho3} alt="" className={``} style={{borderRadius: '50px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-sm-6`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
             <img src={ho1} alt="" className={``} style={{borderRadius: '50px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-sm-6`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              <img src={ho4} alt="" className={``} style={{borderRadius: '50px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-sm-6`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '50px'}}>
              <img src={ho5} alt="" className={``} style={{borderRadius: '50px'}}/>
            </div>
          </div>
        </div>
      </div>

      <div className={`col mb-5`}>
            <div className={`container d-flex justify-content-center h-100 align-items-center border-0`} style={{borderRadius: '50px', backgroundColor: '#ffff', maxWidth: '150px', 
              margin: '0 auto'}}>
            </div>
            <h2 className={`text-center fontSize`}>The art of exceptional living.</h2>
            <p className={`container text-center`}>
            At YourNiwahana, every home is a masterpiece thoughtfully crafted with precision, purpose, and passion. Each residence is defined
            by timeless elegance, intelligent design, and refined details that seamlessly blend aesthetics with everyday comfort. From open, 
            light-filled spaces to carefully curated finishes, every element is designed to enhance the way you live and feel within your home. 
            At YourNiwahana, luxury goes beyond appearance it is a way of life, offering a harmonious balance of sophistication, warmth, and 
            lasting value for those who seek more than just a home.
            </p>
      </div>


      <div className={`subscribe-section d-flex align-items-center justify-content-center`}
        style={{
          backgroundImage: `url(${Home1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          position: 'relative',
          marginBottom: '100px',
          borderRadius: '30px',
          margin: '80px 40px 100px 40px'
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '30px'}}></div>
        
        <div style={{position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '600px', padding: '40px 30px'}}>
          <h2 className={`text-white fw-light mb-3`} style={{fontSize: '42px', fontFamily: '"Roboto", sans-serif'}}>
          Where your vision becomes home.
          </h2>
          <p className={`text-white mb-4 fs-5 fw-light`} style={{fontFamily: '"Inter", sans-serif'}}>
            Subscribe to our newsletter and get notified about the latest premium properties and exclusive deals
          </p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            if (email) {
              alert(`Thank you for subscribing with ${email}!`);
              e.target.reset();
            }
          }} style={{display: 'flex', gap: '10px', marginTop: '30px'}}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '999px',
                fontSize: '14px',
                fontFamily: '"Inter", sans-serif',
                outline: 'none'
              }}
            />
            <Button
              type="submit"
              style={{
                padding: '12px 30px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
