import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { ProductCard } from '../components';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.get('/products?limit=8&sort=rating').then(r => setFeatured(r.data.products));
    api.get('/products/categories').then(r => setCategories(r.data));
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SHOPIX10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 position-relative overflow-hidden" style={{
        background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.25) 0%, rgba(11, 15, 25, 1) 70%)',
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}>
        <div className="container py-lg-5 text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center gap-2 badge-glass px-4 py-2 mb-4">
            <span>✨ The Future of Online Shopping</span>
          </div>
          
          <h1 className="display-3 fw-extrabold mb-4" style={{ letterSpacing: '-1px' }}>
            Elevate Your Lifestyle with <br className="d-none d-md-inline" />
            <span className="gradient-text">Shopix Premium Collection</span>
          </h1>

          <p className="lead mb-5 mx-auto fw-semibold text-white" style={{ maxWidth: 680, fontSize: '1.25rem', color: '#ffffff', opacity: 1 }}>
            Explore curated tech gadgetry, designer apparel, and home essentials. Express delivery across India with 100% authentic guarantee.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/products" className="btn btn-gradient btn-lg px-5 py-3 fs-6">
              🛍️ Start Shopping Now
            </Link>

            <a href="#featured" className="btn btn-outline-glass btn-lg px-5 py-3 fs-6">
              View Collections
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="row g-4 mt-5 pt-4 justify-content-center border-top border-secondary border-opacity-25 max-w-4xl mx-auto">
            <div className="col-4 col-md-3">
              <h3 className="fw-extrabold text-warning mb-1">10k+</h3>
              <p className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>Happy Customers</p>
            </div>
            <div className="col-4 col-md-3">
              <h3 className="fw-extrabold text-warning mb-1">100%</h3>
              <p className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>Authentic Goods</p>
            </div>
            <div className="col-4 col-md-3">
              <h3 className="fw-extrabold text-warning mb-1">24/7</h3>
              <p className="fw-bold mb-0 text-white" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1 text-light">Browse Categories</h3>
            <p className="text-white fw-medium mb-0" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>Find exactly what you need in seconds</p>
          </div>
          <Link to="/products" className="btn btn-outline-glass btn-sm">
            All Categories →
          </Link>
        </div>

        <div className="d-flex flex-wrap gap-3">
          <Link to="/products" className="btn btn-outline-glass active">
            🔥 All Items
          </Link>
          {categories.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`} className="btn btn-outline-glass">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge-glass mb-2 d-inline-block">Curated Selection</span>
            <h3 className="fw-bold mb-0 text-light">Featured Products</h3>
          </div>
          <Link to="/products" className="btn btn-gradient btn-sm px-4">
            View Catalog
          </Link>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {featured.map(p => (
            <div className="col" key={p._id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner Card */}
      <section className="container mb-5">
        <div className="glass-card p-4 p-md-5 position-relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)'
        }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3 className="fw-bold text-light mb-2">🚚 Free Express Delivery on orders over ₹500!</h3>
              <p className="fw-semibold mb-0 text-white" style={{ fontSize: '1.05rem', color: '#ffffff', opacity: 1 }}>
                Unlock an additional <span className="text-warning fw-extrabold fs-5 mx-1">10% OFF</span> your inaugural order using coupon code below.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button
                className="btn btn-gold px-4 py-2 fw-bold"
                onClick={handleCopyCode}
              >
                {copied ? '✓ Code Copied!' : 'Copy Code: SHOPIX10'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
