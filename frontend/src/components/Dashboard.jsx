import React, { useState, useEffect } from 'react';
import { getDashboard } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboard();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>📊 Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>{stats.totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <h3>${stats.totalRevenue.toFixed(2)}</h3>
          <p>Total Revenue</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📥</div>
          <h3>{stats.statusCounts.RECEIVED}</h3>
          <p>Received</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <h3>{stats.statusCounts.PROCESSING}</h3>
          <p>Processing</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <h3>{stats.statusCounts.READY}</h3>
          <p>Ready</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <h3>{stats.statusCounts.DELIVERED}</h3>
          <p>Delivered</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
