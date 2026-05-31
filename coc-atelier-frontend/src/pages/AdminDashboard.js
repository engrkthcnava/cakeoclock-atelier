import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Uses your phone wire file to pull data
import './AdminDashboard.css'; // Adds the clean visual styles

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Checks if you are already logged in when the page loads
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  // Fetch your live reservations from the cloud database
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

  // Moves orders back and forth between 'pending' and 'completed' when you click them
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
            <h2>🐾 Cake o' Clock Atelier Owner Portal</h2>
          <p>Please log in to manage active production trays.</p>
          <input 
            type="email" placeholder="Owner Email" required
            value={email} onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  // VIEW B: THE REAL MANAGEMENT TRAYS & COUNTERS
  return (
    <div className="admin-dashboard-wrapper">
      <header className="admin-header">
        <h1>Dashboard Control Panel</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </header>

      {/* THREE LIVE METRIC TRACKING CARDS */}
      <section className="metrics-grid">
        <div className="metric-box alert">
          <h3>{pendingOrders.length}</h3>
          <p>Pending Bakes</p>
        </div>
        <div className="metric-box success">
          <h3>{completedOrders.length}</h3>
          <p>Fulfilled Requests</p>
        </div>
        <div className="metric-box total">
          <h3>{orders.length}</h3>
          <p>Total Lifespan Inquiries</p>
        </div>
      </section>

      {loading ? <p>Syncing cloud ledger matrix...</p> : (
        <div className="tables-split-layout">
          
          {/* COLUMN 1: ACTIVE PENDING BAKES */}
          <div className="dashboard-section">
            <h2 className="section-title pending-title">⏳ Pending Pre-Orders ({pendingOrders.length})</h2>
            {pendingOrders.length === 0 ? <p className="empty-notice">No pending orders to bake!</p> : (
              pendingOrders.map(order => (
                <div key={order.id} className="order-row-card card-pending">
                  <div className="order-details">
                    <h4>{order.name} (<span className="phone-sub">{order.phone}</span>)</h4>
                    <p className="items-text"><strong>Items:</strong> {order.order_items}</p>
                    <p className="meta-text">📍 {order.address} | 📅 {order.delivery_date} ({order.schedule})</p>
                    {order.notes && <p className="notes-text">💬 <em>"{order.notes}"</em></p>}
                  </div>
                  <div className="order-actions">
                    <button className="done-btn" onClick={() => toggleFulfillment(order.id, order.status)} style={{ background: '#4caf50', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                      Mark Done
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* COLUMN 2: ARCHIVED FULFILLED ORDERS */}
          <div className="dashboard-section">
            <h2 className="section-title completed-title">✅ Completed & Dispatched ({completedOrders.length})</h2>
            {completedOrders.length === 0 ? <p className="empty-notice">No historical orders processed yet.</p> : (
              completedOrders.map(order => (
                <div key={order.id} className="order-row-card card-completed">
                  <div className="order-details status-dimmed">
                    <h4>{order.name}</h4>
                    <p className="items-text">✔️ {order.order_items}</p>
                    <p className="meta-text">Delivered to: {order.address}</p>
                  </div>
                  <div className="order-actions">
                    <button className="revert-btn" onClick={() => toggleFulfillment(order.id, order.status)}>
                      ↩️ Move Back
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}
    </div>
  );
}