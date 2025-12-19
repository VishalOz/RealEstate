import React from 'react'

const PropertyCard = ({ property }) => {
  

  return (
    <div>
      <div className={`card h-100 shadow-sm`}>
        <img
          src={property.picture || ''}
          alt={property.name || 'Property image'}
          className={`card-img-top`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className={`card-body`}>
          <h5 className={`card-title`}>{property.name || 'Unnamed Property'}</h5>
          <p className={`card-text mb-1`}>{property.location || 'Unknown location'}</p>
          {property.price !== undefined && (
            <p className={`card-text`}>
              <strong>{property.currency ? property.currency + ' ' : ''}{property.price}</strong>
            </p>
          )}
        </div>
      </div>
      <div className={`card h-100 shadow-sm`}>
        <img
          src={property.picture || ''}
          alt={property.name || 'Property image'}
          className={`card-img-top`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className={`card-body`}>
          <h5 className={`card-title`}>{property.name || 'Unnamed Property'}</h5>
          <p className={`card-text mb-1`}>{property.location || 'Unknown location'}</p>
          {property.price !== undefined && (
            <p className={`card-text`}>
              <strong>{property.currency ? property.currency + ' ' : ''}{property.price}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
