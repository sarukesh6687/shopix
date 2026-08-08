import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [msg, setMsg] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(r => setProduct(r.data))
      .catch(() => {});
    api.get(`/reviews/${id}`)
      .then(r => setReviews(Array.isArray(r.data) ? r.data : []))
      .catch(() => setReviews([]));
  }, [id]);


  const handleAddToCart = async () => {
    await addToCart(id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    await addToCart(id, qty);
    navigate('/checkout');
  };

  const submitReview = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const { data } = await api.post(`/reviews/${id}`, review);
      setReviews([data, ...reviews]);
      setMsg('Review submitted successfully!');
      setReview({ rating: 5, comment: '' });
    } catch (err) { setMsg(err.response?.data?.message || 'Error submitting review'); }
  };

  if (!product) return <div className="text-center py-5 fs-4 gradient-text">Loading product details...</div>;

  const priceNum = Number(product.price || 0);
  const discount = Number(product.discountPercent || 0);
  const finalPrice = discount > 0 ? (priceNum * (1 - discount / 100)).toFixed(2) : priceNum.toFixed(2);


  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <Link to="/products" className="text-white text-decoration-none fw-bold small">← Back to Catalog</Link>
      </nav>

      <div className="row g-4">
        {/* Product Image Panel */}
        <div className="col-lg-6">
          <div className="glass-card p-3 overflow-hidden position-relative" style={{ borderRadius: 20 }}>
            <img 
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=500&fit=crop'} 
              className="w-100 rounded" 
              alt={product.name} 
              style={{ maxHeight: 450, objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=500&fit=crop';
              }}
            />
            {product.discountPercent > 0 && (
              <span className="position-absolute top-0 start-0 m-4 badge badge-discount fs-6 shadow-sm">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="col-lg-6">
          <div className="glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge badge-glass">{product.category}</span>
                {product.brand && <span className="text-white fw-semibold small">Brand: {product.brand}</span>}
              </div>

              <h2 className="fw-extrabold text-light mb-3">{product.name}</h2>

              <div className="d-flex align-items-center gap-2 mb-4">
                <div className="text-warning fs-5">
                  {'★'.repeat(Math.round(product.ratings?.avg || 4))}{'☆'.repeat(5 - Math.round(product.ratings?.avg || 4))}
                </div>
                <span className="text-white fw-semibold small">({product.ratings?.count || 12} reviews)</span>
              </div>

              <div className="d-flex align-items-baseline gap-3 mb-4">
                <span className="display-5 fw-extrabold text-warning">₹{Number(finalPrice).toLocaleString('en-IN')}</span>
                {product.discountPercent > 0 && (
                  <span className="text-white text-decoration-line-through fs-4" style={{ opacity: 0.7 }}>
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-white mb-4 fs-6" style={{ lineHeight: 1.7, opacity: 0.95 }}>
                {product.description}
              </p>

              <div className="mb-4">
                <span className={`badge ${product.stock > 0 ? 'bg-success text-white' : 'bg-danger'} px-3 py-2 fs-6 rounded-pill fw-bold`}>
                  {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity, Add to Cart & BUY NOW Action Buttons */}
            {product.stock > 0 && (
              <div className="d-flex flex-column gap-3 border-top border-secondary border-opacity-25 pt-4">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-white fw-bold">Quantity:</span>
                  <div className="d-flex align-items-center glass-card px-2 py-1">
                    <button className="btn btn-sm btn-outline-glass border-0 fs-5" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span className="px-3 fw-bold text-light fs-5">{qty}</span>
                    <button className="btn btn-sm btn-outline-glass border-0 fs-5" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
                  </div>
                </div>

                <div className="d-flex gap-3 flex-wrap">
                  {user ? (
                    <>
                      <button 
                        className={`btn ${added ? 'btn-success' : 'btn-gradient'} btn-lg px-4 py-3 flex-grow-1 fw-bold fs-6`} 
                        onClick={handleAddToCart}
                      >
                        {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                      </button>

                      <button 
                        className="btn btn-gold btn-lg px-4 py-3 flex-grow-1 fw-bold fs-6" 
                        onClick={handleBuyNow}
                      >
                        ⚡ Buy Product Now
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="btn btn-gold btn-lg w-100 py-3 text-center fw-bold fs-6">
                      ⚡ Sign In to Buy Product
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-5">
        <h4 className="fw-bold text-light mb-4">💬 Customer Reviews</h4>

        {user && (
          <form onSubmit={submitReview} className="glass-card p-4 mb-4">
            <h6 className="fw-bold text-light mb-3">Write a Customer Review</h6>
            {msg && <div className="alert alert-info py-2 small mb-3">{msg}</div>}
            
            <div className="mb-3">
              <label className="form-label text-white fw-bold small">Rating Stars</label>
              <select className="form-select" value={review.rating} onChange={e => setReview({ ...review, rating: +e.target.value })}>
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-white fw-bold small">Your Review Comment</label>
              <textarea 
                className="form-control" 
                rows={3} 
                placeholder="Share details about your experience with this product..." 
                required 
                value={review.comment} 
                onChange={e => setReview({ ...review, comment: e.target.value })} 
              />
            </div>

            <button type="submit" className="btn btn-gradient px-4">Submit Review</button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-white opacity-75">No reviews written for this product yet. Be the first to review!</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {reviews.map(r => (
              <div key={r._id} className="glass-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong className="text-light">{r.user?.name || 'Verified Buyer'}</strong>
                  <span className="text-warning">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="text-white mb-1" style={{ opacity: 0.9 }}>{r.comment}</p>
                <small className="text-white opacity-75">{new Date(r.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
