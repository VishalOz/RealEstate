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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = () => {
    console.log('Search filters:', filters)
    // Add your search logic here
  }

  const firstProperty = data?.properties?.[0]

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
        <div className={`row p-3 gap-4`}>
          <div className={`col-md-4 col-sm-3`}>
            <PropertyCard property={firstProperty} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
