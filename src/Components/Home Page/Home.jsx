import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home">
      <header>
        <h2 className="logo">Logo</h2>
        <button className="menu-icon" onClick={toggleSidebar}>
          ☰
        </button>
        <nav className="navigation">
          <button onClick={() => {}}>Home</button>
          <button onClick={() => {}}>About</button>
          <button onClick={() => {}}>Services</button>
          <button onClick={() => {}}>Contact</button>
        </nav>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <ul>
         <li><button onClick={() => navigate('/dashboard')}>Dashboard</button></li>
         <li><button onClick={() => navigate('/profile')}>Go to Profile</button></li>

          <li><button onClick={() => {}}>Settings </button></li>
          <li><button onClick={() => {}}>Logout</button></li>
        </ul>
      </div>

      <main>
        <h1>Welcome</h1>
      </main>
      
      <footer className="fixed-footer">
        <p>© 2025 MyCompany. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
