import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 

// ==========================================================================
// PRE-ORDER ASSET REPERTOIRE (Stepping up one level to look inside /featured)
// ==========================================================================
import rvcrinkles from '../featured/Red-Velvet-Crinkles.png';
import brookies from '../featured/Brookies.png';
import brownies from '../featured/Brownies.png';
import rvcake from '../featured/Red-Velvet-Cake.png';
import chocolava from '../featured/Chocolava-Butternut.png';
import oreobanana from '../featured/Oreo-Banana-Cake.png';
import choco from '../featured/Chocolate-Cake.png';
import dcc from '../featured/Dubai-CC.png';
import chocochip from '../featured/Choco-Chip.png';
import ccWalnut from '../featured/CC-Walnut.png';
import matcha from '../featured/Matcha-Cookie.png';
import doublechoco from '../featured/Double-Choco.png';

const PRODUCT_MENU = [
  { id: 'rvcrinkles', name: 'Red Velvet Crinkles', price: 180, img: rvcrinkles },
  { id: 'brookies', name: 'Premium Brookies', price: 240, img: brookies },
  { id: 'brownies', name: 'Fudgy Brownies', price: 220, img: brownies },
  { id: 'rvcake', name: 'Red Velvet Cake with Cupcakes', price: 500, img: rvcake },
  { id: 'chocolava', name: 'Chocolava Butternut', price: 120, img: chocolava },
  { id: 'oreobanana', name: 'Oreo Banana Cake', price: 140, img: oreobanana },
  { id: 'choco', name: 'Classic Chocolate Cake', price: 350, img: choco },
  { id: 'dcc', name: 'Dubai Chewy Cookie', price: 120, img: dcc },
  
  // --- COOKIE SIZE VARIATIONS ---
  { id: 'chocochip-sweet', name: 'Choco Chip Cookie (Sweet Size - 5pcs)', price: 125, img: chocochip },
  { id: 'chocochip-best', name: 'Choco Chip Cookie (Best Size - 5pcs)', price: 189, img: chocochip },
  
  { id: 'cc-walnut-sweet', name: 'Choco Walnut Cookie (Sweet Size - 5pcs)', price: 135, img: ccWalnut },
  { id: 'cc-walnut-best', name: 'Choco Walnut Cookie (Best Size - 5pcs)', price: 189, img: ccWalnut },
  
  { id: 'matcha-sweet', name: 'Matcha Cookie (Sweet Size - 5pcs)', price: 145, img: matcha },
  { id: 'matcha-best', name: 'Matcha Cookie (Best Size - 5pcs)', price: 239, img: matcha },
  
  { id: 'doublechoco-sweet', name: 'Double Choco Cookie (Sweet Size - 5pcs)', price: 145, img: doublechoco },
  { id: 'doublechoco-best', name: 'Double Choco Cookie (Best Size - 5pcs)', price: 239, img: doublechoco },
];

