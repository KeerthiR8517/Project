import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home Page/Home'; // Path to your Home component
import Dashboard from './Components/dashboard/dashboard'; // Path to your Dashboard component
import Profile from './Components/Profile/Profile'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the login/signup page as the root route */}
        <Route path="/" element={<LoginSignup />} /> 

        {/* Use a unique path for the Home component */}
        <Route path="/home" element={<Home />} />

        {/* Define the dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
