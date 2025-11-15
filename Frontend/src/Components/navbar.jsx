import React, { useState } from "react";
import "./Navbar.css";
import { FaUser, FaHome, FaUsers } from "react-icons/fa";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Gym Stats</h1>
      </div>

      <div className="navbar-center">
        <a 
          href="/" 
          className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
          onClick={() => setActiveLink('home')}
        >
          <FaHome className="nav-link-icon" />
          <span>Home</span>
        </a>
        <a 
          href="/users" 
          className={`nav-link ${activeLink === 'users' ? 'active' : ''}`}
          onClick={() => setActiveLink('users')}
        >
          <FaUsers className="nav-link-icon" />
          <span>Users</span>
        </a>
      </div>

      <div className="navbar-right">
        <a href="/login" className="nav-btn glass-btn">
          Login
        </a>
        <a href="/register" className="nav-btn gradient-btn">
          Register
        </a>
      </div>

      <div className="mobile-menu-icon">
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;