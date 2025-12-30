import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PropertyCard from './PropertyCard.jsx'
import data from '../data/properties.json'

import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ClearAllIcon from '@mui/icons-material/ClearAll'

const Favorites = () => {
  const navigate = useNavigate()
  const properties = data?.properties ?? []
  
  // Load favourites from localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })
  
  const [draggedItem, setDraggedItem] = useState(null)

  // Sync favourites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  // Listen for storage changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('favourites')
      if (saved) {
        setFavourites(JSON.parse(saved))
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    // Also check on focus in case changes happened in same tab
    window.addEventListener('focus', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleStorageChange)
    }
  }, [])

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

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
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
    }
  }

  // Get favorite properties
  const favouriteProperties = properties.filter((prop) => favourites.includes(prop.id))

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <div className="row p-3 gap-4">
          <div className="col">
            <h1>Your Favourite Properties</h1>
            <p className="text-center">Properties you've saved for later</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row p-3 g-3">
          {/* Left side - Favourite Property Cards */}
          <div className="col-12 col-md-8">
            {favouriteProperties.length === 0 ? (
              <div 
                style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '16px',
                  minHeight: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '2px dashed #e0e0e0',
                  borderRadius: '20px',
                  backgroundColor: '#fafafa'
                }}
              >
                <FavoriteBorderIcon style={{ fontSize: '64px', marginBottom: '20px', color: '#ddd' }} />
                <h3 style={{ margin: '0 0 10px 0', color: '#666', fontFamily: '"Inter", sans-serif' }}>No Favourites Yet</h3>
                <p style={{ margin: '0 0 20px 0', maxWidth: '400px' }}>
                  Start exploring properties and add them to your favourites to see them here.
                </p>
                <button
                  onClick={() => navigate('/search')}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#1a1a2e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  Browse Properties
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {favouriteProperties.map((property) => (
                  <div 
                    key={property.id} 
                    className="col-12 col-sm-6"
                    draggable
                    onDragStart={(e) => handleDragStart(e, property.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      opacity: draggedItem === property.id ? 0.5 : 1,
                      transition: 'opacity 0.2s ease',
                      cursor: 'grab'
                    }}
                  >
                    <PropertyCard 
                      property={property} 
                      isFavourite={true}
                      onToggleFavourite={toggleFavourite}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Summary and Remove Panel */}
          <div className="col-12 col-md-4">
            <div className="row g-3">
              {/* Favourites Summary Panel */}
              <div className="col-12">
                <div className="card shadow-sm p-3" style={{ borderRadius: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h5 style={{ fontFamily: '"Inter", sans-serif', margin: '0' }}>
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
                      <p style={{ margin: '0' }}>No favorites added yet</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {favourites.map((favId) => {
                        const favProperty = properties.find((prop) => prop.id === favId)
                        return (
                          <div 
                            key={favId}
                            draggable
                            onDragStart={(e) => handleDragStart(e, favId)}
                            onDragEnd={handleDragEnd}
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
                                  <h6 style={{ 
                                    margin: '0 0 4px 0', 
                                    fontSize: '14px', 
                                    fontWeight: '600', 
                                    color: '#1a1a2e', 
                                    fontFamily: '"Inter", sans-serif', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis', 
                                    whiteSpace: 'nowrap' 
                                  }}>
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

              {/* Remove from Favourites Panel - Drag & Drop */}
              <div className="col-12">
                <div 
                  className="card shadow-sm p-3" 
                  style={{ 
                    borderRadius: '20px',
                    backgroundColor: draggedItem ? '#ffebee' : 'white',
                    border: draggedItem ? '2px dashed #d32f2f' : '1px dashed rgb(202, 202, 202)',
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
                  <DeleteIcon 
                    style={{ 
                      fontSize: '48px', 
                      color: draggedItem ? '#d32f2f' : 'rgb(184, 184, 184)', 
                      marginBottom: '10px',
                      transition: 'all 0.2s ease'
                    }} 
                  />
                  
                  <p style={{ 
                    color: draggedItem ? '#d32f2f' : 'rgb(184, 184, 184)', 
                    fontSize: '12px', 
                    fontStyle: 'italic', 
                    textAlign: 'center', 
                    margin: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    {draggedItem ? 'Drop here to remove from favourites' : 'Drag favorites here to remove'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites
