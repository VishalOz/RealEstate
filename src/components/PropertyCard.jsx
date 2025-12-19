import React from 'react'

const PropertyCard = ({ property }) => {
  const pictureSrc = (() => {
    const pic = property.picture || ''
    if (!pic) return '/images/light.png'
    if (pic.startsWith('http') || pic.startsWith('/')) return pic
    return `/${pic}`
  })()

  const handleImgError = (e) => {
    if (e.currentTarget.src.endsWith('/images/light.png')) return
    e.currentTarget.src = '/images/light.png'
  }

  return (
    <div className={`card h-100 shadow-sm`}>
      <img
        src={pictureSrc}
        onError={handleImgError}
        alt={property.name || 'Property image'}
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
