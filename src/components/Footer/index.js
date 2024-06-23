import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-header">
        <p>Library Management System &copy; 2024</p>
      </div>
      <div className="footer-content">
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: connect@dahlia.tech</p>
          <p>Phone: +65 80686174</p>
        </div>
        <div className="footer-column">
          <h3>Address</h3>
          <p>#1711/1712, SOLUS, Hiranandani Estate, Patlipada, Thane, India 400607.</p>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-media">
            <a href="https://www.linkedin.com/company/dahlia-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
            <a href="https://www.facebook.com/people/Dahlia-Technologies-Pte-Ltd/100094032093418/" target="_blank" rel="noopener noreferrer">Facebook</a> |
            <a href="https://x.com/DahliaTech" target="_blank" rel="noopener noreferrer">Twitter</a> |
            <a href="https://www.instagram.com/dahlia_technologies/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;
