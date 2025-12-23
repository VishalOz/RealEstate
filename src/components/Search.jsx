import React, { useState } from 'react'
import { TextField, MenuItem, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'

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

  const handleDragStart = (e, favId) => {
    setDraggedItem(favId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDropOnRemove = (e) => {
    e.preventDefault()
    if (draggedItem) {
      toggleFavourite(draggedItem)
      setDraggedItem(null)
    }
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
            <div className={`row p-3 gap-4`}>
              <div className={`col-md-12`}>
                <Grid container spacing={3}>
                  {/* Property Type */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Min Price */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Max Price */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Min Bedrooms */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Max Bedrooms */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Date Added After */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Date Added Before */}
                  <Grid item xs={12} sm={6} md={4}>
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
                  </Grid>

                  {/* Postal Code */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Postal Code"
                      name="postalCode"
                      value={filters.postalCode}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Enter postal code"
                    />
                  </Grid>

                  {/* Search Button */}
                  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
                  </Grid>
                </Grid>
                
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
                    <div key={property.id} className="col-12 col-sm-6">
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
                      <h5 style={{ fontFamily: '"Inter", sans-serif' }}>Favourites</h5>
                      {favourites.length === 0 ? (
                        <p style={{ color: '#666', fontSize: '14px' }}>No favourites added yet.</p>
                      ) : (
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                          {favourites.map((favId) => {
                            const favProperty = properties.find((prop) => prop.id === favId)
                            return (
                              <li 
                                key={favId} 
                                style={{ marginBottom: '10px', cursor: 'move' }}
                                draggable
                                onDragStart={(e) => handleDragStart(e, favId)}
                              >
                                {favProperty ? (
                                  <img 
                                    src={favProperty.picture} 
                                    alt={favProperty.name}
                                    style={{ 
                                      width: '100%', 
                                      height: '80px', 
                                      objectFit: 'cover', 
                                      borderRadius: '10px',
                                      opacity: draggedItem === favId ? 0.5 : 1,
                                      transition: 'opacity 0.2s ease'
                                    }}
                                    draggable={false}
                                  />
                                ) : 'Unknown Property'}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Remove from Favourites Panel */}
                  <div 
                    className="col-12">
                    <div 
                      className="card shadow-sm p-3" 
                      style={{ 
                        borderRadius: '20px',
                        backgroundColor: draggedItem ? '#f8f9fa' : 'white',
                        border: draggedItem ? '2px dashed rgb(184, 184, 184)' : '1px dashed rgb(202, 202, 202)',
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
                        {draggedItem ? 'Drop here to remove from favourites' : 'Drag properties here to remove'}
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
