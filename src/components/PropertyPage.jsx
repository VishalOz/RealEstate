import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import properties from '../data/properties.json'

const PropertyPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [activeTab, setActiveTab] = useState('gallery')
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const foundProperty = properties.properties.find(p => p.id === id)
    setProperty(foundProperty)
  }, [id])

  if (!property) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <p className="fs-5">Loading property details...</p>
      </div>
    )
  }

  // Carousel settings with 6 images minimum
  const galleryImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.picture, property.picture, property.picture, property.picture, property.picture, property.picture]

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCarouselIndex(next),
  }

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  }

  return (
    <div className="property-page" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: '50px' }}>
      {/* Header Section with Large Image */}
      <div style={{ position: 'relative', height: '500px', overflow: 'hidden', borderRadius: '20px', margin: '30px 40px' }}>
        <img 
          src={galleryImages[carouselIndex]} 
          alt="Property main view" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '20px'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '20px',
          fontSize: '14px'
        }}>
          {carouselIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Property Info Section */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="row" style={{ marginBottom: '40px' }}>
          <div className="col-md-8">
            <h1 style={{ fontSize: '40px', fontWeight: '300', marginBottom: '10px', fontFamily: '"Roboto", sans-serif' }}>
              {property.name}
            </h1>
            <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>Location</p>
                <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 0 0' }}>{property.location}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>Property Type</p>
                <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 0 0' }}>{property.type}</p>
              </div>
              <div>
                <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>Bedrooms</p>
                <p style={{ fontSize: '16px', fontWeight: '500', margin: '5px 0 0 0' }}>{property.bedrooms}</p>
              </div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
              <p style={{ color: '#666', fontSize: '14px', margin: '0' }}>Price</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '5px 0 0 0', color: '#000' }}>
                {property.currency} {property.price.toLocaleString()}
              </p>
              <p style={{ color: '#999', fontSize: '14px', margin: '10px 0 0 0' }}>Tenure: {property.tenure}</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '0', 
          borderBottom: '1px solid #ddd',
          marginBottom: '30px',
          backgroundColor: 'white',
          borderRadius: '15px 15px 0 0',
          overflow: 'hidden'
        }}>
          {['gallery', 'description', 'floorplan', 'location'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '15px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#000' : '#f5f5f5',
                color: activeTab === tab ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: activeTab === tab ? '600' : '500',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize',
                borderRadius: tab === 'gallery' ? '15px 0 0 0' : tab === 'location' ? '0 15px 0 0' : '0'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0 0 15px 15px', 
          padding: '40px',
          minHeight: '500px'
        }}>
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '30px' }}>Gallery</h2>
              
              {/* Main Carousel */}
              <div style={{ marginBottom: '30px', borderRadius: '15px', overflow: 'hidden' }}>
                <Slider {...sliderSettings}>
                  {galleryImages.map((img, index) => (
                    <div key={index} style={{ outline: 'none' }}>
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: '15px'
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Thumbnail Carousel */}
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px' }}>Photos</h3>
                <Slider {...thumbnailSettings}>
                  {galleryImages.map((img, index) => (
                    <div key={index} style={{ padding: '5px', outline: 'none' }}>
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          border: carouselIndex === index ? '3px solid #000' : '3px solid transparent',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => setCarouselIndex(index)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === 'description' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '20px' }}>About this property</h2>
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.8', 
                color: '#555',
                marginBottom: '30px'
              }}>
                {property.description}
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px' }}>
                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Property Type</h3>
                  <p style={{ fontSize: '20px', fontWeight: '600' }}>{property.type}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Bedrooms</h3>
                  <p style={{ fontSize: '20px', fontWeight: '600' }}>{property.bedrooms}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Tenure</h3>
                  <p style={{ fontSize: '20px', fontWeight: '600' }}>{property.tenure}</p>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
                  <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Postal Code</h3>
                  <p style={{ fontSize: '20px', fontWeight: '600' }}>{property.postalCode}</p>
                </div>
              </div>
            </div>
          )}

          {/* Floor Plan Tab */}
          {activeTab === 'floorplan' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '30px' }}>Floor Plan</h2>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '15px',
                minHeight: '500px',
                padding: '40px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <svg width="300" height="400" viewBox="0 0 300 400" style={{ marginBottom: '30px' }}>
                    {/* Outer walls */}
                    <rect x="20" y="20" width="260" height="360" fill="none" stroke="#000" strokeWidth="3"/>
                    
                    {/* Main living area */}
                    <rect x="30" y="30" width="120" height="150" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="90" y="110" textAnchor="middle" fontSize="12" fontWeight="bold">Living Room</text>
                    
                    {/* Kitchen */}
                    <rect x="160" y="30" width="110" height="75" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="215" y="70" textAnchor="middle" fontSize="12" fontWeight="bold">Kitchen</text>
                    
                    {/* Dining */}
                    <rect x="160" y="115" width="110" height="65" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="215" y="155" textAnchor="middle" fontSize="12" fontWeight="bold">Dining</text>
                    
                    {/* Bedroom 1 */}
                    <rect x="30" y="190" width="100" height="100" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="80" y="245" textAnchor="middle" fontSize="12" fontWeight="bold">Bedroom 1</text>
                    
                    {/* Bedroom 2 */}
                    <rect x="140" y="190" width="100" height="100" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="190" y="245" textAnchor="middle" fontSize="12" fontWeight="bold">Bedroom 2</text>
                    
                    {/* Bathroom */}
                    <rect x="250" y="190" width="20" height="100" fill="none" stroke="#333" strokeWidth="2"/>
                    
                    {/* Bedroom 3 */}
                    <rect x="30" y="300" width="100" height="70" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="80" y="340" textAnchor="middle" fontSize="12" fontWeight="bold">Bedroom 3</text>
                    
                    {/* Laundry/Storage */}
                    <rect x="140" y="300" width="130" height="70" fill="none" stroke="#333" strokeWidth="2"/>
                    <text x="205" y="340" textAnchor="middle" fontSize="12" fontWeight="bold">Laundry/Storage</text>
                  </svg>
                  <p style={{ color: '#666', fontSize: '16px', marginTop: '20px' }}>
                    Approximate floor plan layout for {property.bedrooms}-bedroom {property.type}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Location Tab with Google Maps */}
          {activeTab === 'location' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '30px' }}>Location</h2>
              
              <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{property.location}</p>
                <p style={{ color: '#666', fontSize: '16px' }}>Postal Code: {property.postalCode}</p>
              </div>

              {/* Google Maps Iframe */}
              <div style={{ 
                borderRadius: '15px', 
                overflow: 'hidden',
                marginBottom: '30px'
              }}>
                <iframe
                  width="100%"
                  height="500"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLzQK6C68eRvzDYlMQsVOwwBEgBRzJOck&q=${encodeURIComponent(property.location)}`}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${property.location}`}
                ></iframe>
              </div>

              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '20px', 
                borderRadius: '15px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>Coordinates</h3>
                <p style={{ margin: '5px 0', color: '#555' }}>
                  <strong>Latitude:</strong> {property.coordinates?.lat || 'N/A'}
                </p>
                <p style={{ margin: '5px 0', color: '#555' }}>
                  <strong>Longitude:</strong> {property.coordinates?.lng || 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyPage
