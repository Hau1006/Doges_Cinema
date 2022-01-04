/* eslint-disable jsx-a11y/alt-text */
import { CalendarOutlined, ClockCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../../components/Client/Footer/Footer';
import { checkLogin } from '../../../utils/checkLogin';
import Countdown from './components/Countdown/Countdown';
import Seat from './components/Seat/Seat';
import styles from './Index.module.css';
import { getAll, getSeatPlanAsync, reset, updateAccessToken, updateBookingData } from './module/seatSlice';

function Index() {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getAll);

    function handleBack() {
        navigate(-1);
    }

    // get data ma lich chieu, tai khoan nguoi dung va access token
    let bookingData = {};
    if (checkLogin() != null) {
        Object.assign(bookingData, { maLichChieu: params.maLichChieu });
        Object.assign(bookingData, { taiKhoanNguoiDung: checkLogin().taiKhoan });  ////BUG
        dispatch(updateBookingData(bookingData));
        dispatch(updateAccessToken(checkLogin().accessToken));
    }

    // get data Laydanhsachphongve
    useEffect(() => {
        // call api
        dispatch(getSeatPlanAsync(params.maLichChieu));
        return () => {
            dispatch(reset());
        }
    }, [dispatch, params.maLichChieu])

    if (data.length === 0) {
        return (
            <div className='LoadingScreen'>
                <Spin size='large' />
            </div>
        );
    }
    return (
        <>
            <div style={{ 'backgroundColor': '#001232' }}>
                <div className={styles.Banner}>
                    <div className={styles.ImgBg}></div>
                    <div className={styles.MovieInfo}>
                        <div style={{ display: 'flex', justifyContent: 'center', 'fontSize': '40px', 'fontWeight': '500' }}>{data.thongTinPhim.tenPhim}</div>
                        <div title={data.thongTinPhim.diaChi} style={{ 'fontSize': '20px', display: 'flex', justifyContent: 'center' }}>{data.thongTinPhim.tenCumRap} | {data.thongTinPhim.tenRap}</div>
                    </div>
                </div>
                <div className={styles.Countdown}>
                    <div className='Container'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col className="gutter-row" span={8}>
                                <Button type="primary" className='BtnCustom' size="large" onClick={handleBack}>
                                    <RollbackOutlined />Back
                                </Button>
                            </Col>
                            <Col style={{ 'display': 'flex', 'justifyContent': 'center' }} className="gutter-row space-align-block" span={8}>
                                <span style={{ 'marginRight': '10px' }} className={styles.Time}><CalendarOutlined style={{ 'marginRight': '10px' }} />{data.thongTinPhim.ngayChieu}</span>
                                <span className={styles.Time}><ClockCircleOutlined style={{ 'marginRight': '10px' }} />{data.thongTinPhim.gioChieu}</span>
                            </Col>
                            <Col style={{ 'display': 'flex', 'flexDirection': 'row-reverse' }} className="gutter-row" span={8}>
                                <Countdown />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={styles.Select}>
                    <div className='Container'>
                        <Seat />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Index;