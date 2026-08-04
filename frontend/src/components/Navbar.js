import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-navbar sticky-top px-3 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-extrabold fs-4 me-4" to="/">
          <span style={{ fontSize: '1.6rem' }}>🛍️</span>
          <span className="gradient-text fw-bold">Shop<span className="text-warning">ix</span></span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3 text-light opacity-75 opacity-100-hover" to="/products">
                ✨ Explore Products
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {user && (
              <Link to="/cart" className="btn btn-outline-glass position-relative px-3 py-1">
                🛒 <span className="d-none d-sm-inline ms-1">Cart</span>
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link className="btn btn-gold btn-sm px-3" to="/admin">
                    ⚙️ Admin
                  </Link>
                )}
                <Link className="btn btn-outline-glass btn-sm px-3" to="/orders">
                  📦 Orders
                </Link>
                <Link className="btn btn-outline-glass btn-sm px-3" to="/profile">
                  👤 {user.name}
                </Link>
                <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-glass btn-sm px-4" to="/login">
                  Sign In
                </Link>
                <Link className="btn btn-gradient btn-sm px-4" to="/register">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
