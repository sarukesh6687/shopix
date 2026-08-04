import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-5 border-top border-secondary border-opacity-25 pt-5 pb-4" style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(16px)' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="gradient-text fw-bold mb-3 fs-4 d-flex align-items-center gap-2">
              <span>🛍️</span> Shopix
            </h5>
            <p className="pe-lg-4 text-light-slate" style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '0.95rem' }}>
              Your premier destination for high-quality electronics, fashion, and lifestyle products. Fast delivery across India, 100% authentic items, and 24/7 customer care.
            </p>
            
            {/* Payment methods */}
            <div className="d-flex gap-3 align-items-center mt-3 pt-2 fs-6 fw-semibold" style={{ color: '#e2e8f0' }}>
              <span className="badge bg-dark border border-secondary px-3 py-2">💳 Visa</span>
              <span className="badge bg-dark border border-secondary px-3 py-2">💳 Mastercard</span>
              <span className="badge bg-dark border border-secondary px-3 py-2">📱 UPI</span>
              <span className="badge bg-dark border border-secondary px-3 py-2">💵 COD</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-warning fw-bold mb-3 text-uppercase tracking-wider fs-6">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.95rem' }}>
              <li><Link to="/products" className="footer-link">✨ All Products</Link></li>
              <li><Link to="/products?category=Electronics" className="footer-link">⚡ Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="footer-link">👗 Fashion</Link></li>
              <li><Link to="/products?category=Home%20%26%20Living" className="footer-link">🏡 Home & Living</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-warning fw-bold mb-3 text-uppercase tracking-wider fs-6">Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.95rem' }}>
              <li><Link to="/orders" className="footer-link">📦 Track Orders</Link></li>
              <li><span className="footer-link cursor-pointer">🔄 Return Policy</span></li>
              <li><span className="footer-link cursor-pointer">📜 Terms of Service</span></li>
              <li><span className="footer-link cursor-pointer">🛡️ Privacy Policy</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-warning fw-bold mb-3 text-uppercase tracking-wider fs-6">Stay Updated</h6>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
              Subscribe to unlock special offers, flash discount codes, and once-in-a-lifetime deals.
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control text-white" 
                placeholder="Enter your email address..." 
                style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
              />
              <button className="btn btn-gradient px-4 fw-bold" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <hr className="border-secondary border-opacity-25 my-4" />

        <div className="d-flex flex-wrap justify-content-between align-items-center text-light-slate" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <p className="mb-0">© {new Date().getFullYear()} <strong className="text-light">Shopix Inc</strong>. All rights reserved.</p>
          <p className="mb-0">Crafted with ❤️ for an extraordinary shopping experience.</p>
        </div>
      </div>
    </footer>
  );
}
