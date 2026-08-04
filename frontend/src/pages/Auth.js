import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { 
      await login(form.email, form.password); 
      navigate('/'); 
    } catch (err) { 
      setError(err.response?.data?.message || 'Invalid email or password'); 
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (email, password) => {
    setForm({ email, password });
  };

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="glass-card p-4 p-md-5 shadow-lg position-relative overflow-hidden">
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3 shadow" style={{ width: 60, height: 60, fontSize: '1.8rem' }}>
            🛍️
          </div>
          <h3 className="fw-extrabold text-white mb-1">Welcome Back 👋</h3>
          <p className="small mb-0" style={{ color: '#cbd5e1' }}>
            Sign in to access your orders, cart, and account settings
          </p>
        </div>

        {error && <div className="alert alert-danger fw-bold small py-2 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white fw-bold small">📧 Email Address</label>
            <input 
              type="email" 
              className="form-control text-white" 
              placeholder="name@example.com"
              required 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label text-white fw-bold small mb-0">🔒 Password</label>
            </div>
            <input 
              type="password" 
              className="form-control text-white" 
              placeholder="Enter your password"
              required 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          <button type="submit" className="btn btn-gradient btn-lg w-100 py-3 fw-bold fs-6 shadow mb-3" disabled={loading}>
            {loading ? 'Signing In...' : '🔑 Sign In to Your Account'}
          </button>
        </form>

        {/* Quick Demo Credentials Box */}
        <div className="p-3 mb-4 rounded" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="text-warning fw-bold small mb-2 text-center">⚡ Quick Test Demo Logins:</div>
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline-glass btn-sm flex-fill py-1 small fw-bold"
              onClick={() => handleDemoFill('admin@shopez.com', 'admin123')}
            >
              👑 Admin Demo
            </button>
            <button 
              type="button" 
              className="btn btn-outline-glass btn-sm flex-fill py-1 small fw-bold"
              onClick={() => handleDemoFill('customer@shopez.com', 'customer123')}
            >
              👤 Customer Demo
            </button>
          </div>
        </div>

        <div className="text-center pt-2 border-top border-secondary border-opacity-25">
          <span style={{ color: '#cbd5e1' }} className="small">New to Shopix? </span>
          <Link to="/register" className="fw-bold text-warning text-decoration-none small">
            Create an account →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try { 
      await register(form.name, form.email, form.password); 
      navigate('/'); 
    } catch (err) { 
      setError(err.response?.data?.message || 'Registration failed'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="glass-card p-4 p-md-5 shadow-lg position-relative overflow-hidden">
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3 shadow" style={{ width: 60, height: 60, fontSize: '1.8rem' }}>
            🛍️
          </div>
          <h3 className="fw-extrabold text-white mb-1">Create Account ✨</h3>
          <p className="small mb-0" style={{ color: '#cbd5e1' }}>
            Join Shopix for express shipping, order tracking, & exclusive perks
          </p>
        </div>

        {error && <div className="alert alert-danger fw-bold small py-2 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white fw-bold small">👤 Full Name</label>
            <input 
              type="text" 
              className="form-control text-white" 
              placeholder="e.g. Sarukesh"
              required 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white fw-bold small">📧 Email Address</label>
            <input 
              type="email" 
              className="form-control text-white" 
              placeholder="name@example.com"
              required 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white fw-bold small">🔒 Password (min 6 chars)</label>
            <input 
              type="password" 
              className="form-control text-white" 
              placeholder="Create a strong password"
              required 
              minLength={6} 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          <button type="submit" className="btn btn-gradient btn-lg w-100 py-3 fw-bold fs-6 shadow mb-3" disabled={loading}>
            {loading ? 'Creating Account...' : '✨ Create Free Account'}
          </button>
        </form>

        <div className="text-center pt-3 border-top border-secondary border-opacity-25">
          <span style={{ color: '#cbd5e1' }} className="small">Already have an account? </span>
          <Link to="/login" className="fw-bold text-warning text-decoration-none small">
            Sign in here →
          </Link>
        </div>
      </div>
    </div>
  );
}
