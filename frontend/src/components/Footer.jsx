import React from "react";
import "../componentStyles/Footer.css";
import { Phone, Mail, GitHub, LinkedIn, YouTube, Instagram } from "@mui/icons-material";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* section # 01 */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" /> Phone: +358441234567
          </p>
          <p>
            <Mail fontSize="small" /> Email: admin@test.com
          </p>
        </div>

        {/* section # 02 */}
        <div className="footer-section social">
            <h3>Follow me</h3>
            <div className="social-links">
                <a href="#" target="_blank"><GitHub className="social-icon"/></a>
                <a href="#" target="_blank"><LinkedIn className="social-icon"/></a>
                <a href="#" target="_blank"><YouTube className="social-icon"/></a>
                <a href="#" target="_blank"><Instagram className="social-icon"/></a>
            </div>
        </div>

        {/* section # 03 */}
        <div className="footer-section about">
            <h3>About Us</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel orci at ex tincidunt scelerisque. Nullam eleifend
                rutrum velit, at interdum felis semper vel.
            </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 My Coding. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
