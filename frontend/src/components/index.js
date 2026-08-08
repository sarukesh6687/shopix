import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop';

export function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-5 fs-5 gradient-text">Loading Shopix...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" />;
  return children;
}

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const priceNum = Number(product.price || 0);
  const discount = Number(product.discountPercent || 0);
  const finalPrice = discount > 0 ? (priceNum * (1 - discount / 100)).toFixed(2) : priceNum.toFixed(2);


  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product._id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const mainImage = (product.images && product.images.length > 0 && product.images[0])
    ? product.images[0]
    : FALLBACK_IMAGE;

  return (
    <div className="glass-card hover-lift h-100 d-flex flex-column overflow-hidden position-relative">
      {/* Clickable Card Body -> Navigates to Product Details */}
      <Link to={`/products/${product._id}`} className="text-decoration-none d-flex flex-column flex-grow-1">
        {/* Product Image Box */}
        <div className="img-zoom-container" style={{ height: 210, background: '#0f172a' }}>
          <img
            src={mainImage}
            alt={product.name}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
          {product.discountPercent > 0 && (
            <span className="position-absolute top-0 start-0 m-3 badge badge-discount shadow">
              {product.discountPercent}% OFF
            </span>
          )}
          <span className="position-absolute top-0 end-0 m-3 badge bg-primary text-white font-bold px-3 py-1 shadow" style={{ borderRadius: 20, fontSize: '0.75rem' }}>
            {product.category}
          </span>
        </div>

        {/* Card Details Box */}
        <div className="p-4 d-flex flex-column flex-grow-1" style={{ background: '#0f172a' }}>
          {/* Title */}
          <h6 className="fw-bold mb-2 text-white text-truncate fs-6" title={product.name}>
            {product.name}
          </h6>
          
          {/* Description */}
          <p className="small mb-3 flex-grow-1" style={{ color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
            {product.description}
          </p>

          {/* Price Tag */}
          <div className="d-flex align-items-baseline gap-2 mb-2">
            <span className="fs-4 fw-extrabold text-warning">₹{Number(finalPrice).toLocaleString('en-IN')}</span>
            {product.discountPercent > 0 && (
              <span className="text-decoration-line-through small" style={{ color: '#94a3b8' }}>
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Rating and Stock */}
          <div className="d-flex align-items-center justify-content-between mb-3 small">
            <div className="text-warning">
              {'★'.repeat(Math.round(product.ratings?.avg || 4))}{'☆'.repeat(5 - Math.round(product.ratings?.avg || 4))}
              <span className="ms-1" style={{ color: '#cbd5e1' }}>({product.ratings?.count || 12})</span>
            </div>
            <span className={product.stock > 0 ? 'fw-bold' : 'fw-bold'} style={{ color: product.stock > 0 ? '#34d399' : '#f87171' }}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons Footer */}
      <div className="p-3 pt-0 d-flex gap-2" style={{ background: '#0f172a' }}>
        <Link to={`/products/${product._id}`} className="btn btn-outline-glass btn-sm flex-fill text-center fw-semibold">
          View Details
        </Link>
        {user && product.stock > 0 && (
          <button
            className={`btn ${added ? 'btn-success' : 'btn-gradient'} btn-sm flex-fill fw-bold`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        )}
        {!user && product.stock > 0 && (
          <Link to="/login" className="btn btn-gradient btn-sm flex-fill text-center fw-bold">
            Login to Buy
          </Link>
        )}
      </div>
    </div>
  );
}
