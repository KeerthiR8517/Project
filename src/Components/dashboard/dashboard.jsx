import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');

  // Set greeting message based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h2 className="dashboard-logo">Dashboard</h2>
      </header>

      <main>
        <h1>{greeting}, Welcome to your Dashboard!</h1>
        <p>Here you can manage your data, view analytics, and perform various administrative tasks.</p>
      </main>

      <footer className="fixed-footer">
        <p>© 2025 MyCompany. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
