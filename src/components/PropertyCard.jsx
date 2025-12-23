import React from 'react'

const PropertyCard = ({ property, isFavourite, onToggleFavourite }) => {
  const pictureSrc = property.picture;

  return (
    <div className="property-card">
      <img
        src={pictureSrc}
        alt={'Property image'}
        className="property-image"
      />
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
