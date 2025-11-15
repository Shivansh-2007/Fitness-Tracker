import React, { useState } from 'react';
import { FaUser, FaTachometerAlt, FaChartLine } from 'react-icons/fa';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const [activeLink, setActiveLink] = useState('dashboard');

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Fitness Logger</h1>
          </div>

          <div className="navbar-links">
            <a
              href="/dashboard"
              onClick={() => setActiveLink('dashboard')}
              className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
            >
              <FaTachometerAlt className="nav-icon" />
              <span>Dashboard</span>
            </a>
            <a
              href="/progress"
              onClick={() => setActiveLink('progress')}
              className={`nav-link ${activeLink === 'progress' ? 'active' : ''}`}
            >
              <FaChartLine className="nav-icon" />
              <span>Progress</span>
            </a>
          </div>

          <div className="profile-section">
            <a href="/profile" className="profile-link">
              <div className="profile-avatar">
                <FaUser />
              </div>
              <span className="profile-text">Profile</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mobile-nav">
        <div className="mobile-nav-content">
          <a
            href="/dashboard"
            onClick={() => setActiveLink('dashboard')}
            className={`mobile-nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </a>
          <a
            href="/progress"
            onClick={() => setActiveLink('progress')}
            className={`mobile-nav-link ${activeLink === 'progress' ? 'active' : ''}`}
          >
            <FaChartLine />
            <span>Progress</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;