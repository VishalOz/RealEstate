import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">Your Niwahana</h3>
            <p>Your trusted partner in finding the perfect home. We connect you with quality properties and expert guidance every step of the way.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Properties</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>info@yourniwahana.com</li>
              <li>(+94) 77 683 1413</li>
              <li>51/4 Central Avenue, Canada</li>
            </ul>
          </div>
        </div>

        {/* Course Info */}
        <div className="footer-course-info">
          <p>5COSC026W Advanced Client-side Web Development</p>
          <p>Vishal Sudasinghe • w2119833 / 20240036</p>
          <p>Final Coursework - Estate Agent Client-side Web Application</p>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Your Niwahana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
