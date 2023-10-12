import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Artist.module.scss';
import { PlayCircleFilled } from '@ant-design/icons';
import * as apis from '~/apis';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import SongList from '~/components/SongList';
import Scrollbars from 'react-custom-scrollbars-2';
import LoadingScreen from '~/components/LoadingScreen';
const cx = classNames.bind(style);

const Artist = () => {
    const dispatch = useDispatch();
    const { artist, isLoading } = useSelector((state) => state.app);
    const { songs } = useSelector((state) => state.curMusic);
    const [isHavePlaylist, setIsHavePlaylist] = useState(true);
    useEffect(() => {
        if (artist?.playlistId) {
            const fetchDataPlaylist = async () => {
                dispatch(actions.setLoading(true));
                const res = await apis.apiGetPlaylist(artist?.playlistId);
                if (res.data.err === 0) {
                    let songsFetched = res?.data?.data?.song?.items;
                    dispatch(actions.setLoading(false));
                    const songsPlayAble = songsFetched.filter((song) => song.isWorldWide);
                    dispatch(actions.setPlaylist(songsPlayAble));
                } else {
                    setIsHavePlaylist(false);
                }
            };
            fetchDataPlaylist();
        } else {
            setIsHavePlaylist(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [artist]);

    const handlePlayPlaylist = () => {
        dispatch(actions.setCurSongId(songs[0].encodeId));
        dispatch(actions.setPlay(true));
    };

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>
                        <img className={cx('avatar')} src={artist?.thumbnail} alt="" />
                        <div className={cx('info')}>
                            <div className={cx('name-and-play')}>
                                <h1>{artist?.name}</h1>
                                <PlayCircleFilled
                                    className={cx('play-btn')}
                                    onClick={handlePlayPlaylist}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        {isHavePlaylist ? (
                            <Scrollbars
                                style={{ width: '100%' }}
                                autoHeight
                                autoHeightMin={100}
                                autoHeightMax={430}
                            >
                                <div className={cx('song-list')}>
                                    <h3>Songs by {artist?.name}</h3>
                                    <SongList />
                                </div>
                            </Scrollbars>
                        ) : (
                            <h2 style={{ marginTop: 16 }}>This artist have no playlist</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Artist);
