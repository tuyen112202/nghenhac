import React from 'react';
import classNames from 'classnames/bind';
import style from './PlaylistPopper.module.scss';
import { useSelector } from 'react-redux';
import SongCommomItem from '~/components/SongCommonItem';
import Scrollbars from 'react-custom-scrollbars-2';
const cx = classNames.bind(style);
const PlaylistPopper = () => {
    const { songs } = useSelector((state) => state.curMusic);

    return (
        <div className={cx('wrapper')}>
            <h3>Playing...</h3>
            <Scrollbars style={{ height: 'calc(100% - 20px)', width: '100%' }}>
                {songs.map((song) => (
                    <SongCommomItem data={song} key={song?.encodeId} className={cx('song-item')} sidePlaylistCheck/>
                ))}
            </Scrollbars>
        </div>
    );
};

export default PlaylistPopper;
