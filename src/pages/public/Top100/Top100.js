import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import classNames from 'classnames/bind';
import style from './Top100.module.scss';
import SinglePlaylist from '~/components/SinglePlaylist';
import LoadingScreen from '~/components/LoadingScreen';
const cx = classNames.bind(style);

const Top100 = () => {
    const dispatch = useDispatch();
    const { top100, isLoading } = useSelector((state) => state.app);
    useEffect(() => {
        if (top100?.data) {
            dispatch(actions.setLoading(false));
        } else {
            dispatch(actions.setLoading(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [top100?.data]);
    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={cx('wrapper')}>
                    {top100?.data?.map((playlist, index) => (
                        <SinglePlaylist key={index} data={playlist} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Top100;
