import React from 'react'
import { Link } from 'react-router-dom';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const About = () => {
  return (
    <div className={`container p-3 my-3 bg-light rounded-3`}>
        <h1 className={`text-center mt-5`}>About Your Niwahana</h1>
        <div className={`d-flex justify-content-center`}>
            <p> 
                Here is a refined paragraph version perfect for a website hero section or promotional material
                Welcome to your premier real estate partner, where finding your dream home becomes a seamless 
                and confident journey. We are dedicated to transforming the entire process whether you're buying, 
                selling, or renting into an effortless and enjoyable experience. With intuitive tools, curated listings, a
                nd expert guidance, we provide clarity and support at every step. Our mission is to empower you with 
                trusted information and innovative technology, turning your real estate aspirations into reality. Discover 
                a new standard of service and start your search today.
            </p>
        </div>
        <div className={`d-flex justify-content-center mt-5`}>
            <HandshakeIcon style={{ fontSize: 70 }} />
        </div>
        <h1 className={`text-center`}>Our Mission</h1>
        <p>
            Our purpose is to help individuals and families discover their perfect homes by making the entire real estate 
            journey simple, efficient, and genuinely enjoyable. We achieve this by combining cutting edge technology with 
            personalized support, guiding our clients through every step from the initial search to the final transaction. 
            By streamlining processes, providing transparent information, and offering expert guidance, we transform what can 
            be a complex experience into a smooth and rewarding path toward finding a place you can truly call home.
        </p>
        <h1 className={`text-center mt-5`}>Our Values</h1>
        <div className={`d-flex justify-content-center`}>
            <div className={`row p-3 g-4`}>

                <div className={`col-md-4 col-sm-4`}>
                    <div className={`p-3 shadow-md border-0 text-center border-bottom`} style={{borderRadius: '20px'}}>
                        <ShieldIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>Trust</h3>
                        <p className={``}>Building lasting relationships transparency and integrity.</p>
                    </div>
                </div>

                <div className={`col-md-4 col-sm-4`}>
                    <div className={`p-3 shadow-md border-0 text-center border-bottom`} style={{borderRadius: '20px'}}>
                        <VerifiedIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>Excellences</h3>
                        <p className={``}>Committed to providing exceptional services and results.</p>
                    </div>
                </div>

                <div className={`col-md-4 col-sm-4`}>
                    <div className={`p-3 shadow-md border-0 text-center border-bottom`} style={{borderRadius: '20px'}}>
                        <ShowChartIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>Innovation</h3>
                        <p className={``}>Embracing technology to enhance the real estate experience.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={`row p-3 g-4`}>

                <div className={`col-md-3 col-sm-3`}>
                    <div className={`p-3 shadow-md border-0 text-center`} style={{borderRadius: '20px'}}>
                        <HomeIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>1000+ </h3>
                        <p className={``}>Properties Sold</p>
                    </div>
                </div>

                <div className={`col-md-3 col-sm-3`}>
                    <div className={`p-3 shadow-md border-0 text-center`} style={{borderRadius: '20px'}}>
                        <GroupsIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>500+</h3>
                        <p className={``}>Happy Clients</p>
                    </div>
                </div>

                <div className={`col-md-3 col-sm-3`}>
                    <div className={`p-3 shadow-md border-0 text-center`} style={{borderRadius: '20px'}}>
                        <StarIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>4.9/5</h3>
                        <p className={``}>Average Rating</p>
                    </div>
                </div>

                <div className={`col-md-3 col-sm-3`}>
                    <div className={`p-3 shadow-md border-0 text-center`} style={{borderRadius: '20px'}}>
                        <AccessTimeIcon className={`text-center`} style={{ fontSize: 70 }} />
                        <h3 className={``}>10 Years</h3>
                        <p className={``}>Experience.</p>
                    </div>
                </div>
            </div>

        {/* Start Searching CTA Section */}
        <div 
          className="text-center p-5 mt-5" 
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)',
            borderRadius: '25px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="text-white mb-3" style={{ fontWeight: 600, fontSize: '2rem' }}>
              Ready to Find Your Dream Home?
            </h2>
            <p className="mb-4" style={{ color: '#a0a0a0', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              Explore our extensive collection of properties and discover the perfect place to call home.
            </p>
            <Link 
              to="/search" 
              className="btn btn-lg px-5 py-3"
              style={{
                background: '#1a1a2e',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
            >
              Start Searching
            </Link>
          </div>
        </div>
    </div>
  )
}

export default About
