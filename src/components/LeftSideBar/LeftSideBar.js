import {
    CompassOutlined,
    DatabaseOutlined,
    LineChartOutlined,
    StarOutlined,
} from '@ant-design/icons';
import logo from '~/assets/logo-dark.svg';
import classNames from 'classnames/bind';
import styles from './LeftSideBar.module.scss';
import MenuAntDesign from './Menu';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';
import SignUp from '../auth/signUp';
import SignIn from '../auth/signIn';
import { useState } from 'react';
const cx = classNames.bind(styles);

const LeftSideBar = ({className}) => {

    const [open, setOpen] = useState(false);
    const { isLogin, isSignUpContent } = useSelector((state) => state.app);
    const navigate = useNavigate();

    const Menu_items = [
        { label: 'Discover', key: routes.discover, icon: <CompassOutlined /> },
        { label: '#zingchart', key: routes.zingchart, icon: <LineChartOutlined/> },
        { label: 'Top 100', key: routes.top100, icon: <StarOutlined /> },
        { type: 'divider' },
        
    ];

    const myMusic = { label: 'Library', key: routes.library, icon: <DatabaseOutlined /> };

    if (isLogin) {
        Menu_items.push(myMusic);
    }

    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('logo-wrapper')} onClick={() => navigate(routes.discover)}>
                <img src={logo} alt="logo" className={cx('logo')} />
            </div>

            <div className={cx('menu-wrapper')}>
                <MenuAntDesign data={Menu_items} />

                {isLogin ? (
                    <></>
                ) : (
                    <div className={cx('login-banner')}>
                        <p className={cx('banner-text')}>
                            Đăng nhập để khám phá playlist dành riêng cho bạn
                        </p>
                        <Button type="primary" shape="round" className={cx('banner-button')} onClick={() => {setOpen(true)}}>
                            Đăng nhập
                        </Button>
                        <Modal
                            title={isSignUpContent ? 'Create a account' : 'Login'}
                            centered
                            open={open}
                            footer={null}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={700}
                        >
                            {isSignUpContent ? <SignUp /> : <SignIn />}
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeftSideBar;