function OrderDrawer({ isOpen, onClose }) {
  const [panelMode, setPanelMode] = useState('normal');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');          
  const [address, setAddress] = useState('');      
  const [deliveryDate, setDeliveryDate] = useState(''); 
  const [schedule, setSchedule] = useState('morning'); 
  const [notes, setNotes] = useState('');
  const [quantities, setQuantities] = useState({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPanelMode('normal');
    }
  }, [isOpen]);

  const isMaximized = panelMode === 'maximized';
  const isMinimized = panelMode === 'minimized';

  const toggleMaximize = () => {
    setPanelMode((prev) => (prev === 'maximized' ? 'normal' : 'maximized'));
  };

  const handleMinimize = () => {
    setPanelMode((prev) => (prev === 'minimized' ? 'normal' : 'minimized'));
  };

  const handleItemToggle = (id) => {
    setQuantities(prev => {
      const updated = { ...prev };
      if (updated[id]) delete updated[id];
      else updated[id] = 1;
      return updated;
    });
  };

  const handleQuantityChange = (id, changeValue) => {
    const currentQty = quantities[id] || 0;
    const nextQty = currentQty + changeValue;
    if (nextQty < 1) return;
    setQuantities(prev => ({ ...prev, [id]: nextQty }));
  };

  const calculatedTotal = PRODUCT_MENU.reduce((sum, item) => {
    return sum + (item.price * (quantities[item.id] || 0));
  }, 0);

  // ==========================================================================
  // DIRECT EDGE FUNCTION ROUTING MATRIX
  // ==========================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const selectedOrders = PRODUCT_MENU
      .filter(item => quantities[item.id])
      .map(item => ({ name: item.name, price: item.price, qty: quantities[item.id] }));

    if (selectedOrders.length === 0) {
      setStatus('⚠️ Please select at least one bake!');
      return;
    }

    setStatus('Saving reservation to database...');
    const orderSummaryString = selectedOrders.map(item => `${item.qty}x ${item.name}`).join(', ');

    try {
      // 1. Core Table Record Injection
      const { error: dbError } = await supabase
        .from('reservations')
        .insert([
          {
            name: name,
            email: email,
            phone: phone,
            address: address,
            delivery_date: deliveryDate,
            schedule: schedule,
            order_items: orderSummaryString,
            total_price: calculatedTotal,
            notes: notes || '',
            status: 'pending' 
          }
        ]);

      if (dbError) throw new Error(`Database Save Failed: ${dbError.message}`);

      // 2. Direct Core Engine Wake-Up Call
      setStatus('🚀 Database secured! Waking up email engine...');
      
      const response = await fetch('https://bcdtufqpjlpccittpwdj.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          record: {
            name: name,
            email: email,
            order_items: orderSummaryString,
            total_price: calculatedTotal,
            delivery_date: deliveryDate,
            schedule: schedule,
            address: address
          }
        })
      });

      let result = {};
      try { result = await response.json(); } catch (jsonErr) {}

      if (!response.ok) {
        throw new Error(`Email Engine Rejected: ${result.error || response.statusText || 'Unknown Rejection'}`);
      }

      setStatus('🎉 Order secured and email dispatched successfully!');
      
      // Clear checkout states smoothly
      setName(''); setEmail(''); setPhone(''); setAddress(''); setDeliveryDate(''); setNotes(''); setQuantities({});
      setTimeout(() => { onClose(); setStatus(''); }, 3000);

    } catch (err) {
      console.error('Pipeline Error:', err.message);
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className={`floating-cart-panel ${isOpen ? 'panel-active' : ''} ${isMaximized ? 'panel-maximized' : ''} ${isMinimized ? 'panel-minimized' : ''}`}>
      <div className="panel-header">
        <div>
          <h4>Drop Reservation</h4>
          <p>Your choices save automatically if closed</p>
        </div>
        <div className="panel-header-actions">
          <button type="button" className="panel-control-btn" onClick={handleMinimize} title={isMinimized ? 'Restore panel' : 'Minimize panel'}>
            −
          </button>
          <button type="button" className="panel-control-btn" onClick={toggleMaximize} title={isMaximized ? 'Restore panel' : 'Maximize panel'}>
            {isMaximized ? '🗗' : '🗖'}
          </button>
          <button type="button" className="close-panel-btn" onClick={onClose} title="Close panel">×</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="panel-form-body">
        <div className="panel-inputs">
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input type="text" placeholder="Complete Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          
          <div className="panel-logistic-row" style={{ display: 'flex', gap: '10px' }}>
            <input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required style={{ flex: 1 }} />
            <select value={schedule} onChange={(e) => setSchedule(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.08)', fontFamily: 'inherit' }}>
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
            </select>
          </div>
        </div>

        <div className="panel-grid">
          {PRODUCT_MENU.map((item) => {
            const isSelected = !!quantities[item.id];
            return (
              <div key={item.id} className={`panel-grid-card ${isSelected ? 'card-selected' : ''}`}>
                <div className="panel-card-clickable" onClick={() => handleItemToggle(item.id)}>
                  <div className="panel-img-wrap">
                    <img src={item.img} alt={item.name} onError={(e) => { e.target.style.display='none'; }} />
                  </div>
                  <div className="panel-card-meta">
                    <span className="p-name">{item.name}</span>
                    <span className="p-price">₱{item.price}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="panel-counter">
                    <button type="button" onClick={() => handleQuantityChange(item.id, -1)}>−</button>
                    <span>{quantities[item.id]}</span>
                    <button type="button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Allergies, packaging notes, details... (Optional)" 
          value={notes} onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <div className="panel-footer-banner">
          <div className="panel-total">
            <span>Total Basket:</span>
            <strong>₱{calculatedTotal.toLocaleString()}</strong>
          </div>
          <button type="submit" className="panel-submit-btn">Secure Drop Box</button>
        </div>
        {status && <p className="panel-status-txt">{status}</p>}
      </form>
    </div>
  );
}

export default OrderDrawer;