import { SyncOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModalVisibleCountdown, timesUp } from '../../module/seatSlice';
import styles from './Countdown.module.css';

function Countdown() {
    const dispatch = useDispatch();
    const modalVisibleCountdown = useSelector(getModalVisibleCountdown);
    const [num, setNum] = useState(120);
    useEffect(() => {
        let time;
        if (num !== 0) {
            time = setTimeout(() => {
                setNum(num - 1);
            }, 1000);
        } else {
            dispatch(timesUp());
        }
        return () => {
            clearTimeout(time);
        }
    }, [num, dispatch]);

    return (
        <>
            <span style={{ 'width': '100px' }} className={styles.Time}><SyncOutlined spin style={{ 'marginRight': '10px' }} />{num}s</span>
            <Modal
                title=""
                closable={false}
                centered
                visible={modalVisibleCountdown}
                footer={null}
                header={null}
            >
                <p className={styles.ModalTitle}>Times Up!</p>
                <p className={styles.ModalText}>Please <span onClick={() => { window.location.reload(); }}>click here</span> to re-book your tickets!</p>
            </Modal>
        </>
    );
}

export default Countdown;