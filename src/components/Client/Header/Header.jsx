import 'antd/dist/antd.css';
import Profile from './components/Profile/Profile';
import styles from './Header.module.css'
import brandImg from '../../../assets/images/brand.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import { Button, Drawer, Menu } from 'antd';
import { checkLogin } from '../../../utils/checkLogin';
import { MenuFoldOutlined } from '@ant-design/icons';

function Header() {
    const navigate = useNavigate()
    console.log('re-render')
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userInfo"))
        if (data) {
            console.log(data.accessToken)
            let decodedToken = jwt_decode(data.accessToken)
            console.log("Decoded Token", decodedToken);
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                // navigate('/sign-in')
                localStorage.removeItem("userInfo")
            } else {
                if (data.maLoaiNguoiDung === 'QuanTri') {
                    navigate('/admin')
                }
                // else {
                //     setDataUser({ ...data, soDt: data.soDT })
                // }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className={styles.Navbar}>
            <div className={`${styles.Wrapper} Container`}>
                <div className={styles.Brand}>
                    <Link to='/'>
                        <img src={brandImg} alt='brand' />
                    </Link>
                </div>
                <div className={styles.Menu}>
                    <span>MOVIES</span>
                    <span>THEATERS</span>
                    <span>REVIEWS</span>
                    <span><a href='#contact' style={{ color: '#B7C2F1' }}>CONTACT</a></span>
                    <Profile />
                </div>
                <Button className={styles.barsMenu} style={{backgroundColor: '#0a1e5e', color: 'white'}} onClick={showDrawer}>
                    <MenuFoldOutlined />
                </Button>
                <Drawer
                    title='MENU'
                    placement="right"
                    width='30%'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    style={{textAlign: 'center'}}
                >
                    <Menu style={{textAlign: 'center'}}>
                        <Menu.Item>
                            <span>MOVIES</span>
                        </Menu.Item>
                        <Menu.Item>
                            <span>THEATERS</span>
                        </Menu.Item>
                        <Menu.Item>
                            <span>REVIEWS</span>
                        </Menu.Item>
                        <Menu.Item>
                            <span><a style={{color: 'black'}} href='#contact'>CONTACT</a></span>
                        </Menu.Item>
                        <Menu.Divider style={{paddingTop: '10px'}} />
                        <Profile />
                    </Menu>
                </Drawer>
            </div>
        </nav>
    )
}

export default Header;
