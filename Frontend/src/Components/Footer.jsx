import React from 'react';
import './Footer.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Ready to Transform Your Fitness Journey?</h2>
        <p className="cta-text">Join thousands of users achieving their goals today.</p>
        <div className="cta-buttons">
          <a href="/register" className="cta-button primary">Get Started - It's Free</a>
          <a href="/login" className="cta-button secondary">I Already Have an Account</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;