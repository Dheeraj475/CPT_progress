import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../assets/ProductsPage.css';

const ProductsPage = ({ allProducts = [] }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    rating: 0,
    brand: '',
    inStock: false
  });
  
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 12;

  // Safely get unique values for filter options
  const categories = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    return [...new Set(allProducts.map(p => p?.category).filter(Boolean))];
  }, [allProducts]);

  const brands = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    return [...new Set(allProducts.map(p => p?.brand).filter(Boolean))];
  }, [allProducts]);

  const maxPrice = useMemo(() => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) return 10000;
    return Math.max(...allProducts.map(p => p?.price || 0));
  }, [allProducts]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];

    let filtered = allProducts.filter(product => {
      if (!product) return false;

      // Search filter - safely handle undefined properties
      const searchMatch = !searchQuery || [
        product.title,
        product.subtitle,
        product.desc,
        product.category
      ].some(field => {
        if (!field) return false;
        const fieldAsString = String(field || '');
        const lowerCaseField = fieldAsString.toLowerCase();
        const lowerCaseSearchQuery = String(searchQuery || '').toLowerCase();
        return lowerCaseField.includes(lowerCaseSearchQuery);
      });

      const categoryMatch = !filters.category || product.category === filters.category;
      const priceMatch = (product.price || 0) >= filters.priceRange[0] && (product.price || 0) <= filters.priceRange[1];
      const ratingMatch = (product.rating || 0) >= filters.rating;
      const brandMatch = !filters.brand || product.brand === filters.brand;
      const stockMatch = !filters.inStock || product.inStock;
      
      return searchMatch && categoryMatch && priceMatch && ratingMatch && brandMatch && stockMatch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
    }

    return filtered;
  }, [allProducts, filters, sortBy, searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, maxPrice],
      rating: 0,
      brand: '',
      inStock: false
    });
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price || 0);
  };

  // Early return if products are not loaded
  if (!Array.isArray(allProducts)) {
    return (
      <div className="products-page">
        <div className="products-header">
          <h1>Loading products...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="breadcrumb">
          <span>Home</span> > <span>Products</span>
          {searchQuery && <span> > Search: "{searchQuery}"</span>}
        </div>
        <h1>
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p>Showing {filteredAndSortedProducts.length} of {allProducts.length} products</p>
      </div>

      <div className="products-container">
        {/* Mobile Filter Toggle */}
        <button 
          className="mobile-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          🔧 Filters & Sort
        </button>

        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearAllFilters} className="clear-filters">
              Clear All
            </button>
          </div>

          <div className="filters-content">
            {/* Category Filter */}
            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-options">
                <label>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={filters.category === ''}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  />
                  All Categories
                </label>
                {categories.map(category => (
                  <label key={category}>
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                    {typeof category === 'string' ? category.replace('-', ' ').toUpperCase() : category}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-display">
                  {formatPrice(0)} - {formatPrice(filters.priceRange[1])}
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="filter-group">
              <h4>Customer Rating</h4>
              <div className="filter-options">
                {[4, 3, 2, 1, 0].map(rating => (
                  <label key={rating}>
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating}
                      onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                    />
                    {rating > 0 ? `${rating}★ & above` : 'All Ratings'}
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <h4>Brand</h4>
              <div className="filter-options">
                <label>
                  <input
                    type="radio"
                    name="brand"
                    value=""
                    checked={filters.brand === ''}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                  />
                  All Brands
                </label>
                {brands.map(brand => (
                  <label key={brand}>
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Filter */}
            <div className="filter-group">
              <h4>Availability</h4>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* Products Content */}
        <div className="products-content">
          {/* Sort Options */}
          <div className="sort-bar">
            <div className="sort-options">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            
            <div className="results-count">
              {filteredAndSortedProducts.length} products found
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">📦</div>
              <h3>No products found</h3>
              <p>
                {searchQuery 
                  ? `No products found for "${searchQuery}". Try adjusting your search or filters.`
                  : 'Try adjusting your filters or search criteria'
                }
              </p>
              <button onClick={clearAllFilters} className="reset-filters-btn">
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div 
          className="mobile-filter-overlay"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;