import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Features from '../Components/features';
import CTA from '../Components/Footer';
import './home.css'; 

const home = () => {
  return (
    <div>
      <div className="home-container">
        <h1 className="title">Gym Stats</h1>
        <p className="subtitle">TRACK YOUR FITNESS JOURNEY EFFORTLESSLY</p>
        <p className="description">
          Log workouts, track progress, and smash your fitness goals!
        </p>

        <div className='button-container'>
          <Link to="/register" className="get-started-btn">
            Get Started
          </Link>
        </div>
      </div>

      <Features />
    </div>
  );
};

export default home;
