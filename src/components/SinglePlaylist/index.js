import React from 'react';
import classNames from 'classnames/bind';
import style from './SinglePlaylist.module.scss';
import Slider from 'react-slick';
import PlaylistItem from './PlaylistItem';
import { settingsPlaylist } from '~/config/slickResponsiveSetting';
const cx = classNames.bind(style);

const SinglePlaylist = ({ data }) => {
    return (
        <div className={cx('wrapper')}>
            <h3>{data?.title}</h3>
            <Slider {...settingsPlaylist} arrows={false} adaptiveHeight>
                    {data?.items?.map((item, index) => (
                        <PlaylistItem data={item} key={index} />
                    ))}
            </Slider>
        </div>
    );
};

export default SinglePlaylist;
