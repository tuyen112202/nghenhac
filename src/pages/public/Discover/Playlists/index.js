import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import style from './Playlists.module.scss';
import SinglePlaylist from '~/components/SinglePlaylist';
const cx = classNames.bind(style);
const Playlists = () => {
    const { playlists } = useSelector((state) => state.app);

    return (
        <div className={cx('wrapper')}>
            {playlists?.map((playlist, index) => (
                <SinglePlaylist key={index} data={playlist} />
            ))}
        </div>
    );
};

export default memo(Playlists);
