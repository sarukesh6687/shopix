import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { ProductCard } from '../components';

const CATEGORY_ICONS = {
  'Electronics': '⚡',
  'Fashion': '👗',
  'Footwear': '👟',
  'Clothing': '👕',
  'Home & Kitchen': '🏡',
  'Sports & Fitness': '🏋️',
  'Books': '📚',
  'Beauty & Care': '💄'
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || 1;

  useEffect(() => { 
    api.get('/products/categories')
      .then(r => setCategories(Array.isArray(r.data) ? r.data : []))
      .catch(() => setCategories([])); 
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams({ page, limit: 12 });
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (sort) params.set('sort', sort);
    api.get(`/products?${params}`)
      .then(r => { 
        setProducts(r.data?.products || []); 
        setPages(r.data?.pages || 1); 
        setTotal(r.data?.total || 0); 
      })
      .catch(() => {
        setProducts([]);
        setPages(1);
        setTotal(0);
      });
  }, [search, category, sort, page]);


  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setParam('search', searchInput);
  };

  return (
    <div className="container py-4">
      {/* Title & Header */}
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
        <div>
          <h2 className="fw-extrabold text-white mb-1" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>
            Product Catalog
          </h2>
          <p className="mb-0" style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>
            Explore {total} premium items across all categories
          </p>
        </div>
      </div>

      {/* TOP HORIZONTAL CATEGORY BAR (Moved to top of search box like Photo 2) */}
      <div className="category-top-bar">
        <div 
          className={`category-chip-item ${!category ? 'active' : ''}`}
          onClick={() => setParam('category', '')}
        >
          <span className="category-chip-icon">✨</span>
          <span className="category-chip-label">All Items</span>
        </div>

        {categories.map(c => (
          <div 
            key={c}
            className={`category-chip-item ${category === c ? 'active' : ''}`}
            onClick={() => setParam('category', c)}
          >
            <span className="category-chip-icon">{CATEGORY_ICONS[c] || '📦'}</span>
            <span className="category-chip-label">{c}</span>
          </div>
        ))}
      </div>

      {/* Search Bar & Sort Filter Toolbar */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control text-white" 
                placeholder="Search products by title, brand, or keywords..." 
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)} 
                style={{ background: '#0f172a', borderColor: '#334155', color: '#ffffff' }}
              />
              <button className="btn btn-gradient px-4 fw-bold" type="submit">
                🔍 Search
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center gap-2">
            <span className="text-white fw-semibold small text-nowrap">⚡ Sort By:</span>
            <select 
              className="form-select text-white" 
              value={sort} 
              onChange={e => setParam('sort', e.target.value)} 
              style={{ background: '#0f172a', borderColor: '#334155' }}
            >
              <option value="">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="glass-card text-center py-5 my-3" style={{ background: '#0f172a' }}>
          <h4 className="text-white fw-bold mb-2">No products found</h4>
          <p className="mb-4" style={{ color: '#cbd5e1' }}>Try searching for another keyword or selecting another category.</p>
          <button className="btn btn-gradient px-4" onClick={() => { setSearchInput(''); setSearchParams({}); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(p => (
            <div className="col" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-5">
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`btn btn-sm ${+page === p ? 'btn-gradient' : 'btn-outline-glass'} px-3 fw-bold`}
              onClick={() => { const sp = new URLSearchParams(searchParams); sp.set('page', p); setSearchParams(sp); }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
