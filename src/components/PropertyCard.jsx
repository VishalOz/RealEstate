import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const pictureSrc = property.picture;

  const handleCardHover = (hovering) => {
    setIsHovering(hovering);
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      className="property-card"
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={pictureSrc}
        alt={'Property image'}
        className="property-image"
        styles={{  }}
      />
      {/* Arrow button that appears on hover */}
      {isHovering && (
        <button
          onClick={handleArrowClick}
          aria-label="View property details"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'auto',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#000' }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      )}
      <div className="property-overlay">
        <div className="overlay-top">
          <span className="overlay-location">{property.location}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <span className="overlay-bedrooms">{property.bedrooms} Bedroom</span>
            <button
              aria-label={`Toggle favourite ${property.name || property.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavourite && onToggleFavourite(property.id);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                padding: '0',
                lineHeight: '1',
                transition: 'all 0.2s ease',
                pointerEvents: 'auto'
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill={isFavourite ? 'red' : 'none'}
                stroke="white"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overlay-bottom">
          <span className="overlay-name">{property.name}</span>
          <span className="overlay-price">{property.currency} {property.price}</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
