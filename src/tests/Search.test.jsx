import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from '../components/Search';
import '@testing-library/jest-dom';

// Mock react-slick
jest.mock('react-slick', () => {
  return function MockSlider({ children }) {
    return <div data-testid="mock-slider">{children}</div>;
  };
});

// Mock the PropertyCard component
jest.mock('../components/PropertyCard.jsx', () => {
  return function MockPropertyCard({ property, isFavourite, onToggleFavourite }) {
    return (
      <div data-testid={`property-card-${property.id}`}>
        <h3>{property.name}</h3>
        <p>{property.type}</p>
        <p>{property.price}</p>
        <button 
          data-testid={`toggle-favourite-${property.id}`}
          onClick={() => onToggleFavourite(property.id)}
        >
          {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
        </button>
      </div>
    );
  };
});

// Mock the properties data
jest.mock('../data/properties.json', () => ({
  properties: [
    {
      id: 'prop1',
      name: 'KANDANA - HALPE HILLS',
      type: 'house',
      bedrooms: 3,
      price: 18000000,
      currency: 'LKR',
      postalCode: 'KH100',
      added: { month: 'October', day: 15, year: 2025 }
    },
    {
      id: 'prop2',
      name: 'KANDY - VENDOL SKY RESORT',
      type: 'house',
      bedrooms: 4,
      price: 1250000,
      currency: 'LKR',
      postalCode: 'KV200',
      added: { month: 'November', day: 3, year: 2025 }
    },
    {
      id: 'prop3',
      name: 'COLOMBO - VISH HEIGHTS',
      type: 'flat',
      bedrooms: 2,
      price: 9500000,
      currency: 'LKR',
      postalCode: 'CV400',
      added: { month: 'January', day: 15, year: 2023 }
    },
    {
      id: 'prop4',
      name: 'GALLE - OCEAN BREEZE VILLA',
      type: 'house',
      bedrooms: 5,
      price: 27000000,
      currency: 'LKR',
      postalCode: 'GO300',
      added: { month: 'August', day: 22, year: 2024 }
    }
  ]
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Search Component - Critical Functions Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });


  
  // TEST 1: Filter by Property Type
  test('1. Should filter properties by property type (House vs Flat)', () => {
    renderWithRouter(<Search />);
    
    // Initially all properties should be displayed
    expect(screen.getByText('KANDANA - HALPE HILLS')).toBeInTheDocument();
    expect(screen.getByText('COLOMBO - VISH HEIGHTS')).toBeInTheDocument();
    
    // Select "flat" from property type dropdown
    const propertyTypeSelect = screen.getByLabelText('Property Type');
    fireEvent.mouseDown(propertyTypeSelect);
    
    const flatOption = screen.getByRole('option', { name: 'Flat' });
    fireEvent.click(flatOption);
    
    // Click search button
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Wait for the search to complete and verify results
    waitFor(() => {
      // Should only show Flat properties
      expect(screen.queryByText('KANDANA - HALPE HILLS')).not.toBeInTheDocument();
      expect(screen.getByText('COLOMBO - VISH HEIGHTS')).toBeInTheDocument();
    });
  });



  // TEST 2: Filter by Price Range
  test('2. Should filter properties by price range (min and max)', () => {
    renderWithRouter(<Search />);
    
    // Set min price to 5000000 and max price to 20000000
    const minPriceInput = screen.getByLabelText('Min Price');
    const maxPriceInput = screen.getByLabelText('Max Price');
    
    fireEvent.change(minPriceInput, { target: { value: '5000000' } });
    fireEvent.change(maxPriceInput, { target: { value: '20000000' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Should show properties within range (prop1: 18000000, prop3: 9500000)
    expect(screen.getByText('KANDANA - HALPE HILLS')).toBeInTheDocument();
    expect(screen.getByText('COLOMBO - VISH HEIGHTS')).toBeInTheDocument();
    
    // Should not show properties outside range (prop2: 1250000, prop4: 27000000)
    expect(screen.queryByText('KANDY - VENDOL SKY RESORT')).not.toBeInTheDocument();
    expect(screen.queryByText('GALLE - OCEAN BREEZE VILLA')).not.toBeInTheDocument();
  });



  // TEST 3: Filter by Bedroom Count
  test('3. Should filter properties by bedroom count (min and max)', () => {
    renderWithRouter(<Search />);
    
    // Set min bedrooms to 3 and max bedrooms to 4
    const minBedroomsInput = screen.getByLabelText('Min Bedrooms');
    const maxBedroomsInput = screen.getByLabelText('Max Bedrooms');
    
    fireEvent.change(minBedroomsInput, { target: { value: '3' } });
    fireEvent.change(maxBedroomsInput, { target: { value: '4' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Should show properties with 3-4 bedrooms (prop1: 3, prop2: 4)
    expect(screen.getByText('KANDANA - HALPE HILLS')).toBeInTheDocument();
    expect(screen.getByText('KANDY - VENDOL SKY RESORT')).toBeInTheDocument();
    
    // Should not show properties outside range (prop3: 2, prop4: 5)
    expect(screen.queryByText('COLOMBO - VISH HEIGHTS')).not.toBeInTheDocument();
    expect(screen.queryByText('GALLE - OCEAN BREEZE VILLA')).not.toBeInTheDocument();
  });



  // TEST 4: Add and Remove Favourites with localStorage persistence
  test('4. Should add/remove favourites and persist to localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    renderWithRouter(<Search />);
    
    // Initially no favourites
    expect(screen.getByText('Favourites (0)')).toBeInTheDocument();
    
    // Add a property to favourites
    const toggleButton = screen.getByTestId('toggle-favourite-prop1');
    fireEvent.click(toggleButton);
    
    // Should show in favourites count
    expect(screen.getByText('Favourites (1)')).toBeInTheDocument();
    
    // Should persist to localStorage
    expect(setItemSpy).toHaveBeenCalledWith(
      'favourites',
      JSON.stringify(['prop1'])
    );
    
    // Add another favourite
    const toggleButton2 = screen.getByTestId('toggle-favourite-prop2');
    fireEvent.click(toggleButton2);
    
    expect(screen.getByText('Favourites (2)')).toBeInTheDocument();
    
    // Remove a favourite
    fireEvent.click(toggleButton);
    
    expect(screen.getByText('Favourites (1)')).toBeInTheDocument();
    
    setItemSpy.mockRestore();
  });



  // TEST 5: Clear All Favourites functionality
  test('5. Should clear all favourites when "Clear All" button is clicked', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    // Mock localStorage to return some favourites
    getItemSpy.mockReturnValue(JSON.stringify(['prop1', 'prop2', 'prop3']));
    
    renderWithRouter(<Search />);
    
    // Should show 3 favourites initially
    expect(screen.getByText('Favourites (3)')).toBeInTheDocument();
    
    // Click "Clear All" button
    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);
    
    // Should have no favourites
    expect(screen.getByText('Favourites (0)')).toBeInTheDocument();
    
    // Should update localStorage
    expect(setItemSpy).toHaveBeenCalledWith('favourites', JSON.stringify([]));
    
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });



  // TEST 6: Show "No Properties Found" message when search returns empty results
  test('6. Should display "No Properties Found" message for empty search results', () => {
    renderWithRouter(<Search />);
    
    // Set filters that will return no results
    const minPriceInput = screen.getByLabelText('Min Price');
    fireEvent.change(minPriceInput, { target: { value: '999999999' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Should show "No Properties Found" message
    expect(screen.getByText('No Properties Found')).toBeInTheDocument();
    expect(screen.getByText(/We couldn't find any properties matching your search criteria/i)).toBeInTheDocument();
    
    // Properties should not be visible
    expect(screen.queryByText('KANDANA - HALPE HILLS')).not.toBeInTheDocument();
  });



  // TEST 7: Validation - Alert when no filter is filled
  test('7. Should show alert when search is clicked without any filters', () => {
    // Mock window.alert
    window.alert = jest.fn();
    
    renderWithRouter(<Search />);
    
    // Click search without filling any filters
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Should show alert
    expect(window.alert).toHaveBeenCalledWith('Please fill in at least one search field');
  });



  // TEST 8: Filter by Postal Code
  test('8. Should filter properties by postal code', () => {
    renderWithRouter(<Search />);
    
    // Enter postal code
    const postalCodeInput = screen.getByLabelText('Postal Code');
    fireEvent.change(postalCodeInput, { target: { value: 'KH100' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);
    
    // Should only show property with matching postal code
    expect(screen.getByText('KANDANA - HALPE HILLS')).toBeInTheDocument();
    expect(screen.queryByText('KANDY - VENDOL SKY RESORT')).not.toBeInTheDocument();
    expect(screen.queryByText('COLOMBO - VISH HEIGHTS')).not.toBeInTheDocument();
  });
});
