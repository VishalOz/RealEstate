import React from 'react'

const PropertyCard = ({ property }) => {
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
          <span className="overlay-bedrooms">{property.bedrooms} Bedroom</span>
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
