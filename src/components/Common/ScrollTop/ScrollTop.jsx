import React from 'react'
// import styles from './ScrollTop.module.css'
import { UpOutlined } from '@ant-design/icons';
// import { useState } from 'react';
import { BackTop } from 'antd';

function ScrollTop() {
  // const [visible, setVisible] = useState(false);


  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //     /* you can also use 'auto' behaviour
  //        in place of 'smooth' */
  //   });
  // };
  // const toggleVisible = () => {
  //   const scrolled = document.documentElement.scrollTop;
  //   if (scrolled > 300) {
  //     setVisible(true)
  //   }
  //   else if (scrolled <= 300) {
  //     setVisible(false)
  //   }
  // };
  // window.addEventListener('scroll', toggleVisible);

  // useEffect(() => {
    
  //   return () => {
  //     window.removeEventListener('scroll', scrollToTop)
  //   }
  // }, [])

  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

  return (
    // <div style={{ display: visible ? 'inline' : 'none' }} className={styles.Scroll_Top} onClick={scrollToTop}>
    //   <UpOutlined />
    // </div>
    <BackTop>
      <div style={style}><UpOutlined /></div>
    </BackTop>
  )
}

export default ScrollTop
