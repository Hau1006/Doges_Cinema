
import { CloseOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import imgPlay from '../../../assets/images/show-trailer.png';
import styles from './IFrameModal.module.css'

function IFrameModal(props) {
    const { source } = props;
    const [isModalVisible, setisModalVisible] = useState(false);

    const showModal = () => {
        setisModalVisible(true);
        //handlePlayVideo();
        document.cookie = `cross-site-cookie=whatever; SameSite=None; Secure`;
    };

    const handleCancel = () => {
        setisModalVisible(false);
        handlePauseVideo();
    };

    const handlePauseVideo = () => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'stopVideo'
            }), '*');
        })
    }

    // const handlePlayVideo = (e) => {
    //   const iframe = document.getElementsByName('iframeyoutube');
    //   iframe.contentWindow.postMessage(JSON.stringify({
    //     event: 'command',
    //     func: 'playVideo'
    //   }), '*');
    // }

    return (
        <>
            {/* Thay đổi Button này thành thứ khác cho phù hợp */}
            <img className={styles.BtnTrailer} src={imgPlay} alt='play' onClick={showModal}></img>
            <Modal
                title={''}
                visible={isModalVisible}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                width={900}
                footer={null}
                bodyStyle={{ height: '500px', padding: '0' }}
                closable={false}
            >
                <CloseOutlined onClick={handleCancel} className={styles.CloseIcon} />

                <iframe src={`${source}?autoplay=true&enablejsapi=1`}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                    width="100%"
                    height="100%"

                />

            </Modal>
        </ >
    )
}

export default IFrameModal;
