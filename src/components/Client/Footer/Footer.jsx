import React from 'react';
import { FacebookOutlined, GoogleOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import brandImg from '../../../assets/images/brand.png'

function Footer() {
  return (
    <footer className={styles.FooterSection} id="contact">
      <div className="Container">
        <div className={styles.FooterTop}>
          <Link style={{paddingRight: '100px', paddingLeft: '10px'}} to='/'>
            <img src={brandImg} alt='brand' />
          </Link>
          <ul className={styles.IconList}>
            <li className={styles.Icon}><FacebookOutlined /></li>
            <li className={styles.Icon}><TwitterOutlined /></li>
            <li className={styles.Icon}><GoogleOutlined /></li>
            <li className={styles.Icon}><InstagramOutlined /></li>
          </ul>
        </div>
        <div className={styles.FooterBottom}>
          <p className={styles.Author}>Copyright © 2021.All Rights Reserved By Doges</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer