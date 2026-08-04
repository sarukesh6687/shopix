import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ 
    street: user?.address?.street || '', 
    city: user?.address?.city || '', 
    zip: user?.address?.zip || '', 
    country: user?.address?.country || 'India' 
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shippingCost = total >= 500 ? 0 : 49;
  const finalTotal = total + shippingCost;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/orders', { shippingAddress: address, paymentMethod });
      clearCart();
      navigate(`/orders/${data._id}?success=true`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally { setLoading(false); }
  };

  if (cart.items.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      {/* Checkout Step Header - High Contrast Bright Text */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary border-opacity-25">
        <div>
          <h2 className="fw-extrabold text-white mb-1">Checkout</h2>
          <p className="mb-0 fw-medium" style={{ color: '#e2e8f0', fontSize: '1.05rem' }}>
            Complete your delivery address and payment details
          </p>
        </div>
        <div className="d-flex gap-2 fw-semibold small" style={{ color: '#cbd5e1' }}>
          <span>Cart</span> → <span className="fw-extrabold text-warning">Checkout</span> → <span>Confirmation</span>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-4 fw-bold">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-7">
            {/* Shipping Address Card */}
            <div className="glass-card p-4 mb-4">
              <h5 className="fw-bold text-white mb-4 fs-5">📦 Delivery Shipping Address</h5>
              
              <div className="mb-3">
                <label className="form-label text-white fw-bold small">Street Address</label>
                <input className="form-control" placeholder="123 Main St, Apartment / Suite" required value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
              </div>

              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white fw-bold small">City</label>
                  <input className="form-control" placeholder="Mumbai, Bengaluru..." required value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white fw-bold small">Postal ZIP Code</label>
                  <input className="form-control" placeholder="400001" required value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="form-label text-white fw-bold small">Country</label>
                <input className="form-control" required value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="glass-card p-4">
              <h5 className="fw-bold text-white mb-4 fs-5">💳 Payment Option</h5>
              
              <div className="d-flex flex-column gap-3">
                {[
                  { id: 'COD', title: 'Cash on Delivery (COD)', desc: 'Pay with cash upon package delivery' },
                  { id: 'UPI', title: 'UPI Instant Payment', desc: 'Google Pay, PhonePe, Paytm or BHIM UPI' },
                  { id: 'Card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay cards accepted' }
                ].map(m => (
                  <div key={m.id} className={`glass-card p-3 cursor-pointer ${paymentMethod === m.id ? 'border-primary' : ''}`} style={{ background: paymentMethod === m.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent' }}>
                    <div className="form-check d-flex align-items-center gap-3 mb-0">
                      <input className="form-check-input mt-0" type="radio" name="payment" id={m.id} value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} />
                      <label className="form-check-label w-100 cursor-pointer" htmlFor={m.id}>
                        <div className="fw-bold text-white fs-6">{m.title}</div>
                        <div className="small fw-medium" style={{ color: '#cbd5e1' }}>{m.desc}</div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="col-lg-5">
            <div className="glass-card p-4 sticky-top" style={{ top: 90 }}>
              <h5 className="fw-bold text-white mb-3 fs-5">Order Items ({cart.items.length})</h5>
              
              <div className="d-flex flex-column gap-2 mb-3 max-h-60 overflow-auto pe-1" style={{ maxHeight: 220 }}>
                {cart.items.map(i => {
                  const p = i.product;
                  if (!p) return null;
                  const price = p?.discountPercent > 0 ? p.price * (1 - p.discountPercent / 100) : p?.price || 0;
                  return (
                    <div key={i._id} className="d-flex justify-content-between align-items-center small py-2 border-bottom border-secondary border-opacity-25">
                      <div className="text-white fw-semibold text-truncate pe-2" style={{ maxWidth: 200 }}>
                        {p?.name} <span className="text-warning fw-bold">× {i.quantity}</span>
                      </div>
                      <div className="fw-bold text-warning fs-6">₹{(price * i.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    </div>
                  );
                })}
              </div>

              <hr className="border-secondary border-opacity-25" />

              <div className="d-flex justify-content-between fw-semibold small mb-2" style={{ color: '#cbd5e1' }}>
                <span>Subtotal</span>
                <span className="text-white fw-bold">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="d-flex justify-content-between fw-semibold small mb-2" style={{ color: '#cbd5e1' }}>
                <span>Express Shipping</span>
                <span className={shippingCost === 0 ? 'text-success fw-bold' : 'text-white fw-bold'}>
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <hr className="border-secondary border-opacity-25 my-3" />

              <div className="d-flex justify-content-between fw-extrabold fs-4 text-white mb-4">
                <span>Total Payable</span>
                <span className="gradient-gold">₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <button type="submit" className="btn btn-gradient btn-lg w-100 py-3 fw-bold fs-6" disabled={loading}>
                {loading ? 'Placing Your Order...' : '🔒 Confirm & Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
