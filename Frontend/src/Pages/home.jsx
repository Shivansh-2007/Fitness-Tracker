import React from 'react';
import Navbar from '../Components/navbar';
import { Link } from 'react-router';
import Features from '../Components/features';
import CTA from '../Components/CTA';

const Home = () => {
  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Fitness Logger</h1>
        <p style={{ color: '#636363', marginTop: '0.5rem' }}>
          TRACK YOUR FITNESS JOURNEY EFFORTLESSLY
        </p>
        <p style={{ color: '#636363', marginBottom: '1.5rem' }}>
          Log workouts, track progress, and smash your fitness goals!
        </p>

        <Link
          to="/register"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#32CD32',
            color: 'black',
            border: '2px solid #000',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#32CD32')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#32CD32')}
        >
          Get started
        </Link>
      </div>
      <Features />
      <CTA />
    </div>
  );
};

export default Home;
