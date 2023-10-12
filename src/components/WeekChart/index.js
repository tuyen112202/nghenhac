import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './WeekChart.module.scss';
import { Button } from 'antd';
import Top100 from '../Top100';
const cx = classNames.bind(style);

const WeekChart = ({ data }) => {
    const [isVietNam, setIsVietNam] = useState(true);
    const [isKorea, setIsKorea] = useState(false);
    const [isUS, setIsUS] = useState(false);

    const handleSetTab = (index) => {
        if(index === 1) {
            setIsVietNam(true);
            setIsKorea(false);
            setIsUS(false);
        } else if (index === 2) {
            setIsVietNam(false);
            setIsUS(true);
            setIsKorea(false);
        } else {
            setIsVietNam(false);
            setIsUS(false);
            setIsKorea(true);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>#weekchart</h3>
            <div className={cx('button-group')}>
                <Button className={cx('tab-button')} type={isVietNam ? 'primary' : 'default'} shape="round" onClick={() => handleSetTab(1)}>
                    Viet Nam
                </Button>
                <Button className={cx('tab-button')} type={isUS ? 'primary' : 'default'} shape="round" onClick={() => handleSetTab(2)}>
                    US
                </Button>
                <Button className={cx('tab-button')} type={isKorea ? 'primary' : 'default'} shape="round" onClick={() => handleSetTab(3)}>
                    Korea
                </Button>
            </div>
            {isVietNam ? <Top100 data={data?.vn?.items} hideHeading/> : isKorea ? <Top100 data={data?.korea?.items} hideHeading/> : <Top100 data={data?.us?.items} hideHeading/>}
        </div>
    );
};

export default WeekChart;
