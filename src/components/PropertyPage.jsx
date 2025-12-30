import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import data from '../data/properties.json'

const PropertyPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Find the property from the data based on the ID
  const propertyData = data.properties.find(prop => prop.id === id)
  
  if (!propertyData) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: 'clamp(40px, 10vw, 60px) 20px' 
      }}>
        <h2 style={{ 
          color: '#1a1a1a',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          marginBottom: '15px'
        }}>
          Property Not Found
        </h2>
        <p style={{ 
          color: '#666',
          fontSize: 'clamp(14px, 2vw, 16px)',
          marginBottom: '25px'
        }}>
          The property you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/search')}
          style={{
            padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: 'clamp(13px, 2vw, 14px)'
          }}
        >
          Back to Search
        </button>
      </div>
    )
  }

  const bannerImage = propertyData.picture
  const gallery = propertyData.gallery || []
  const galleryDisplay = gallery.slice(0, 6)

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: galleryDisplay.length > 3,
    speed: 500,
    slidesToShow: Math.min(4, galleryDisplay.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, galleryDisplay.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, galleryDisplay.length),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  // Handle image click to open lightbox
  const openLightbox = (image, index) => {
    setSelectedGalleryImage(image)
    setCurrentImageIndex(index)
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedGalleryImage(null)
  }

  // Navigate to previous image
  const prevImage = (e) => {
    e.stopPropagation()
    const newIndex = currentImageIndex === 0 ? galleryDisplay.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
    setSelectedGalleryImage(galleryDisplay[newIndex])
  }

  // Navigate to next image
  const nextImage = (e) => {
    e.stopPropagation()
    const newIndex = currentImageIndex === galleryDisplay.length - 1 ? 0 : currentImageIndex + 1
    setCurrentImageIndex(newIndex)
    setSelectedGalleryImage(galleryDisplay[newIndex])
  }

  return (
    <div className={`container`} style={{ width: '100%', padding: '0'}}>
      {/* Lightbox Modal */}
      {selectedGalleryImage && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            padding: '10px'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: 'clamp(10px, 2vw, 20px)',
              right: 'clamp(10px, 2vw, 20px)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(40px, 8vw, 50px)',
              height: 'clamp(40px, 8vw, 50px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <CloseIcon style={{ color: 'white', fontSize: 'clamp(20px, 4vw, 28px)' }} />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: 'clamp(5px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(40px, 8vw, 50px)',
              height: 'clamp(40px, 8vw, 50px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <ArrowBackIosNewIcon style={{ color: 'white', fontSize: 'clamp(18px, 3vw, 24px)' }} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: 'clamp(5px, 2vw, 20px)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(40px, 8vw, 50px)',
              height: 'clamp(40px, 8vw, 50px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s ease',
              zIndex: 10000
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <ArrowForwardIosIcon style={{ color: 'white', fontSize: 'clamp(18px, 3vw, 24px)' }} />
          </button>

          {/* Large Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95%',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img
              src={selectedGalleryImage}
              alt="Gallery preview"
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 'clamp(8px, 2vw, 15px)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            />
            <p style={{ 
              color: 'white', 
              marginTop: '10px', 
              fontSize: 'clamp(12px, 2vw, 14px)' 
            }}>
              {currentImageIndex + 1} / {galleryDisplay.length}
            </p>
          </div>
        </div>
      )}

      {/* Full Width Banner Image */}
      <div style={{ 
        width: '100%', 
        height: 'clamp(250px, 50vw, 500px)', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        <img
          src={bannerImage}
          alt="Property banner"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0 0 clamp(15px, 4vw, 30px) clamp(15px, 4vw, 30px)',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Main Content Div Starting from Middle of Banner */}
      <div
        style={{
          width: '100%',
          marginTop: 'clamp(-80px, -15vw, -200px)',
          position: 'relative',
          zIndex: 1,
          paddingBottom: 'clamp(30px, 6vw, 60px)',
          padding: '0 clamp(10px, 2vw, 15px)'
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: 'white',
            borderRadius: 'clamp(20px, 4vw, 30px)',
            padding: 'clamp(20px, 4vw, 40px)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Back Button and Location - Top Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              flexWrap: 'wrap',
              gap: '15px'
            }}
          >
            <button
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'clamp(14px, 2vw, 16px)',
                color: '#333',
                padding: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
            >
              <ArrowBackIcon style={{ fontSize: 'clamp(20px, 3vw, 24px)' }} />
              
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                color: '#666'
              }}
            >
              <LocationOnOutlinedIcon style={{ fontSize: 'clamp(16px, 3vw, 20px)' }} />
              <span>{propertyData.location}</span>
            </div>
          </div>

          {/* Property Name and Price Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(15px, 3vw, 20px)',
              gap: 'clamp(15px, 4vw, 40px)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h1
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
                  fontWeight: '600',
                  margin: '0 0 clamp(10px, 2vw, 15px) 0',
                  color: '#1a1a1a',
                  fontFamily: '"Inter", sans-serif',
                  lineHeight: '1.2'
                }}
              >
                {propertyData.name}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(14px, 2vw, 16px)',
                  color: '#666',
                  margin: '0',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                {propertyData.bedrooms} Bedroom {propertyData.type}
              </p>
            </div>

            <div
              style={{
                textAlign: 'right',
                minWidth: 'fit-content'
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  color: '#999',
                  margin: '0 0 5px 0',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                Price
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  fontWeight: '700',
                  margin: '0',
                  color: '#1a1a1a',
                  fontFamily: '"Inter", sans-serif',
                  whiteSpace: 'nowrap'
                }}
              >
                {propertyData.currency} {propertyData.price.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* Gallery Grid - 6 Images */}
          {galleryDisplay.length > 0 && (
            <div
              style={{
                marginBottom: 'clamp(20px, 4vw, 40px)'
              }}
            >
              <Slider {...carouselSettings}>
                {galleryDisplay.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      borderRadius: 'clamp(10px, 2vw, 15px)',
                      overflow: 'hidden',
                      height: 'clamp(120px, 25vw, 180px)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                      padding: '0 5px'
                    }}
                    onClick={() => openLightbox(image, index)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.05)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        borderRadius: 'clamp(8px, 2vw, 12px)'
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}

          {/* Tabs Section */}
          <div style={{ marginTop: 'clamp(20px, 4vw, 40px)' }}>
            <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
              <TabList
                style={{
                  borderBottom: '2px solid #e0e0e0',
                  display: 'flex',
                  gap: 'clamp(15px, 4vw, 40px)',
                  padding: '0 0 15px 0',
                  margin: '0',
                  listStyle: 'none',
                  overflowX: 'auto',
                  flexWrap: 'nowrap'
                }}
              >
                <Tab
                  style={{
                    padding: 'clamp(8px, 2vw, 10px) 0',
                    cursor: 'pointer',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 0 ? '600' : '400',
                    color: selectedTabIndex === 0 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 0 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  Description
                </Tab>
                <Tab
                  style={{
                    padding: 'clamp(8px, 2vw, 10px) 0',
                    cursor: 'pointer',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 1 ? '600' : '400',
                    color: selectedTabIndex === 1 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 1 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  Floor Plan
                </Tab>
                <Tab
                  style={{
                    padding: 'clamp(8px, 2vw, 10px) 0',
                    cursor: 'pointer',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 2 ? '600' : '400',
                    color: selectedTabIndex === 2 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 2 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    minWidth: 'fit-content'
                  }}
                >
                  Google Maps
                </Tab>
              </TabList>

              <TabPanel>
                <div
                  style={{
                    padding: 'clamp(20px, 4vw, 30px) 0',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    lineHeight: '1.8',
                    color: '#666',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  <h3 style={{ 
                    color: '#1a1a1a', 
                    marginTop: '0',
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    marginBottom: 'clamp(10px, 2vw, 15px)'
                  }}>
                    About this property
                  </h3>
                  <p style={{ marginBottom: 'clamp(20px, 4vw, 30px)' }}>
                    {propertyData.description}
                  </p>
                  
                  <div style={{ 
                    marginTop: 'clamp(20px, 4vw, 30px)', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: 'clamp(20px, 4vw, 30px)' 
                  }}>
                    <div>
                      <h4 style={{ 
                        color: '#1a1a1a', 
                        marginBottom: 'clamp(10px, 2vw, 15px)',
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                      }}>
                        Property Details
                      </h4>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        <li style={{ marginBottom: '8px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          <strong>Type:</strong> {propertyData.type}
                        </li>
                        <li style={{ marginBottom: '8px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          <strong>Bedrooms:</strong> {propertyData.bedrooms}
                        </li>
                        <li style={{ marginBottom: '8px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          <strong>Tenure:</strong> {propertyData.tenure}
                        </li>
                        <li style={{ marginBottom: '8px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
                          <strong>Location:</strong> {propertyData.location}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div
                  style={{
                    padding: 'clamp(20px, 4vw, 30px) 0',
                    textAlign: 'center',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {propertyData.floorPlan ? (
                    <div>
                      <img
                        src={propertyData.floorPlan}
                        alt="Floor Plan"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: 'clamp(10px, 2vw, 15px)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </div>
                  ) : (
                    <p style={{ 
                      fontSize: 'clamp(14px, 2vw, 16px)', 
                      color: '#999',
                      padding: 'clamp(20px, 4vw, 30px)'
                    }}>
                      Floor plan not available
                    </p>
                  )}
                </div>
              </TabPanel>

              <TabPanel>
                <div
                  style={{
                    padding: 'clamp(20px, 4vw, 30px) 0',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {propertyData.coordinates ? (
                    <div>
                      <iframe
                        width="100%"
                        height={window.innerWidth < 768 ? "300" : "500"}
                        style={{ 
                          border: 'none', 
                          borderRadius: 'clamp(10px, 2vw, 15px)' 
                        }}
                        src={`https://maps.google.com/maps?q=${propertyData.coordinates.lat},${propertyData.coordinates.lng}&z=15&output=embed`}
                        title="Property Location"
                        loading="lazy"
                      ></iframe>
                      <p style={{ 
                        marginTop: '15px', 
                        fontSize: 'clamp(13px, 2vw, 14px)', 
                        color: '#666' 
                      }}>
                        <a 
                          href={`https://maps.google.com/maps?q=${propertyData.coordinates.lat},${propertyData.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: '#1a1a1a', 
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}
                        >
                          Open in Google Maps →
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: 'clamp(20px, 4vw, 30px)',
                        textAlign: 'center',
                        color: '#999',
                        fontSize: 'clamp(14px, 2vw, 16px)'
                      }}
                    >
                      <p>Location map coming soon...</p>
                    </div>
                  )}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage
