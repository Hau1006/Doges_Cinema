import React, { useEffect, useState, useMemo } from 'react';
import Footer from '../../../components/Client/Footer/Footer';
import styles from './Index.module.css'
import { Spin } from 'antd';
import callApi from '../../../apis/callApi';
import { checkLogin } from '../../../utils/checkLogin';
import TableInfo from './components/TableInfo';
import { dayFormat } from '../../../utils/formatDate';

function Index() {
   const [data, setData] = useState(null);
   // VND Currency formatting 10.000 VND
   function currencyFormat(params) {
      return params.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }
   useEffect(() => {
      // call api 
      (async () => {
         const res = await callApi('QuanLyNguoiDung/ThongTinTaiKhoan', 'POST', { taiKhoan: `${checkLogin().taiKhoan}` });
         if (res?.status === 200) {
            setData(res.data);
         }
      })();
   }, []);
   if (!data) {
      return (
         <div className='LoadingScreen'>
            <Spin size='large' />
         </div>
      );
   }
   if (!!data) {
      const dataFormat = data.thongTinDatVe.map((e, i) => {
         return {
            key: i,
            code: e.maVe,
            name: e.tenPhim,
            price: currencyFormat(e.giaVe),
            //hour: hourFormat(e.ngayDat),
            date: dayFormat(e.ngayDat),
            arr: e.danhSachGhe.map((e,i) => { 
               return {
                  key: i,
                  theaterCode: e.maRap,
                  theater: e.tenHeThongRap,
                  room: e.tenRap,
                  seatCode: e.maGhe,
                  seat: e.tenGhe
               }
            })
         }
      });
      return (
         <div style={{ minHeight: '100vh', backgroundColor: '#001232' }}>
            <div className={`${styles.Main} Container`}>
               <TableInfo bookingInfo={dataFormat} />
            </div>
            <Footer />
         </div>
      );
   }
   
}

export default Index;