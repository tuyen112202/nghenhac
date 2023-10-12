import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import style from './Discover.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '~/config/slickResponsiveSetting';
import * as actions from '~/store/actions';
import { useNavigate } from 'react-router-dom';
import NewRelease from './NewRelease';
import Playlists from './Playlists';
import LoadingScreen from '~/components/LoadingScreen';

const cx = classNames.bind(style);

const Discover = () => {
    const navigate = useNavigate();
    const { banner, isLoading } = useSelector((state) => state.app);
    const [arrowShow, setArrowShow] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=> {
        if(banner?.length === 0) {
            dispatch(actions.setLoading(true));
        } else {
            dispatch(actions.setLoading(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[banner?.length])
    
    const handleArrowTrue = () => {
        setArrowShow(true);
    };

    const handleArrowFalse = () => {
        setArrowShow(false);
    };

    const handleClickBanner = (item) => {
        if (item.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId));
            dispatch(actions.setPlay(true));
            dispatch(actions.setPlaylist(null));
        } else if (item.type === 4) {
            const playlistPath = item?.link?.split('.')[0];
            const playlistPath2 = playlistPath.split('/');
            playlistPath2[1] = 'playlist';
            const playlistPath3 = playlistPath2.join('/');
            navigate(playlistPath3);
        } else {
            //
        }
    };
    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={cx('wrapper')}>
                    <div
                        className={cx('slider-container')}
                        onMouseEnter={handleArrowTrue}
                        onMouseLeave={handleArrowFalse}
                    >
                        {
                            <Slider {...settings} arrows={arrowShow} autoplay>
                                {banner?.map((item, index) => (
                                    <img
                                        onClick={() => handleClickBanner(item)}
                                        className={cx('card')}
                                        key={index}
                                        src={item.banner}
                                        alt=""
                                    />
                                ))}
                            </Slider>
                        }
                    </div>

                    <NewRelease />

                    <Playlists />
                </div>
            )}
        </div>
    );
};

export default Discover;
