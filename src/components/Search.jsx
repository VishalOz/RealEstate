import React, { useState } from 'react'
import { TextField, MenuItem, Button, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

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
                      <MenuItem value="apartment">Flat</MenuItem>
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
        <div className={`row p-3 gap-2`}>
          {/* Display message if search was performed but no results found */}
          {hasSearched && searchResults && searchResults.length === 0 ? (
            <div className={`col-12 text-center p-5`}>
              <h3 style={{ color: '#1a1a2e', marginBottom: '10px' }}>No Properties Found</h3>
              <p style={{ color: '#666', fontSize: '16px' }}>
                We couldn't find any properties matching your search criteria. Please try adjusting your filters.
              </p>
            </div>
          ) : (
            /* Render a card for each property, injecting favourites panel next to the KANDY - HILL VIEW RESIDENCE card */
            (hasSearched ? searchResults : properties).map((property) => (
              <React.Fragment key={property.id}>
                <div className={`col-12 col-sm-6 col-md-4`}>
                  {/* Wrap PropertyCard with a simple favourite toggle */}
                  <div className={`position-relative`}>
                    <PropertyCard property={property} />
                    <button
                      aria-label={`Toggle favourite ${property.name || property.id}`}
                      onClick={() => toggleFavourite(property.id)}
                      className={`btn btn-sm btn-outline-warning position-absolute`}
                      style={{ top: 8, right: 8 }}
                    >
                      {favourites.includes(property.id) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
