import React, { memo } from 'react';
import classNames from 'classnames/bind';
import style from './Top100.module.scss';
import SongItem from '../SongItem';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import Scrollbars from 'react-custom-scrollbars-2';
const cx = classNames.bind(style);

const Top100 = ({ data, hideHeading = false }) => {
    const dispatch = useDispatch();

    const songsPlayAble = data?.filter((song) => song.isWorldWide);

    const handleSetPlaylist = () => {
        dispatch(actions.setPlaylist(songsPlayAble));
    };

    return (
        <div className={cx('wrapper')}>
            {hideHeading ? (
                songsPlayAble?.length !== 0 ? (
                    <></>
                ) : (
                    <h3>There's no songs are free now... </h3>
                )
            ) : (
                <h3 className={cx('heading')}>#top100</h3>
            )}
            <Scrollbars
                autoHeight
                autoHeightMin={100}
                autoHeightMax={400}
                style={{ width: '100%' }}
            >
                {songsPlayAble?.map((song, index) => (
                    <SongItem
                        key={song?.encodeId}
                        data={song}
                        onSetPlaylist={handleSetPlaylist}
                        topNumber={index + 1}
                    />
                ))}
            </Scrollbars>
        </div>
    );
};

export default memo(Top100);
