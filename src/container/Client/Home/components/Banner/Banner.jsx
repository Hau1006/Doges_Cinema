import React from 'react'
import styles from './Banner.module.css';

function Banner() {
  return (
    <div className={styles.Banner}>
      <div className={styles.Banner_Bg}></div>
      <div className={styles.Banner_Overlay}></div>
      <div className={`${styles.Banner_Content} ${styles.Container}`}>
        <h1 className={styles.Banner_Title}>get <span className={styles.Banner_Movie}>movie</span> tickets</h1>
        <p>Buy movie tickets in advance, find movie times watch trailer, read movie reviews and much more</p>
      </div>
    </div>
  )
}

export default Banner
