import React from 'react'

const PropertyCard = ({ property }) => {
  const pictureSrc = property.picture;

  return (
    <div className={`card h-100 shadow-sm relative`}>
      <img
        src={pictureSrc}
        alt={'Property image'}
        className={`card-img-top`}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className={`card-body`}>
        <h5 className={`card-title`} style={{fontFamily: '"Inter", sans-serif'}}>{property.name}</h5>
        <p className={`card-text mb-1`}>{property.type} : {property.bedrooms} bedrooms</p>
        <p className={`card-text `}>{property.location}  ({property.postalCode})</p>
        <p className={`card-text`}>
            <strong>{property.currency} {property.price}</strong>
        </p>
      </div>
    </div>
    
  )
}

export default PropertyCard
