/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, message, Modal, Row, Space } from 'antd';
import React, { useEffect, useMemo } from 'react';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import screenImg from '../../../../../assets/images/screen.png';
import seatBookedImg from '../../../../../assets/images/seat-booked.png';
import seatSelectedImg from '../../../../../assets/images/seat-selected.png';
import seat from '../../../../../assets/images/seat.png';
import { MONEY_RATE } from '../../../../../constants/currency';
import { checkLogin } from '../../../../../utils/checkLogin';
import { getModalVisible, getModel, getMovieInfo, getSeatList, getSelectedIndex, getSelectedName, postBookingAsync, selected, selectedName, unselect, unselectName, updateDanhSachVe } from '../../module/seatSlice';
import styles from './Seat.module.css';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Seat() {
    const dispatch = useDispatch();
    const movieInfo = useSelector(getMovieInfo);
    const data = useSelector(getSeatList);
    const selectedIndexArr = useSelector(getSelectedIndex);
    const selectedNameArr = useSelector(getSelectedName);
    const modalVisible = useSelector(getModalVisible);
    const model = useSelector(getModel); // body data post api

  

    function handleBooking() {
        if (selectedIndexArr.length !== 0) {
            dispatch(updateDanhSachVe());
        } else {
            message.error('You have not chosen!');
        }
    }
    useEffect(() => {
        // handle event payment button
        if (model[0].danhSachVe.length !== 0 && model[1].accessToken !== null) {
            // call api
        
            dispatch(postBookingAsync(model));
        }
    })

    const calculateTotal = (danhSachGhe, selectedIndexArr) => {
        let total = 0;
        danhSachGhe.forEach(element => {
            if (selectedIndexArr.includes(element.stt)) {
                total += element.giaVe;
            }
        });
        return total;
    }
    const total = useMemo(() => calculateTotal(data, selectedIndexArr), [data, selectedIndexArr]);

    function handleSelect(e) {
        let stt = e.target.parentElement.getAttribute('data-key');
        let rangeName = e.target.parentElement.children[1].textContent;
        if (stt !== null) {
            if (!selectedIndexArr.includes(stt)) {
                dispatch(selected(stt));
                dispatch(selectedName(rangeName));
            } else {
                dispatch(unselect(stt));
                dispatch(unselectName(rangeName));
            }
        }
    }

    // Format a Number, Exactly Two in Length - utils
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    // VND Currency formatting 10.000 VND
    function currencyFormat(params) {
        return params.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    let i = 1;
    let r = 0;
    let seatRender = data.map((e, index) => {
        let rangeArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
        if (i === 17) { i = 1; r += 1; }
        if (e.taiKhoanNguoiDat !== null) {
            return (
                <button key={e.stt} data-key={e.stt} disabled style={{ cursor: 'no-drop' }} onClick={e => handleSelect(e)} className={styles.SingleSeat}>
                    <img src={seatBookedImg} />
                    <span>{rangeArr[r]}{i++}</span>
                </button >
            )
        }
        if (selectedIndexArr.includes(pad(index + 1))) {
            return (
                <button key={e.stt} title='Ghế đang được chọn' data-key={e.stt} onClick={e => handleSelect(e)} className={styles.SingleSeat}>
                    <img src={seatSelectedImg} />
                    <span>{rangeArr[r]}{i++}</span>
                </button >
            )
        }
        if (e.loaiGhe === 'Vip') {
            return (
                <button key={e.stt} title={`Vip: ${e.giaVe} VND`} data-key={e.stt} onClick={e => handleSelect(e)} className={styles.SingleSeat}>
                    <img style={{ 'filter': 'hue-rotate(40deg)' }} src={seat} />
                    <span>{rangeArr[r]}{i++}</span>
                </button >
            )
        }
        return (
            <button key={e.stt} title={`Thường: ${e.giaVe} VND`} data-key={e.stt} onClick={e => handleSelect(e)} className={styles.SingleSeat}>
                <img src={seat} />
                <span>{rangeArr[r]}{i++}</span>
            </button>
        )
    });

    // Nam
    // const createOrder = (data, actions) => {
    //     if (selectedIndexArr.length !== 0) {
    //         if (checkLogin() !== null) {
    //             return actions.order.create({
    //                 purchase_units: [
    //                     {
    //                         amount: {
    //                             value: parseFloat(total / MONEY_RATE).toFixed(2),
    //                         },
    //                     },
    //                 ],
    //             });
    //         } else {
    //             message.error('Chưa đăng nhập!')
    //         }
    //     } else {
    //         message.error('Bạn cần chọn chỗ trước khi thanh toán!');
    //     }

    // }
    // const onApprove = (data, actions) => {
    //     actions.order.capture()
    //         .then(() => {
    //             dispatch(updateDanhSachVe());
    //         })
    // }

    // const onError = err => {
    //     //message.error('Đã có lỗi gì đó!');
    //     console.log('err');
    // }

    return (
        <div className={styles.MainArea}>
            <div className={styles.SelectArea}>
                <p className={styles.SelectTitle}>SELECT SEAT</p>
                <div className={styles.ScreenImg}>
                    <img src={screenImg} ></img>
                </div>
                <div className={styles.SeatArea}>
                    <div className={styles.SeatWrapper}>
                        {seatRender}
                    </div>
                </div>
                <div className={styles.NoteImg}>
                    <span><img src={seatBookedImg} /> Booked Seat</span>
                    <span><img src={seatSelectedImg} />Selected Seat</span>
                    <span><img style={{ 'filter': 'hue-rotate(40deg)' }} src={seat} />Vip Seats</span>
                    <span><img src={seat} />Regular Seats</span>
                </div>
            </div>
            <div className={styles.PaymentArea}>
                <div style={{ paddingTop: '50px' }}>
                    <div className={styles.SummeryTitle}>
                        BOOKING SUMMERY
                    </div>
                    <div className={styles.BookingSummery}>
                        <h2 className='FormatText'>{movieInfo.tenPhim}</h2>
                        <p>2D | DIGITAL</p>
                        <h2 className='FormatText'>{movieInfo.tenCumRap}</h2>
                        <p>{movieInfo.ngayChieu} - {movieInfo.gioChieu}</p>
                        <div className={styles.Amount}>
                            <h2>{pad(selectedNameArr.length)}</h2>
                            <p>TICKETS</p>
                        </div>
                        <div className={styles.Amount}>
                            <h2>{selectedNameArr.length === 0 ? 'None' : selectedNameArr.join(', ')}</h2>
                            <p>POSITION</p>
                        </div>
                        <div className={styles.Total}>
                            <h2>TICKETS PRICE</h2>
                            <h2>{currencyFormat(total)}</h2>
                        </div>
                        <div style={{ textAlign: "center", marginTop: '25px', position: 'relative', zIndex: '0' }}>
                            <Button className='BtnCustom' size="large" onClick={handleBooking}>
                                PAYMENT
                            </Button>
                            {/* <PayPalButton
                                createOrder={(cart, actions) => createOrder(cart, actions)}
                                onApprove={(cart, actions) => onApprove(cart, actions)}
                                onError={err => onError(err)}
                            /> */}
                            <Modal
                                title=""
                                closable={false}
                                centered
                                visible={modalVisible}
                                footer={null}
                                header={null}
                            >
                                <p className={styles.ModalTitle}>Great!</p>
                                <p className={styles.ModalText}>You have successfully booked your ticket!</p>
                                <div className={styles.ModalBtn}>
                                    <Link to={`/booking-history`} >
                                        <Button className='BtnCustom' shape="round" size="large" >
                                            Go to booking history page
                                        </Button>
                                    </Link>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Seat;