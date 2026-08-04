import { useState, useEffect } from 'react';
import api from '../api/axios';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLORS = { Pending: 'warning', Processing: 'info', Shipped: 'primary', Delivered: 'success', Cancelled: 'danger' };

export default function Admin() {
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', discountPercent: 0, category: '', brand: '', stock: '', images: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { api.get('/admin/stats').then(r => setStats(r.data)); }, []);

  const loadOrders = () => api.get('/admin/orders').then(r => setOrders(r.data));
  const loadUsers = () => api.get('/admin/users').then(r => setUsers(r.data));
  const loadProducts = () => api.get('/products?limit=100').then(r => setProducts(r.data.products));

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}/status`, { status });
    loadOrders();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user account?')) return;
    await api.delete(`/admin/users/${id}`);
    loadUsers();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product item?')) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const saveProduct = async e => {
    e.preventDefault();
    setMsg('');
    const payload = { ...form, price: +form.price, discountPercent: +form.discountPercent, stock: +form.stock, images: form.images ? [form.images] : [] };
    try {
      if (editId) await api.put(`/products/${editId}`, payload);
      else await api.post('/products', payload);
      setMsg(editId ? 'Product updated successfully!' : 'New product created!');
      setForm({ name: '', description: '', price: '', discountPercent: 0, category: '', brand: '', stock: '', images: '' });
      setEditId(null);
      loadProducts();
    } catch (err) { setMsg(err.response?.data?.message || 'Error saving product'); }
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setForm({ name: p.name, description: p.description, price: p.price, discountPercent: p.discountPercent, category: p.category, brand: p.brand || '', stock: p.stock, images: p.images?.[0] || '' });
    setTab('products');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-light mb-1">⚙️ Admin Control Panel</h2>
          <p className="text-muted small mb-0">Overview metrics, inventory catalog, customer orders & user roles</p>
        </div>
      </div>

      {/* Stats Metric Cards Grid */}
      <div className="row g-4 mb-4">
        {[
          ['👥 Total Users', stats.users, 'text-info'], 
          ['📦 Active Products', stats.products, 'text-primary'], 
          ['🧾 Orders Placed', stats.orders, 'text-warning'], 
          ['💰 Total Revenue', `₹${(stats.revenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 'gradient-gold']
        ].map(([label, val, colorClass]) => (
          <div className="col-6 col-lg-3" key={label}>
            <div className="glass-card p-4 text-center hover-lift">
              <div className="text-muted small mb-1">{label}</div>
              <h3 className={`fw-extrabold mb-0 ${colorClass}`}>{val ?? '...'}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Pills */}
      <div className="d-flex gap-2 mb-4 overflow-auto pb-2">
        {[
          ['stats', '📊 Overview'], 
          ['products', '📦 Products'], 
          ['orders', '🧾 Orders'], 
          ['users', '👥 Users']
        ].map(([key, label]) => (
          <button 
            key={key}
            className={`btn ${tab === key ? 'btn-gradient' : 'btn-outline-glass'} px-4 py-2 fw-semibold`} 
            onClick={() => { setTab(key); if (key === 'orders') loadOrders(); if (key === 'users') loadUsers(); if (key === 'products') loadProducts(); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === 'products' && (
        <>
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold text-light mb-3">{editId ? '✏️ Edit Product' : '➕ Add New Product'}</h5>
            {msg && <div className="alert alert-info py-2 small mb-3">{msg}</div>}
            
            <form onSubmit={saveProduct}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input className="form-control" placeholder="Product Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" placeholder="Brand Name (e.g. Apple)" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <input className="form-control" placeholder="Category (e.g. Electronics)" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                </div>

                <div className="col-md-4">
                  <input type="number" className="form-control" placeholder="Price in ₹" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <input type="number" className="form-control" placeholder="Discount %" value={form.discountPercent} onChange={e => setForm({ ...form, discountPercent: e.target.value })} />
                </div>
                <div className="col-md-4">
                  <input type="number" className="form-control" placeholder="Stock Units" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                </div>

                <div className="col-12">
                  <input className="form-control" placeholder="Image URL (e.g. https://...)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
                </div>

                <div className="col-12">
                  <textarea className="form-control" placeholder="Product Description..." required rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>

                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-gradient px-4">{editId ? 'Update Product' : 'Add Product'}</button>
                  {editId && (
                    <button type="button" className="btn btn-outline-glass px-4" onClick={() => { setEditId(null); setForm({ name: '', description: '', price: '', discountPercent: 0, category: '', brand: '', stock: '', images: '' }); }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="glass-card p-3 overflow-hidden">
            <div className="table-responsive">
              <table className="table table-dark-custom align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id}>
                      <td className="fw-semibold text-light">{p.name}</td>
                      <td><span className="badge badge-glass">{p.category}</span></td>
                      <td className="fw-bold text-warning">₹{Number(p.price).toLocaleString('en-IN')}</td>
                      <td>{p.discountPercent > 0 ? <span className="badge badge-discount">{p.discountPercent}%</span> : '-'}</td>
                      <td><span className={p.stock > 0 ? 'text-success' : 'text-danger'}>{p.stock} units</span></td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-glass me-2" onClick={() => startEdit(p)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(p._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div className="glass-card p-3 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-dark-custom align-middle mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id}>
                    <td className="fw-bold text-light">#{o._id.slice(-8).toUpperCase()}</td>
                    <td>
                      <div className="text-light">{o.user?.name || 'Customer'}</div>
                      <div className="text-muted small">{o.user?.email}</div>
                    </td>
                    <td className="small text-muted">{o.items.map(i => i.name).join(', ')}</td>
                    <td className="fw-bold text-warning">₹{o.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td>
                      <select className="form-select form-select-sm" value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="small text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="glass-card p-3 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-dark-custom align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td className="fw-semibold text-light">{u.name}</td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className={`badge ${u.role === 'ADMIN' ? 'bg-warning text-dark' : 'badge-glass'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="small text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="text-end">
                      {u.role !== 'ADMIN' && (
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u._id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
