import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 
import './AdminDashboard.css'; 

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching reservations:', error.message);
    else setOrders(data || []);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(`Login Failed: ${error.message}`);
  };

  const handleLogout = () => supabase.auth.signOut();

  const toggleFulfillment = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    const { error } = await supabase
      .from('reservations')
      .update({ status: nextStatus })
      .eq('id', orderId);

    if (error) {
      alert('Failed to update status tracking');
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const completedOrders = orders.filter(o => o.status === 'completed');

  // VIEW A: THE SECURE LOGIN SCREEN CARD
  if (!user) {
    return (
      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-card">
          <div className="login-brand-header">
            <h2>☕ Bean 'n Bite</h2>
            <p>Bakehouse Owner Portal</p>
          </div>
          <div className="input-group">
            <input 
              type="email" placeholder="Bakehouse Email" required
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" placeholder="Access Code" required
              value={password} onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="login-submit-btn">Unlock Workspace</button>
        </form>
      </div>
    );
  }

  // VIEW B: MANAGEMENT WORKSPACE
  return (
    <div className="admin-dashboard-wrapper">
      <header className="admin-header">
        <div className="header-brand-group">
          <h1>Batch Registry</h1>
          <p className="header-subtitle">Live Reservation Management Matrix</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Exit Session</button>
      </header>

      {/* METRIC TRACKING BAR */}
      <section className="metrics-grid">
        <div className="metric-box pending-box">
          <span className="metric-label">Active Trays</span>
          <h3 className="metric-count">{pendingOrders.length}</h3>
        </div>
        <div className="metric-box completed-box">
          <span className="metric-label">Dispatched Bites</span>
          <h3 className="metric-count">{completedOrders.length}</h3>
        </div>
        <div className="metric-box total-box">
          <span className="metric-label">Total Lifetime Batches</span>
          <h3 className="metric-count">{orders.length}</h3>
        </div>
      </section>

      {loading ? (
        <div className="loading-state">
          <span className="spinner-icon">🧁</span> 
          <p>Syncing cloud ledger matrix...</p>
        </div>
      ) : (
        <div className="tables-split-layout">
          
          {/* COLUMN 1: ACTIVE PENDING BAKES */}
          <div className="dashboard-section section-pending">
            <h2 className="section-title"><span className="title-icon">🍪</span> Fresh Out the Oven ({pendingOrders.length})</h2>
            {pendingOrders.length === 0 ? (
              <div className="empty-notice-box">
                <p>✨ All baking trays are clean and fulfilled!</p>
              </div>
            ) : (
              <div className="cards-stack">
                {pendingOrders.map(order => (
                  <div key={order.id} className="order-row-card card-pending">
                    <div className="order-details">
                      <div className="order-row-header">
                        <h4>{order.name}</h4>
                        <span className="phone-sub">{order.phone}</span>
                      </div>
                      <p className="items-text"><strong>Batch:</strong> {order.order_items}</p>
                      <p className="meta-text">📍 {order.address} • 📅 {order.delivery_date} ({order.schedule})</p>
                      {order.notes && <p className="notes-text">✨ <em>"{order.notes}"</em></p>}
                    </div>
                    <div className="order-actions">
                      <button className="done-btn" onClick={() => toggleFulfillment(order.id, order.status)}>
                        Ready to Ship
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* COLUMN 2: ARCHIVED FULFILLED ORDERS */}
          <div className="dashboard-section section-completed">
            <h2 className="section-title"><span className="title-icon">✨</span> Dispatched & Shared ({completedOrders.length})</h2>
            {completedOrders.length === 0 ? (
              <div className="empty-notice-box">
                <p>No processed orders recorded for this drop season.</p>
              </div>
            ) : (
              <div className="cards-stack">
                {completedOrders.map(order => (
                  <div key={order.id} className="order-row-card card-completed">
                    <div className="order-details status-dimmed">
                      <div className="order-row-header">
                        <h4>{order.name}</h4>
                      </div>
                      <p className="items-text">✓ {order.order_items}</p>
                      <p className="meta-text">Delivered to: {order.address}</p>
                    </div>
                    <div className="order-actions">
                      <button className="revert-btn" onClick={() => toggleFulfillment(order.id, order.status)}>
                        Return to Oven
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}