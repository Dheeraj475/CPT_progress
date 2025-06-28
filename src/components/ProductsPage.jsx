import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../assets/ProductsPage.css';

const ProductsPage = ({ allProducts }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // ✅ Guard against undefined allProducts
  if (!Array.isArray(allProducts)) {
    return <div className="products-page">Loading products...</div>;
  }

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

  const categories = [...new Set(allProducts.map(p => p.category))].filter(Boolean);
  const brands = [...new Set(allProducts.map(p => p.brand))].filter(Boolean);
  const maxPrice = Math.max(...allProducts.map(p => p.price || 0));

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const searchMatch = !searchQuery || 
        (product.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.desc || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category || '').toLowerCase().includes(searchQuery.toLowerCase());

      const categoryMatch = !filters.category || product.category === filters.category;
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const ratingMatch = product.rating >= filters.rating;
      const brandMatch = !filters.brand || product.brand === filters.brand;
      const stockMatch = !filters.inStock || product.inStock;

      return searchMatch && categoryMatch && priceMatch && ratingMatch && brandMatch && stockMatch;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [allProducts, filters, sortBy, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, searchQuery]);

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
    }).format(price);
  };

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
        <button 
          className="mobile-filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          🔧 Filters & Sort
        </button>

        <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearAllFilters} className="clear-filters">
              Clear All
            </button>
          </div>

          <div className="filters-content">
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

            {/* The rest of filters (Material, Color, Room Type, Style) remain same */}
            {/* ... you already had that correct ... */}
          </div>
        </div>

        <div className="products-content">
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
