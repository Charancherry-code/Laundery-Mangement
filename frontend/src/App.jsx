import React, { useState } from 'react';
import OrderForm from './components/OrderForm.jsx';
import OrdersList from './components/OrdersList.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="container">
      <div className="header">
        <h1>Laundry Order Management System</h1>
        <div className="nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={activeTab === 'new-order' ? 'active' : ''} 
            onClick={() => setActiveTab('new-order')}
          >
            New Order
          </button>
        </div>
      </div>

      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'orders' && <OrdersList />}
      {activeTab === 'new-order' && <OrderForm />}
    </div>
  );
}

export default App;
