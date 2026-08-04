import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateItem, removeItem, total } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 500;
  const shippingCost = total >= freeShippingThreshold ? 0 : 49;
  const progressPercent = Math.min(100, (total / freeShippingThreshold) * 100);

  if (cart.items.length === 0) return (
    <div className="container py-5 text-center my-5">
      <div className="glass-card p-5 max-w-lg mx-auto" style={{ maxWidth: 500 }}>
        <h2 className="display-6 mb-3">🛒 Your Cart is Empty</h2>
        <p className="text-white mb-4 fw-semibold" style={{ fontSize: '1.05rem', color: '#ffffff', opacity: 1 }}>
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products" className="btn btn-gradient btn-lg px-4">
          Discover Products Now
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-light mb-4">Shopping Cart ({cart.items.length} items)</h2>

      {/* Free Shipping Progress */}
      <div className="glass-card p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2 small">
          <span className="fw-bold text-light">
            {total >= freeShippingThreshold 
              ? '🎉 You have qualified for FREE Express Shipping!' 
              : `🚚 Add ₹${(freeShippingThreshold - total).toFixed(2)} more for FREE Shipping`}
          </span>
          <span className="text-muted">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="progress" style={{ height: 8, background: 'rgba(255, 255, 255, 0.08)' }}>
          <div 
            className="progress-bar bg-warning" 
            role="progressbar" 
            style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease' }} 
          />
        </div>
      </div>

      <div className="row g-4">
        {/* Cart Item List */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.items.map(item => {
              const p = item.product;
              if (!p) return null;
              const price = p.discountPercent > 0 ? (p.price * (1 - p.discountPercent / 100)) : p.price;
              
              return (
                <div key={item._id} className="glass-card p-3">
                  <div className="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
                    <img 
                      src={p.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'} 
                      alt={p.name} 
                      style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12 }} 
                    />
                    
                    <div className="flex-grow-1">
                      <h6 className="fw-bold text-light mb-1">{p.name}</h6>
                      <div className="d-flex align-items-baseline gap-2 mb-1">
                        <span className="text-warning fw-bold">₹{Number(price).toLocaleString('en-IN')}</span>
                        {p.discountPercent > 0 && (
                          <span className="text-muted text-decoration-line-through small">
                            ₹{Number(p.price).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="badge badge-glass">{p.category}</span>
                    </div>

                    <div className="d-flex align-items-center glass-card px-2 py-1">
                      <button className="btn btn-sm text-light border-0 px-2" onClick={() => updateItem(item._id, item.quantity - 1)}>−</button>
                      <span className="px-3 fw-bold text-light">{item.quantity}</span>
                      <button className="btn btn-sm text-light border-0 px-2" onClick={() => updateItem(item._id, item.quantity + 1)}>+</button>
                    </div>

                    <div className="text-end ms-auto ms-sm-0" style={{ minWidth: 90 }}>
                      <div className="fw-extrabold text-light fs-5">
                        ₹{(price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <button className="btn btn-sm text-danger text-decoration-none p-0 mt-1" onClick={() => removeItem(item._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="glass-card p-4 sticky-top" style={{ top: 90 }}>
            <h5 className="fw-bold text-light mb-3">Order Summary</h5>
            <hr className="border-secondary border-opacity-25" />
            
            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal</span>
              <span className="text-light">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Estimated Shipping</span>
              <span className={shippingCost === 0 ? 'text-success fw-bold' : 'text-light'}>
                {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <hr className="border-secondary border-opacity-25 my-3" />

            <div className="d-flex justify-content-between fw-bold fs-4 text-light mb-4">
              <span>Total</span>
              <span className="gradient-gold">₹{(total + shippingCost).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <button className="btn btn-gradient btn-lg w-100 mb-2 py-3 fw-bold" onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>
            
            <Link to="/products" className="btn btn-outline-glass w-100 text-center py-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
