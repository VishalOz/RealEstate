import React, { useState, useEffect } from 'react'

import PropertyCard from './PropertyCard.jsx'
import data from '../data/properties.json'

import { TextField, MenuItem, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ClearAllIcon from '@mui/icons-material/ClearAll'


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

  // Load favourites from localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })
  
  const [searchResults, setSearchResults] = useState(null) // Filtered results
  const [hasSearched, setHasSearched] = useState(false) // Tells whether the Search button is clicked
  const [draggedItem, setDraggedItem] = useState(null) // ID currently being dragged
  const [draggedFromProperty, setDraggedFromProperty] = useState(null) // True if the property dragged from the property list

  // Sync favourites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const handleChange = (e) => {
    setFilters({
      ...filters, // Getting all the properties that added to the favorite list
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = () => {
    const hasAnyFilter = Object.values(filters).some(value => value !== '') // Check if at least one filter is filled
    
    if (!hasAnyFilter) {
      alert('Please fill in at least one search field')
      return
    }

    // Filter properties based on the criteria
    const filtered = properties.filter((property) => {
      if (filters.propertyType) {
        const typeMatch = property.type=== filters.propertyType // Property Type filter
        if (!typeMatch) return false
      }

      if (filters.minPrice) {
        if (property.price < (filters.minPrice)) return false // Min Price filter
      }

      if (filters.maxPrice) {
        if (property.price > (filters.maxPrice)) return false  // Max Price filter
      }

      if (filters.minBedrooms) {
        if (property.bedrooms < (filters.minBedrooms)) return false // Min Bedrooms filter
      }

      if (filters.maxBedrooms) {
        if (property.bedrooms > (filters.maxBedrooms)) return false // Max Bedrooms filter
      }

      if (filters.postalCode) {
        if (property.postalCode !== filters.postalCode) return false // Postal Code filter
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
      {/* Hero Section */}
      <div className={`container d-flex justify-content-center`}>
        <div className={`row p-3 gap-4`} style={{ padding: '15px' }}>
          <div className={`col`}>
            <h1 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              Discover properties designed to inspire.
            </h1>
            <p className={`text-center`} style={{ 
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              marginBottom: '0'
            }}>
              Luxury residences where design meets comfort
            </p>
          </div>
        </div>
      </div>

      {/* Search Filters Section */}
      <div className={`container`} style={{ padding: '10px 15px' }}>
          <div className={`card border-0`} style={{ 
            padding: 'clamp(15px, 3vw, 24px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
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
                  size="small"
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Flat">Flat</MenuItem>
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
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
                  size="small"
                />
              </div>

              <div className={`col-12`} style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                {/* Search Button */}            
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                  fullWidth
                  style={{
                    backgroundColor: '#1a1a2e',
                    color: '#ffffff',
                    padding: 'clamp(10px, 2vw, 12px) clamp(24px, 6vw, 48px)',
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    fontWeight: '600',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    maxWidth: '400px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#333';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#1a1a1a';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
      </div>

      {/* Results Section */}
      <div className={`container`} style={{ padding: '10px 15px' }}>
        <div className={`row g-3`} style={{ padding: '15px 0' }}>
          {/* Display message if search was performed but no results found */}
          {hasSearched && searchResults && searchResults.length === 0 ? (
            <div className={`col-12 text-center`} style={{ padding: 'clamp(30px, 8vw, 50px)' }}>
              <h3 style={{ 
                color: '#1a1a2e', 
                marginBottom: '10px', 
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
              }}>
                No Properties Found
              </h3>
              <p style={{ 
                color: '#666', 
                fontSize: 'clamp(14px, 2vw, 16px)',
                padding: '0 15px'
              }}>
                We couldn't find any properties matching your search criteria. Please try adjusting your filters.
              </p>
            </div>
          ) : (
            <>
              {/* Left side - Property Cards */}
              <div className="col-12 col-lg-8" style={{ marginBottom: '20px' }}>
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

              {/* Right side - Favourites Column */}
              <div className="col-12 col-lg-4">
                <div className="row g-3">
                  {/* Favourites Panel */}
                  <div className="col-12">
                    <div className="card shadow-sm" style={{ 
                      borderRadius: '20px',
                      padding: 'clamp(15px, 3vw, 20px)'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: '15px',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <h5 style={{ 
                          fontFamily: '"Inter", sans-serif', 
                          margin: '0',
                          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                        }}>
                          Favourites ({favourites.length})
                        </h5>
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
                              fontSize: 'clamp(11px, 2vw, 12px)',
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
                            <ClearAllIcon style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }} />
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
                          border: draggedItem && draggedFromProperty ? '2px dashed rgb(170, 170, 168)' : 'none'
                        }}
                      >
                        {favourites.length === 0 ? (
                          <div
                            style={{
                              padding: 'clamp(20px, 4vw, 30px)',
                              textAlign: 'center',
                              color: '#999',
                              fontSize: 'clamp(12px, 2vw, 14px)',
                              minHeight: '120px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              border: '2px dashed #e0e0e0',
                              borderRadius: '10px'
                            }}
                          >
                            <FavoriteBorderIcon style={{ 
                              fontSize: 'clamp(24px, 5vw, 32px)', 
                              marginBottom: '10px', 
                              color: '#ddd' 
                            }} />
                            <p style={{ margin: '0', padding: '0 10px' }}>
                              Drag properties here to add to favorites
                            </p>
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
                                    padding: 'clamp(10px, 2vw, 12px)',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '10px',
                                    borderLeft: '4px solid rgb(0, 0, 0)',
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
                                        <h6 style={{ 
                                          margin: '0 0 4px 0', 
                                          fontSize: 'clamp(13px, 2vw, 14px)', 
                                          fontWeight: '600', 
                                          color: '#1a1a2e', 
                                          fontFamily: '"Inter", sans-serif', 
                                          overflow: 'hidden', 
                                          textOverflow: 'ellipsis', 
                                          whiteSpace: 'nowrap' 
                                        }}>
                                          {favProperty.name}
                                        </h6>
                                        <p style={{ 
                                          margin: '0 0 4px 0', 
                                          fontSize: 'clamp(11px, 1.8vw, 12px)', 
                                          color: '#666', 
                                          fontFamily: '"Inter", sans-serif' 
                                        }}>
                                          {favProperty.bedrooms} Bed • {favProperty.type}
                                        </p>
                                        <p style={{ 
                                          margin: '0', 
                                          fontSize: 'clamp(12px, 2vw, 13px)', 
                                          fontWeight: '600', 
                                          color: '#1a1a2e', 
                                          fontFamily: '"Inter", sans-serif' 
                                        }}>
                                          {favProperty.currency} {favProperty.price.toLocaleString()}
                                        </p>
                                      </>
                                    ) : (
                                      <p style={{ 
                                        margin: '0', 
                                        fontSize: 'clamp(11px, 2vw, 12px)', 
                                        color: '#999' 
                                      }}>
                                        Unknown Property
                                      </p>
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
                                      minWidth: '28px',
                                      height: '28px',
                                      borderRadius: '4px'
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
                                    <DeleteIcon style={{ fontSize: 'clamp(16px, 2.5vw, 18px)' }} />
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
                      className="card shadow-sm" 
                      style={{ 
                        borderRadius: '20px',
                        backgroundColor: draggedItem && !draggedFromProperty ? '#f8f9fa' : 'white',
                        border: draggedItem && !draggedFromProperty ? '2px dashed rgb(184, 184, 184)' : '1px dashed rgb(202, 202, 202)',
                        transition: 'all 0.2s ease',
                        minHeight: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'clamp(15px, 3vw, 20px)'
                      }}
                      onDragOver={handleDragOver}
                      onDrop={handleDropOnRemove}
                    >
                      <DeleteIcon style={{ 
                        fontSize: 'clamp(36px, 8vw, 48px)', 
                        color: 'rgb(184, 184, 184)', 
                        marginBottom: '10px' 
                      }} />
                      
                      <p style={{ 
                        color: 'rgb(184, 184, 184)', 
                        fontSize: 'clamp(11px, 2vw, 12px)', 
                        fontStyle: 'italic', 
                        textAlign: 'center', 
                        margin: 0,
                        padding: '0 10px'
                      }}>
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
