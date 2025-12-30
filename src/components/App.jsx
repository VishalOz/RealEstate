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
      {/* Hero Section */}
      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginBottom: '120px', minHeight: '400px'}}>
        <img 
          src={Home1} 
          alt="Hero" 
          style={{
            borderRadius: '60px', 
            width: '100%', 
            height: '700px',
            maxHeight: '900px',
            objectFit: 'cover',
            marginTop: '5px'
          }}
        />
        <div style={{
          position: 'absolute', 
          bottom: '20px', 
          left: '20px',
          right: '20px',
          padding: '20px'
        }}>
          <p className="text-white mb-2 fs-6 fw-light" style={{fontFamily: '"Inter", sans-serif'}}>
            Modern Luxury Residence
          </p>
          <h1 
            className={`text-white fw-light`} 
            style={{
              fontFamily: '"Roboto", sans-serif', 
              fontSize: 'clamp(24px, 5vw, 55px)'
            }}
          >
            Crafted for Modern Living
          </h1>
          <p 
            className={`text-white mb-3 fw-light`} 
            style={{
              maxWidth: '500px', 
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(14px, 2vw, 20px)'
            }}
          >
            Modern architecture, prestigious settings, timeless design.
          </p>
          <button
            onClick={() => navigate('/search')}
            className={`bg-white px-4 py-2 fw-light small border-0`}
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

      {/* Features Section  */}
      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginTop: '50px', marginBottom: '50px'}}>
        <div className={`row p-3 g-4 w-100`}>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12`}>
            <div className={`p-3 border-0`} style={{borderRadius: '60px'}}>
              <LocationOnOutlinedIcon fontSize="medium" />
              <h4 className={`mt-3`}>Top Locations</h4>
              <p className={``}>Properties in prime areas with key amenities.</p>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12`}>
            <div className={`p-3 border-0`} style={{borderRadius: '60px'}}>
              <ApartmentOutlinedIcon fontSize="medium" />
              <h4 className={`mt-3`}>Elite Estates</h4>
              <p className={``}>Upscale properties with luxury designs.</p>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12`}>
            <div className={`p-3 border-0`} style={{borderRadius: '60px'}}>
              <HomeWorkOutlinedIcon fontSize="medium" />
              <h4 className={`mt-3`}>Budget Homes</h4>
              <p className={``}>Affordable options for families and individuals.</p>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12`}>
            <div className={`p-3 border-0`} style={{borderRadius: '60px'}}>
              <LocalOfferOutlinedIcon fontSize="medium" />
              <h4 className={`mt-3`}>Best Deals</h4>
              <p className={``}>Competitive pricing on quality properties.</p>
            </div>  
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className={`col mb-4 px-3`}>
        <div className={`container d-flex justify-content-center h-100 align-items-center border-0`} style={{
          borderRadius: '50px', 
          backgroundColor: '#ffff', 
          maxWidth: '180px', 
          margin: '0 auto',
          padding: '8px 16px'
        }}>
          <p className="mb-0" style={{fontSize: 'clamp(12px, 2vw, 16px)'}}>Premium Estates</p>
        </div>
        <h2 className={`text-center mt-3`} style={{fontSize: 'clamp(24px, 4vw, 36px)'}}>Discover homes designed to inspire.</h2>
        <p className={`text-center px-3`} style={{fontSize: 'clamp(14px, 2vw, 16px)'}}>Luxury residences where design meets comfort</p>
      </div>

      {/* Property Images Grid */}
      <div className={`container d-flex justify-content-center`} style={{position: 'relative', marginTop: '30px', marginBottom: '50px'}}>
        <div className={`row p-3 g-3 w-100`}>
          <div className={`col-md-6 col-12`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              <img src={ho3} alt="Property" className={`img-fluid`} style={{borderRadius: '20px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-12`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
             <img src={ho1} alt="Property" className={`img-fluid`} style={{borderRadius: '20px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-12`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
              <img src={ho4} alt="Property" className={`img-fluid`} style={{borderRadius: '20px'}}/>
            </div>
          </div>
          <div className={`col-md-6 col-12`}>
            <div className={`card shadow-md border-0`} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '20px'}}>
              <img src={ho5} alt="Property" className={`img-fluid`} style={{borderRadius: '20px'}}/>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={`col mb-5 px-3`}>
        <h2 className={`text-center`} style={{fontSize: 'clamp(24px, 4vw, 36px)'}}>The art of exceptional living.</h2>
        <p className={`container text-center px-3`} style={{fontSize: 'clamp(14px, 2vw, 16px)', maxWidth: '900px'}}>
          At YourNiwahana, every home is a masterpiece thoughtfully crafted with precision, purpose, and passion. Each residence is defined
          by timeless elegance, intelligent design, and refined details that seamlessly blend aesthetics with everyday comfort. From open, 
          light-filled spaces to carefully curated finishes, every element is designed to enhance the way you live and feel within your home. 
          At YourNiwahana, luxury goes beyond appearance it is a way of life, offering a harmonious balance of sophistication, warmth, and 
          lasting value for those who seek more than just a home.
        </p>
      </div>

      {/* Newsletter Subscribe Section */}
      <div className={`subscribe-section d-flex align-items-center justify-content-center`}
        style={{
          backgroundImage: `url(${Home1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          position: 'relative',
          borderRadius: '20px',
          margin: '40px 20px 50px 20px'
        }}
      >
        <div style={{
          position: 'absolute', 
          inset: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: '20px'
        }}></div>
        
        <div style={{
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center', 
          maxWidth: '600px', 
          padding: '40px 20px',
          width: '100%'
        }}>
          <h2 
            className={`text-white fw-light mb-3`} 
            style={{
              fontSize: 'clamp(24px, 5vw, 42px)', 
              fontFamily: '"Roboto", sans-serif'
            }}
          >
            Where your vision becomes home.
          </h2>
          <p 
            className={`text-white mb-4 fw-light`} 
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(14px, 2vw, 20px)'
            }}
          >
            Subscribe to our newsletter and get notified about the latest premium properties and exclusive deals
          </p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            if (email) {
              alert(`Thank you for subscribing with ${email}!`);
              e.target.reset();
            }
          }} style={{
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px', 
            marginTop: '30px',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              style={{
                flex: '1 1 250px',
                minWidth: '200px',
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap'
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
