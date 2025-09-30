import { all } from 'axios';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const DashboardNavbar = () => {
  return (
    <div>
      <nav style={{
        padding: '13px', 
        background: 'linear-gradient(135deg, #06402B -10%, #4CAF50 100%)', 
        height: '25px', 
        borderBottom: 'solid 2px #000',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '20px'
        }}>
          <a style={{color: 'White', textDecoration: 'none'}} href="/dashboard">Dashboard</a>
          <a style={{color: 'White', textDecoration: 'none'}} href="/progress">Progress</a>
        </div>

        <div style={{
          marginLeft: 'auto', 
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <a style={{
            color: 'Matteblue', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }} href="/profile">
            <FaUser /> Profile
          </a>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;