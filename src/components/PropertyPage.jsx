import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import data from '../data/properties.json'

const PropertyPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null)
  
  // Find the property from the data based on the ID
  const propertyData = data.properties.find(prop => prop.id === id)
  
  if (!propertyData) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: '#1a1a1a' }}>Property Not Found</h2>
        <p style={{ color: '#666' }}>The property you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/search')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px'
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

  return (
    <div style={{ width: '100%' }}>
      {/* Full Width Banner Image */}
      <div style={{ width: '100%', height: '500px', position: 'relative', overflow: 'hidden' }}>
        <img
          src={bannerImage}
          alt="Property banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Main Content Div Starting from Middle of Banner */}
      <div
        style={{
          width: '100%',
          marginTop: '-200px',
          position: 'relative',
          zIndex: 1,
          paddingBottom: '60px'
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: 'white',
            borderRadius: '30px',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            maxWidth: '1200px'
          }}
        >
          {/* Back Button and Location - Top Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
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
                fontSize: '16px',
                color: '#333',
                padding: '0',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#333')}
            >
              <ArrowBackIcon style={{ fontSize: '24px' }} />
              
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#666'
              }}
            >
              <LocationOnOutlinedIcon style={{ fontSize: '20px' }} />
              <span>{propertyData.location}</span>
            </div>
          </div>

          {/* Property Name and Price Section */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              gap: '40px'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '36px',
                  fontWeight: '600',
                  margin: '0 0 15px 0',
                  color: '#1a1a1a',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                {propertyData.name}
              </h1>
              <p
                style={{
                  fontSize: '16px',
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
                textAlign: 'right'
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#999',
                  margin: '0 0 5px 0',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                Price
              </p>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0',
                  color: '#1a1a1a',
                  fontFamily: '"Inter", sans-serif'
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
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '15px',
                marginBottom: '40px'
              }}
            >
              {galleryDisplay.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    height: '180px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onClick={() => setSelectedGalleryImage(image)}
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
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Tabs Section */}
          <div style={{ marginTop: '40px' }}>
            <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)}>
              <TabList
                style={{
                  borderBottom: '2px solid #e0e0e0',
                  display: 'flex',
                  gap: '40px',
                  padding: '0 0 15px 0',
                  margin: '0',
                  listStyle: 'none'
                }}
              >
                <Tab
                  style={{
                    padding: '10px 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 0 ? '600' : '400',
                    color: selectedTabIndex === 0 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 0 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Description
                </Tab>
                <Tab
                  style={{
                    padding: '10px 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 1 ? '600' : '400',
                    color: selectedTabIndex === 1 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 1 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Floor Plan
                </Tab>
                <Tab
                  style={{
                    padding: '10px 0',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: selectedTabIndex === 2 ? '600' : '400',
                    color: selectedTabIndex === 2 ? '#1a1a1a' : '#999',
                    border: 'none',
                    borderBottom: selectedTabIndex === 2 ? '3px solid #1a1a1a' : 'none',
                    background: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Google Maps
                </Tab>
              </TabList>

              <TabPanel>
                <div
                  style={{
                    padding: '30px 0',
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#666',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  <h3 style={{ color: '#1a1a1a', marginTop: '0' }}>About this property</h3>
                  <p>{propertyData.description}</p>
                  
                  <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                    <div>
                      <h4 style={{ color: '#1a1a1a', marginBottom: '10px' }}>Property Details</h4>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        <li style={{ marginBottom: '8px' }}>
                          <strong>Type:</strong> {propertyData.type}
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          <strong>Bedrooms:</strong> {propertyData.bedrooms}
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          <strong>Tenure:</strong> {propertyData.tenure}
                        </li>
                        <li style={{ marginBottom: '8px' }}>
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
                    padding: '30px 0',
                    textAlign: 'center',
                    color: '#999',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  <p style={{ fontSize: '16px' }}>Floor plan coming soon...</p>
                </div>
              </TabPanel>

              <TabPanel>
                <div
                  style={{
                    padding: '30px 0',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {propertyData.coordinates ? (
                    <div>
                      <iframe
                        width="100%"
                        height="500"
                        style={{ border: 'none', borderRadius: '15px' }}
                        src={`https://maps.google.com/maps?q=${propertyData.coordinates.lat},${propertyData.coordinates.lng}&z=15&output=embed`}
                        title="Property Location"
                        loading="lazy"
                      ></iframe>
                      <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
                        <a 
                          href={`https://maps.google.com/maps?q=${propertyData.coordinates.lat},${propertyData.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#1a1a1a', textDecoration: 'none' }}
                        >
                          Open in Google Maps
                        </a>
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '30px',
                        textAlign: 'center',
                        color: '#999',
                        fontSize: '16px'
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
