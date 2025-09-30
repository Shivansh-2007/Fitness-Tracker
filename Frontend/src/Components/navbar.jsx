import { all } from 'axios';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
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
          <a style={{color: 'White', textDecoration: 'none'}} href="/">Home</a>
          {/* <a style={{color: 'White', textDecoration: 'none'}} href="/progress">Progress</a> */}
          <a style={{color: 'White', textDecoration: 'none'}} href="/users">Users</a>
        </div>

        <div style={{
          marginLeft: 'auto', 
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <a style={{color: 'White', textDecoration: 'none', borderRadius: '50px', background: 'Transparent', padding: '0.5rem 1rem', borderWidth:'0.5px', border: 'solid'}} href="/login">Login</a>
          <a style={{color: 'Black', textDecoration: 'none', borderRadius: '50px', background: 'White', padding: '0.5rem 1rem'}} href="/register">Register</a>
          {/* <a style={{
            color: 'Matteblue', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }} href="/profile">
            <FaUser /> Profile
          </a> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;