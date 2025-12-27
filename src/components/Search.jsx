import React, { useState } from 'react'
import { TextField, MenuItem, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ClearAllIcon from '@mui/icons-material/ClearAll'

import PropertyCard from './PropertyCard.jsx'
import data from '../data/properties.json'

const Search = () => {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateBefore: '',
    postalCode: ''
  })

  const [favourites, setFavourites] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [draggedFromProperty, setDraggedFromProperty] = useState(null)

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = () => {
    // Check if at least one filter is filled
    const hasAnyFilter = Object.values(filters).some(value => value !== '')
    
    if (!hasAnyFilter) {
      alert('Please fill in at least one search field')
      return
    }

    // Filter properties based on the criteria
    const filtered = properties.filter((property) => {
      // Property Type filter
      if (filters.propertyType) {
        const typeMatch = property.type.toLowerCase() === filters.propertyType.toLowerCase()
        if (!typeMatch) return false
      }

      // Min Price filter
      if (filters.minPrice) {
        if (property.price < parseInt(filters.minPrice)) return false
      }

      // Max Price filter
      if (filters.maxPrice) {
        if (property.price > parseInt(filters.maxPrice)) return false
      }

      // Min Bedrooms filter
      if (filters.minBedrooms) {
        if (property.bedrooms < parseInt(filters.minBedrooms)) return false
      }

      // Max Bedrooms filter
      if (filters.maxBedrooms) {
        if (property.bedrooms > parseInt(filters.maxBedrooms)) return false
      }

      // Postal Code filter
      if (filters.postalCode) {
        if (property.postalCode !== filters.postalCode) return false
      }

      // Date Added After filter
      if (filters.dateAfter) {
        const filterDate = new Date(filters.dateAfter)
        const propertyDate = new Date(`${property.added.year}-${String(new Date(`${property.added.month} 1`).getMonth() + 1).padStart(2, '0')}-${String(property.added.day).padStart(2, '0')}`)
        if (propertyDate < filterDate) return false
      }

      // Date Added Before filter
      if (filters.dateBefore) {
        const filterDate = new Date(filters.dateBefore)
        const propertyDate = new Date(`${property.added.year}-${String(new Date(`${property.added.month} 1`).getMonth() + 1).padStart(2, '0')}-${String(property.added.day).padStart(2, '0')}`)
        if (propertyDate > filterDate) return false
      }

      return true
    })

    setSearchResults(filtered)
    setHasSearched(true)
  }

  // Use all properties instead of only the first one
  const properties = data?.properties ?? []

  // Helper: toggle favourite by id
  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  // Helper: remove favourite by id
  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((x) => x !== id))
  }

  // Helper: delete all favourites
  const deleteAllFavourites = () => {
    setFavourites([])
  }

  const handleDragStart = (e, itemId, isFromProperty = false) => {
    setDraggedItem(itemId)
    setDraggedFromProperty(isFromProperty)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnRemove = (e) => {
    e.preventDefault()
    if (draggedItem) {
      removeFavourite(draggedItem)
      setDraggedItem(null)
      setDraggedFromProperty(null)
    }
  }

  const handleDropOnFavourites = (e) => {
    e.preventDefault()
    if (draggedItem && draggedFromProperty && !favourites.includes(draggedItem)) {
      setFavourites((prev) => [...prev, draggedItem])
    }
    setDraggedItem(null)
    setDraggedFromProperty(null)
  }

  return (
    <div>
      <div className={`container d-flex justify-content-center`}>
        <div className={`row p-3 gap-4`}>
          <div className={`col`}>
            <h1>Discover properties designed to inspire.</h1>
            <p className={`text-center`}>Luxury residences where design meets comfort</p>
          </div>
        </div>
      </div>

      <div className={`container p-3 gap-4`}>
          <div className={`card p-3 shadow-md border-0`}>
            <div className={`row g-3`}>
              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Property Type */}              
                <TextField
                  select
                  fullWidth
                  label="Property Type"
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleChange}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                </TextField>
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Min Price */}                
                <TextField
                  fullWidth
                  label="Min Price"
                  name="minPrice"
                  type="number"
                  value={filters.minPrice}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="$0"
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Max Price */}               
                <TextField
                  fullWidth
                  label="Max Price"
                  name="maxPrice"
                  type="number"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="$1,000,000"
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Min Bedrooms */}        
                <TextField
                  fullWidth
                  label="Min Bedrooms"
                  name="minBedrooms"
                  type="number"
                  value={filters.minBedrooms}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="1"
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Max Bedrooms */}           
                <TextField
                  fullWidth
                  label="Max Bedrooms"
                  name="maxBedrooms"
                  type="number"
                  value={filters.maxBedrooms}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="5+"
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Date Added After */}        
                <TextField
                  fullWidth
                  label="Date Added After"
                  name="dateAfter"
                  type="date"
                  value={filters.dateAfter}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Date Added Before */}   
                <TextField
                  fullWidth
                  label="Date Added Before"
                  name="dateBefore"
                  type="date"
                  value={filters.dateBefore}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                {/* Postal Code */}    
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={filters.postalCode}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Enter postal code"
                />
              </div>

              <div className={`col-12`} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {/* Search Button */}            
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  style={{
                    backgroundColor: '#1a1a2e',
                    color: '#ffffff',
                    padding: '12px 48px',
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffd700'
                    e.currentTarget.style.color = '#1a1a2e'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a2e'
                    e.currentTarget.style.color = '#ffffff'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
      </div>

      <div className={`container`}>
        <div className={`row p-3 g-3`}>
          {/* Display message if search was performed but no results found */}
          {hasSearched && searchResults && searchResults.length === 0 ? (
            <div className={`col-12 text-center p-5`}>
              <h3 style={{ color: '#1a1a2e', marginBottom: '10px', fontFamily: '"Inter", sans-serif'}}>No Properties Found</h3>
              <p style={{ color: '#666', fontSize: '16px' }}>
                We couldn't find any properties matching your search criteria. Please try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              {/* Left side - Property Cards (2 columns) */}
              <div className="col-12 col-md-8">
                <div className="row g-3">
                  {(hasSearched ? searchResults : properties).map((property) => (
                    <div 
                      key={property.id} 
                      className="col-12 col-sm-6"
                      draggable
                      onDragStart={(e) => handleDragStart(e, property.id, true)}
                      style={{
                        opacity: draggedItem === property.id ? 0.5 : 1,
                        transition: 'opacity 0.2s ease',
                        cursor: 'grab'
                      }}
                    >
                      <PropertyCard 
                        property={property} 
                        isFavourite={favourites.includes(property.id)}
                        onToggleFavourite={toggleFavourite}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Favourites Column (3rd column) */}
              <div className="col-12 col-md-4">
                <div className="row g-3">
                  {/* Favourites Panel */}
                  <div className="col-12">
                    <div className="card shadow-sm p-3" style={{ borderRadius: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h5 style={{ fontFamily: '"Inter", sans-serif', margin: '0' }}>Favourites ({favourites.length})</h5>
                        {favourites.length > 0 && (
                          <button
                            onClick={deleteAllFavourites}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontSize: '12px',
                              color: '#999',
                              padding: '5px 10px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#d32f2f'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#999'
                            }}
                          >
                            <ClearAllIcon style={{ fontSize: '16px' }} />
                            Clear All
                          </button>
                        )}
                      </div>

                      <div
                        onDragOver={handleDragOver}
                        onDrop={handleDropOnFavourites}
                        style={{
                          borderRadius: '10px',
                          transition: 'all 0.2s ease',
                          backgroundColor: draggedItem && draggedFromProperty ? '#f0f8ff' : 'transparent',
                          border: draggedItem && draggedFromProperty ? '2px dashed #ffd700' : 'none'
                        }}
                      >
                        {favourites.length === 0 ? (
                          <div
                            style={{
                              padding: '30px 20px',
                              textAlign: 'center',
                              color: '#999',
                              fontSize: '14px',
                              minHeight: '150px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '2px dashed #e0e0e0',
                              borderRadius: '10px'
                            }}
                          >
                            <FavoriteBorderIcon style={{ fontSize: '32px', marginBottom: '10px', color: '#ddd' }} />
                            <p style={{ margin: '0' }}>Drag properties here to add to favorites</p>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {favourites.map((favId) => {
                              const favProperty = properties.find((prop) => prop.id === favId)
                              return (
                                <div 
                                  key={favId}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, favId, false)}
                                  style={{
                                    padding: '12px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '10px',
                                    borderLeft: '4px solid #ffd700',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                    transition: 'all 0.3s ease',
                                    opacity: draggedItem === favId ? 0.5 : 1,
                                    cursor: draggedItem === favId ? 'grabbing' : 'grab'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f0f0f0'
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f9f9f9'
                                  }}
                                >
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    {favProperty ? (
                                      <>
                                        <h6 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#1a1a2e', fontFamily: '"Inter", sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                          {favProperty.name}
                                        </h6>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666', fontFamily: '"Inter", sans-serif' }}>
                                          {favProperty.bedrooms} Bed • {favProperty.type}
                                        </p>
                                        <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#1a1a2e', fontFamily: '"Inter", sans-serif' }}>
                                          {favProperty.currency} {favProperty.price.toLocaleString()}
                                        </p>
                                      </>
                                    ) : (
                                      <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Unknown Property</p>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => removeFavourite(favId)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      cursor: 'pointer',
                                      padding: '4px 8px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#999',
                                      transition: 'all 0.3s ease',
                                      minWidth: '32px',
                                      height: '32px'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.color = '#d32f2f'
                                      e.currentTarget.style.backgroundColor = '#ffebee'
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.color = '#999'
                                      e.currentTarget.style.backgroundColor = 'transparent'
                                    }}
                                    title="Remove from favorites"
                                  >
                                    <DeleteIcon style={{ fontSize: '18px' }} />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove from Favourites Panel */}
                  <div className="col-12">
                    <div 
                      className="card shadow-sm p-3" 
                      style={{ 
                        borderRadius: '20px',
                        backgroundColor: draggedItem && !draggedFromProperty ? '#f8f9fa' : 'white',
                        border: draggedItem && !draggedFromProperty ? '2px dashed rgb(184, 184, 184)' : '1px dashed rgb(202, 202, 202)',
                        transition: 'all 0.2s ease',
                        minHeight: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onDragOver={handleDragOver}
                      onDrop={handleDropOnRemove}
                    >
                      <DeleteIcon style={{ fontSize: '48px', color: 'rgb(184, 184, 184)', marginBottom: '10px' }} />
                      
                      <p style={{ color: 'rgb(184, 184, 184)', fontSize: '12px', fontStyle: 'italic', textAlign: 'center', margin: 0 }}>
                        {draggedItem && !draggedFromProperty ? 'Drop here to remove from favourites' : 'Drag favorites here to remove'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
