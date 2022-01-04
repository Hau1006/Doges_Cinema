import React, { useEffect, useRef } from 'react';
import { getMovieAsync, reset, selectMovie } from './module/movieSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Index.module.css'
import { Row, Col, Button, Spin } from 'antd';
import { CalendarOutlined, HourglassOutlined, HeartTwoTone, SmileTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import Showtimes from './components/Showtimes/Showtimes';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Client/Footer/Footer'
import IFrameModal from '../../../components/Common/IFrameModal/IFrameModal'
import ScrollTop from '../../../components/Common/ScrollTop/ScrollTop';

function Index() {
    const dispatch = useDispatch();
    const movieId = useRef(useParams().maPhim);
    const myRef = useRef(null);
    const movie = useSelector(selectMovie);

    useEffect(() => {
        //call api get data movie detail
        dispatch(getMovieAsync(movieId.current));
        return () => {
            dispatch(reset()); // clear data when unmount
        }
    }, [dispatch])

    const executeScroll = () => myRef.current.scrollIntoView();

    if (Object.keys(movie).length === 0) {
        return (
            <div className='LoadingScreen'>
                <Spin size='large' />
            </div>
        );
    }
    return (
        <>
            <div style={{ 'backgroundColor': '#001232', 'color': 'white' }}>
                <div className={styles.DetailsBanner} style={{ 'backgroundImage': `url(${movie.hinhAnh})` }}>
                    <div className='Container'>
                        <div className={styles.Wrapper}>
                            <div className={styles.Thumbnail}>
                                <img src={movie.hinhAnh} alt="movie"></img>
                                <div className={styles.WatchTrailer}>
                                    <IFrameModal source={movie.trailer} />
                                </div>
                            </div>
                            <div className={styles.DetailContent}>
                                <div className={styles.MovieTitle}>{movie.tenPhim}</div>
                                <div className={styles.MovieLanguages}>
                                    <span>ENGLISH, VIETNAMESE</span>
                                </div>
                                <span className={styles.TypeOfMovie}>2D | DIGITAL</span>
                                <div className={styles.Duration}>
                                    <div style={{ 'paddingRight': '25px' }}>
                                        <CalendarOutlined style={{ marginRight: '7px' }} />
                                        <span> {moment(movie.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
                                    </div>
                                    <div>
                                        <HourglassOutlined style={{ marginRight: '7px' }} />
                                        <span> {movie.lichChieu[0].thoiLuong} minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.BookingArea}>
                    <div className='Container'>
                        <div className={styles.WrapperOther}>
                            <div className={styles.InfoOther}>
                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '25px', marginRight: '10px' }} />100%
                            </div>
                            <div className={styles.InfoOther}>
                                <SmileTwoTone style={{ fontSize: '25px', marginRight: '10px' }} /> 100%
                            </div>
                            <div className={styles.InfoOther}>
                                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '25px', marginRight: '10px' }} /> {movie.danhGia}/10
                            </div>
                            <div className={styles.InfoOther}>
                                <Button className='BtnCustom' size="large" onClick={executeScroll}>
                                    Booking
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={`${styles.Main} Container`}>
                    <Row gutter={{ sm: 16, md: 24, lg: 32 }} wrap>
                        <Col className="gutter-row" lg={18} md={24} sm={24} xs={24}>
                            <div className={styles.Summary}>
                                <h3 className={styles.Title}>SUMMARY</h3>
                                <div className={styles.Content}>
                                    <p>{movie.moTa}</p>
                                </div>
                            </div>
                            <div ref={myRef}>
                                <Showtimes showTimes={movie.lichChieu} />
                            </div>
                        </Col>
                        <Col className="gutter-row" lg={6} md={0} sm={0} xs={0}>
                            <h3 className={styles.Title}>APPLICABLE OFFER</h3>
                            <div className={styles.ApplicableOffer}>None</div>
                            <div className={styles.ApplicableOffer}>None</div>
                            <div className={styles.ApplicableOffer}>None</div>
                        </Col>
                    </Row>
                </div>
            </div>
            <ScrollTop />
            <Footer />
        </>
    );
}

export default Index;
