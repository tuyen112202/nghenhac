import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../LeftSideBar.module.scss';
const cx = classNames.bind(styles);

const MenuAntDesign = ({ data }) => {
    const navigate = useNavigate();
    return (
        <Menu
            className={cx('menu')}
            theme="dark"
            onClick={({ key }) => {
                navigate(key);
            }}
            defaultSelectedKeys={[window.location.pathname]}
            items={data}
        />
    );
};

export default MenuAntDesign;
