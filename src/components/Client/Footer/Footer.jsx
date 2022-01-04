import React from 'react';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        <div className="footer-top">
          <ul className="social-icons ml-auto">
            <li><FacebookOutlined /></li>
            <li><TwitterOutlined /></li>
            <li><GoogleOutlined /></li>
            <li><InstagramOutlined /></li>
          </ul>
        </div>
        <hr />
        <div className="footer-bottom">
          <div className="left">Copyright © 2021.All Rights Reserved By Doges</div>
          <div className="links mb-0">
            <ul className="contact-link">
              <li>About</li>
              <li>Terms of Use</li>
              <li>Policy</li>
              <li>FAQ</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
