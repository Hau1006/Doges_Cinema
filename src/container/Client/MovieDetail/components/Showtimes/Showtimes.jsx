import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col, Select, Modal, Button } from 'antd';
import styles from './Showtimes.module.css';
import bookingImg from '../../../../../assets/images/img-booking-modal.png';
import { Link } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
import { dayFormat, hourFormat } from '../../../../../utils/formatDate';

const styleCenter = { 'textAlign': 'center' };
function Showtimes(props) {
    const { showTimes } = props;
    const [filter, setFilter] = useState({
        theater: null,
        date: null,
        modalVisible: false,
        maLichChieu: null
    });

    //// handle props data
    let dsMaHeThongRap = [];
    showTimes.forEach(element => {
        if (!dsMaHeThongRap.includes(element.thongTinRap.maHeThongRap)) {
            dsMaHeThongRap.push(element.thongTinRap.maHeThongRap);
        }
    });

    // get option hethongrap
    const { Option } = Select;
    const listTheaterRender = dsMaHeThongRap.map(element => <Option key={element} value={element}>{element}</Option>);

    //display list theater
    let dsCumRap = [];
    let dsNgayChieu = [];
    showTimes.forEach(element => {
        if (element.thongTinRap.maHeThongRap === (filter.theater ?? dsMaHeThongRap[0]) && !dsCumRap.includes(element.thongTinRap.tenCumRap)) {
            dsCumRap.push(element.thongTinRap.tenCumRap);
        }
        if (element.thongTinRap.maHeThongRap === (filter.theater ?? dsMaHeThongRap[0]) && !dsNgayChieu.includes(dayFormat(element.ngayChieuGioChieu))) {
            dsNgayChieu.push(dayFormat(element.ngayChieuGioChieu));
        }
    });

    let dsNgayChieuSort = dsNgayChieu.sort(function (a, b) {
        let aa = a.split('/').reverse().join(),
            bb = b.split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });

    const listDateRender = dsNgayChieuSort.map(element => <Option key={element} value={element}>{element}</Option>);

    // handle select date
    let listTime = {}; // {tenCumRap: ['gio chieu|ma lich chieu','gio chieu|ma lich chieu']}
    showTimes.forEach(element => {
        if ((filter.date ?? dsNgayChieuSort[0]) === dayFormat(element.ngayChieuGioChieu) && dsCumRap.includes(element.thongTinRap.tenCumRap)) {
            let cumRapKey = element.thongTinRap.tenCumRap;
            if (Object.keys(listTime).includes(cumRapKey)) {
                listTime[`${cumRapKey}`].push(`${element.ngayChieuGioChieu}|${element.maLichChieu}`)
            } else {
                Object.assign(listTime, { [cumRapKey]: [`${element.ngayChieuGioChieu}|${element.maLichChieu}`] });
            }
        }
    });
  
    const dsCumRapRender = dsCumRap.map(element => {
        let times = [];
        if (Object.keys(listTime).includes(element)) {
            listTime[`${element}`].forEach(element => {
                let arr = element.split('|');
                times.push({ [arr[0]]: [arr[1]] });
            });
        }
        let timesRender = times.map(element => <span key={element[Object.keys(element)]} data-id={element[Object.keys(element)]} onClick={e => showModal(true, e.target.dataset.id)} >{hourFormat(Object.keys(element).join(''))}</span>);

        return <Row key={element.toString()} gutter={0} className={styles.Theater}>
            <Col className={`gutter-row ${styles.TheaterName}`} span={10}>
                <span className={styles.TheaterItem}><EnvironmentOutlined style={{marginRight: '15px'}} />{element}</span>
            </Col>
            <Col className={`gutter-row ${styles.Time}`} span={14}>
                {timesRender}
            </Col>
        </Row>
    });
    function handleChangeTheater(value) {
        setFilter({
            theater: value,
            date: null
        })
    }

    function handleChangeDate(value) {
        setFilter({
            ...filter,
            date: value
        })
    }

    // show modal select seats
    const showModal = (value, id) => {
        setFilter({
            ...filter,
            modalVisible: value,
            maLichChieu: id
        });
    }

    // check login
    const btnRender = (() => {
        if (localStorage.getItem('userInfo') != null) {
            return <Link to={`/seat-plan/${filter.maLichChieu}`} >
                <Button className='BtnCustom' shape="round" size="large" >
                    Booking
                </Button>
            </Link>
        }
        return <Link to='/sign-in' >
        <Button className='BtnCustom' shape="round" size="large" >
            Login
        </Button>
        </Link>
    })();


    return (
        <>
            <div className={styles.Showtime}>
                <div className={styles.Filter}>
                    <Row gutter={0}>
                        <Col className="gutter-row" span={12} style={styleCenter}>
                            <span style={{ 'paddingRight': '10px' }}>Theater </span>
                            <Select value={filter.theater ?? dsMaHeThongRap[0]} style={{ width: 120 }} onChange={handleChangeTheater}>
                                {listTheaterRender}
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={12} style={styleCenter}>
                            <span style={{ 'paddingRight': '10px' }}>Date </span>
                            <Select value={filter.date ?? dsNgayChieuSort[0]} style={{ width: 120 }} onChange={handleChangeDate}>
                                {listDateRender}
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div className={styles.TimeList}>
                    {dsCumRapRender}
                </div>
                <Modal
                    centered
                    visible={filter.modalVisible}
                    onOk={e => showModal(false, null)}
                    onCancel={e => showModal(false, null)}
                    footer={null}
                >
                    <h2 className={styles.ItemCenter}>Welcome!</h2>
                    <p className={styles.ModalContent}>SELECT YOUR SEATS</p>
                    <div className={styles.ItemCenter}><img src={bookingImg} alt='booking' /></div>
                    <div className={styles.ModalBtn}>
                        {btnRender}
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Showtimes;