// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-thank">Thanks for visiting! 🚀</p>

      <div className="footer-social-icons">
        <a href="https://www.instagram.com/sumo_the_metre" target="_blank" rel="noopener noreferrer" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:metresumod1@gmail.com" title="Gmail">
          <i className="fas fa-envelope"></i>
        </a>
        <a href="https://github.com/Sumod2405" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i className="fab fa-github"></i>
        </a>
      </div>

      <p className="footer-api">
        API: <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb</a> | &copy; 2025 Sumod
      </p>
    </footer>
  );
};

export default Footer;
