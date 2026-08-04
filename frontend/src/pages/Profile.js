import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ 
    name: user?.name || '', 
    address: { 
      street: user?.address?.street || '', 
      city: user?.address?.city || '', 
      zip: user?.address?.zip || '', 
      country: user?.address?.country || 'India' 
    } 
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', form);
      setUser(data);
      setMsg('✓ Profile details updated successfully!');
    } catch (err) { 
      setMsg(err.response?.data?.message || 'Error updating profile'); 
    } finally {
      setLoading(false);
    }
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="container py-4" style={{ maxWidth: 840 }}>
      {/* Header Banner */}
      <div className="glass-card p-4 p-md-5 mb-4 position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.15) 100%)'
      }}>
        <div className="d-flex align-items-center gap-4 flex-wrap">
          {/* Avatar Circle */}
          <div 
            className="d-flex align-items-center justify-content-center fw-extrabold text-white shadow-lg"
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              fontSize: '2.4rem',
              border: '3px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {initial}
          </div>

          {/* User Details Headline */}
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <h2 className="fw-extrabold text-white mb-0">{user?.name || 'Account Holder'}</h2>
              <span className="badge badge-glass px-3 py-1">{user?.role || 'CUSTOMER'}</span>
            </div>
            <p className="mb-0 text-white" style={{ opacity: 0.9, fontSize: '1.05rem' }}>
              📧 {user?.email}
            </p>
            <div className="mt-2 small text-warning fw-semibold">
              ✨ Shopix VIP Member · Verified Account
            </div>
          </div>

          {/* Shortcuts */}
          <div className="d-flex gap-2">
            <Link to="/orders" className="btn btn-outline-glass btn-sm px-3">
              📦 My Orders
            </Link>
            <Link to="/cart" className="btn btn-outline-glass btn-sm px-3">
              🛒 My Cart
            </Link>
          </div>
        </div>
      </div>

      {msg && (
        <div className={`alert ${msg.includes('✓') ? 'alert-success border-success' : 'alert-danger'} mb-4 fw-bold shadow-sm`}>
          {msg}
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Personal Info Card */}
          <div className="col-12">
            <div className="glass-card p-4">
              <h5 className="fw-bold text-white mb-4 fs-5 d-flex align-items-center gap-2">
                <span>👤</span> Personal Details
              </h5>

              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white fw-bold small">Full Name</label>
                  <input 
                    type="text"
                    className="form-control text-white" 
                    required
                    value={form.name} 
                    onChange={e => setForm({ ...form, name: e.target.value })} 
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label text-white fw-bold small">Email Address (Registered)</label>
                  <div className="input-group">
                    <input 
                      type="email"
                      className="form-control text-white" 
                      value={user?.email || ''} 
                      disabled 
                      style={{ background: 'rgba(255, 255, 255, 0.05)', cursor: 'not-allowed' }}
                    />
                    <span className="input-group-text text-success bg-dark border-secondary border-opacity-25 fw-bold">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="col-12">
            <div className="glass-card p-4">
              <h5 className="fw-bold text-white mb-4 fs-5 d-flex align-items-center gap-2">
                <span>🏠</span> Default Shipping Address
              </h5>

              <div className="mb-3">
                <label className="form-label text-white fw-bold small">Street Address</label>
                <input 
                  type="text"
                  className="form-control text-white" 
                  placeholder="House No., Street name, Apartment / Landmark"
                  value={form.address.street} 
                  onChange={e => setForm({ ...form, address: { ...form.address, street: e.target.value } })} 
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-white fw-bold small">City</label>
                  <input 
                    type="text"
                    className="form-control text-white" 
                    placeholder="Mumbai, Salem, Bengaluru..."
                    value={form.address.city} 
                    onChange={e => setForm({ ...form, address: { ...form.address, city: e.target.value } })} 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white fw-bold small">Postal ZIP Code</label>
                  <input 
                    type="text"
                    className="form-control text-white" 
                    placeholder="636016"
                    value={form.address.zip} 
                    onChange={e => setForm({ ...form, address: { ...form.address, zip: e.target.value } })} 
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label text-white fw-bold small">Country</label>
                <input 
                  type="text"
                  className="form-control text-white" 
                  placeholder="India"
                  value={form.address.country} 
                  onChange={e => setForm({ ...form, address: { ...form.address, country: e.target.value } })} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-gradient btn-lg px-5 py-3 fw-bold fs-6 shadow" disabled={loading}>
            {loading ? 'Saving Changes...' : '💾 Update Profile Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
