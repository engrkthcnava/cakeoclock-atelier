import os
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for React frontend (Port 3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

DB_FILE = 'cakeoclockatelier_reservations.db'

def init_db():
    """Initializes the SQLite database and sets up the strict schema parameters."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Create the reservations table with your brand-new logistics columns
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            delivery_date TEXT NOT NULL,
            schedule TEXT NOT NULL,
            order_items TEXT NOT NULL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()
    print("✨ Cake o' Clock Atelier Database initialized successfully with logistics columns!")

@app.route('/api/inquiry', methods=['POST'])
def handle_inquiry():
    try:
        data = request.json
        if not data:
            return jsonify({"success": False, "error": "Missing payload data"}), 400

        # Extract values matching the keys sent by your React OrderDrawer.js
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address')
        delivery_date = data.get('deliveryDate')
        schedule = data.get('schedule')
        notes = data.get('notes', '')
        orders = data.get('orders', [])

        # Validate required fields
        if not all([name, email, phone, address, delivery_date, schedule]):
            return jsonify({"success": False, "error": "Missing required checkout fields"}), 400

        if not orders:
            return jsonify({"success": False, "error": "Your basket is empty!"}), 400

        # Format the items array into a clean string (e.g., "2x Premium Brookies, 1x Fudgy Brownies")
        order_summary = ", ".join([f"{item['qty']}x {item['name']}" for item in orders])

        # Write to the local SQLite database
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reservations (name, email, phone, address, delivery_date, schedule, order_items, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, email, phone, address, delivery_date, schedule, order_summary, notes))
        
        conn.commit()
        conn.close()

        print(f"🎉 New Order Secured! {name} ordered {order_summary} for delivery on {delivery_date} ({schedule}).")
        return jsonify({"success": True, "message": "Reservation secured in the drop box!"}), 201

    except Exception as e:
        print(f"❌ Server Error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server processing failure."}), 500

# Admin route so you can quickly preview your database orders in the terminal
@app.route('/api/admin/orders', methods=['GET'])
def get_orders():
    try:
        conn = sqlite3.connect(DB_FILE)
        conn.row_factory = sqlite3.Row  # Enables fetching rows as dictionaries
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM reservations ORDER BY created_at DESC')
        rows = cursor.fetchall()
        conn.close()

        orders_list = [dict(row) for row in rows]
        return jsonify({"success": True, "orders": orders_list}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # Force database schema setup check on run
    init_db()
    # Run the server on Port 5000
    app.run(port=5000, debug=True)