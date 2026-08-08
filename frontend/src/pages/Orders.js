import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const STATUS_COLORS = { 
  Pending: 'warning', 
  Processing: 'info', 
  Shipped: 'primary', 
  Delivered: 'success', 
  Cancelled: 'danger' 
};

/* Flipkart-style Order Tracker Component */
export function OrderTracker({ order }) {
  if (!order) return null;

  if (order.status === 'Cancelled') {
    return (
      <div className="glass-card p-4 mb-4 border-danger" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
        <div className="d-flex align-items-center gap-3">
          <span className="fs-3">❌</span>
          <div>
            <h5 className="fw-bold text-danger mb-1">Order Cancelled</h5>
            <p className="text-white mb-0 fw-medium" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>
              This order was cancelled on {new Date(order.updatedAt || order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}. If paid online, a full refund will be credited to your payment method.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const created = new Date(order.createdAt);
  const formatDate = (daysToAdd) => {
    const d = new Date(created.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  let fillPercent = '25%';
  let step1State = 'done', step2State = 'active', step3State = 'pending', step4State = 'pending';
  let trackingHeadline = `🚚 Preparing for Dispatch · Expected Delivery by ${formatDate(3)}`;

  if (order.status === 'Shipped') {
    fillPercent = '66%';
    step1State = 'done';
    step2State = 'done';
    step3State = 'active';
    step4State = 'pending';
    trackingHeadline = `🛵 Out for Delivery Soon · Expected by ${formatDate(3)}`;
  } else if (order.status === 'Delivered') {
    fillPercent = '100%';
    step1State = 'done';
    step2State = 'done';
    step3State = 'done';
    step4State = 'done';
    trackingHeadline = `🎉 Package Delivered on ${formatDate(3)}`;
  }

  const awbCode = `SPX${order._id.slice(-8).toUpperCase()}`;

  return (
    <div className="order-tracker-container mb-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
        <div>
          <h5 className="fw-bold text-white mb-1">📍 Live Order Tracking</h5>
          <p className="text-warning fw-semibold mb-0 small">{trackingHeadline}</p>
        </div>
        <div className="text-end">
          <span className="badge badge-glass">Courier: Shopix Express</span>
          <div className="fw-bold mt-1 text-white" style={{ fontSize: '0.9rem', color: '#ffffff', opacity: 1 }}>
            AWB Tracking ID: <strong className="text-warning fs-6 ms-1" style={{ letterSpacing: '0.5px' }}>{awbCode}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Progress Bar & Steps */}
      <div className="position-relative py-2">
        <div className="tracker-steps-wrapper">
          <div className="tracker-progress-bg-line" />
          <div className="tracker-progress-fill-line" style={{ width: fillPercent }} />

          {/* Step 1: Confirmed */}
          <div className="tracker-step-node">
            <div className={`tracker-node-circle ${step1State}`}>
              {step1State === 'done' ? '✓' : '📝'}
            </div>
            <div className="tracker-node-title">Order Placed</div>
            <div className="tracker-node-date text-white fw-bold">{formatDate(0)}</div>
          </div>

          {/* Step 2: Shipped */}
          <div className="tracker-step-node">
            <div className={`tracker-node-circle ${step2State}`}>
              {step2State === 'done' ? '✓' : step2State === 'active' ? '🚚' : '📦'}
            </div>
            <div className="tracker-node-title">Dispatched</div>
            <div className="tracker-node-date text-white fw-bold">{formatDate(1)}</div>
          </div>

          {/* Step 3: Out for Delivery */}
          <div className="tracker-step-node">
            <div className={`tracker-node-circle ${step3State}`}>
              {step3State === 'done' ? '✓' : step3State === 'active' ? '🛵' : '🛵'}
            </div>
            <div className="tracker-node-title">Out For Delivery</div>
            <div className="tracker-node-date text-white fw-bold">{formatDate(2)}</div>
          </div>

          {/* Step 4: Delivered */}
          <div className="tracker-step-node">
            <div className={`tracker-node-circle ${step4State}`}>
              {step4State === 'done' ? '🎉' : '🏠'}
            </div>
            <div className="tracker-node-title">Delivered</div>
            <div className="tracker-node-date text-white fw-bold">{formatDate(3)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => { 
    api.get('/orders')
      .then(r => setOrders(Array.isArray(r.data) ? r.data : []))
      .catch(() => setOrders([])); 
  }, []);


  return (
    <div className="container py-4">
      <h2 className="fw-bold text-white mb-4">My Orders History</h2>
      
      {orders.length === 0 && (
        <div className="glass-card p-5 text-center my-4 max-w-lg mx-auto" style={{ maxWidth: 500 }}>
          <h4 className="text-white fw-bold mb-2">No orders placed yet</h4>
          <p className="text-white mb-4 fw-medium">Start exploring our premium product catalog to make your first purchase.</p>
          <Link to="/products" className="btn btn-gradient px-4">
            Browse Products
          </Link>
        </div>
      )}

      <div className="d-flex flex-column gap-4">
        {orders.map(o => (
          <div key={o._id} className="glass-card p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="fw-extrabold text-white fs-5">Order #{o._id.slice(-8).toUpperCase()}</span>
                  <span className={`badge bg-${STATUS_COLORS[o.status]} px-3 py-1 rounded-pill`}>{o.status}</span>
                </div>
                <div className="text-white fw-bold" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>
                  Placed on {new Date(o.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="text-end">
                <div className="fw-extrabold text-warning fs-4 me-2 d-inline-block">
                  ₹{o.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <Link to={`/orders/${o._id}`} className="btn btn-gradient btn-sm px-4">
                  Track & Details →
                </Link>
              </div>
            </div>

            {/* Quick Order Tracker Bar inside list view */}
            <OrderTracker order={o} />

            <div className="text-white fw-semibold" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>
              <strong className="text-warning me-1">Items Ordered:</strong> {o.items.map(i => `${i.name} (Qty: ${i.quantity})`).join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrderDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const success = searchParams.get('success');

  useEffect(() => { api.get(`/orders/${id}`).then(r => setOrder(r.data)); }, [id]);

  const cancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    const { data } = await api.put(`/orders/${id}/cancel`);
    setOrder(data);
  };

  if (!order) return <div className="text-center py-5 fs-5 gradient-text">Loading Order Details...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: 840 }}>
      {success && (
        <div className="glass-card p-4 mb-4 text-center border-success" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
          <h4 className="fw-bold text-success mb-2">🎉 Order Placed Successfully!</h4>
          <p className="text-white mb-0 fw-semibold">Thank you for shopping with Shopix. Track your order status below.</p>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-extrabold text-white mb-1">Order #{order._id.slice(-8).toUpperCase()}</h2>
          <p className="text-white fw-bold mb-0" style={{ fontSize: '1rem', color: '#ffffff', opacity: 1 }}>
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className={`badge bg-${STATUS_COLORS[order.status]} fs-6 px-3 py-2 rounded-pill`}>{order.status}</span>
      </div>

      {/* Flipkart-Style Order Tracking Component */}
      <OrderTracker order={order} />

      <div className="glass-card p-4 mb-4">
        <h5 className="fw-bold text-white mb-3 fs-5">Order Items</h5>
        <div className="d-flex flex-column gap-2 mb-3">
          {order.items.map((item, i) => (
            <div key={i} className="d-flex justify-content-between py-2 border-bottom border-secondary border-opacity-25 fs-6">
              <span className="text-white fw-bold">
                {item.name} <strong className="text-warning ms-2">× {item.quantity}</strong>
              </span>
              <span className="fw-extrabold text-warning">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between fw-extrabold fs-4 text-white mt-3 pt-2">
          <span>Total Paid</span>
          <span className="gradient-gold">₹{order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <h5 className="fw-bold text-white mb-2 fs-5">Shipping Details</h5>
        <p className="text-white fw-semibold mb-2" style={{ fontSize: '1rem', color: '#ffffff', opacity: 1 }}>
          📍 {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zip}, {order.shippingAddress.country}
        </p>
        {order.paymentMethod && (
          <p className="text-white fw-medium mb-0" style={{ fontSize: '0.95rem', color: '#ffffff', opacity: 1 }}>
            Payment Method: <strong className="text-warning">{order.paymentMethod}</strong>
          </p>
        )}
      </div>

      <div className="d-flex gap-3">
        <Link to="/orders" className="btn btn-outline-glass px-4">
          ← Back to Orders
        </Link>
        {['Pending', 'Processing'].includes(order.status) && (
          <button className="btn btn-outline-danger px-4" onClick={cancel}>
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
