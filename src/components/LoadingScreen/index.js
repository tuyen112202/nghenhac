import { Spin } from 'antd';
import React from 'react';
import classNames from 'classnames/bind';
import style from './LoadingScreen.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
const cx = classNames.bind(style);

const LoadingScreen = () => {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
            }}
            spin
        />
    );
    return (
        <div className={cx('wrapper')}>
            <Spin indicator={antIcon} />
        </div>
    );
};

export default LoadingScreen;
