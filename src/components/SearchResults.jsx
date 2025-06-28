import React from 'react';
import ProductCard from './ProductCard';
import '../assets/SearchResults.css';

const SearchResults = ({ searchQuery, searchResults, onClearSearch }) => {
  if (!searchQuery) return null;

  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <h2>Search Results for "{searchQuery}"</h2>
        <p>{searchResults.length} products found</p>
        <button onClick={onClearSearch} className="clear-search-btn">
          Clear Search
        </button>
      </div>
      
      {searchResults.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try searching with different keywords or browse our categories</p>
        </div>
      ) : (
        <div className="search-results-grid">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;