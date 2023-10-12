import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as apis from '~/apis';
import classNames from 'classnames/bind';
import style from './Playlist.module.scss';
import { Button, message } from 'antd';
import { HeartOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import SongList from '~/components/SongList';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { doc, setDoc } from 'firebase/firestore';
import { usersRef } from '~/firebase';
import LoadingScreen from '~/components/LoadingScreen';
const cx = classNames.bind(style);

const Playlist = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const { title, id } = useParams();
    const [playlistData, setPlaylistData] = useState(null);
    const { songs } = useSelector((state) => state.curMusic);
    const { user, userData, isLoading } = useSelector((state) => state.app);
    useEffect(() => {
        const fetchDataPlaylist = async () => {
            dispatch(actions.setLoading(true));
            const res = await apis.apiGetPlaylist(id);
            if (res.data.err === 0) {
                setPlaylistData(res?.data?.data);
                dispatch(actions.setLoading(false));
                let songsFetched = res?.data?.data?.song?.items;
                const songsPlayAble = songsFetched.filter((song) => song.isWorldWide);
                dispatch(actions.setPlaylist(songsPlayAble));
            }
        };

        fetchDataPlaylist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handlePlayPlaylist = () => {
        dispatch(actions.setCurSongId(songs[0].encodeId));
        dispatch(actions.setPlay(true));
    };

    const handleAddFavorite = () => {
        if (userData?.playlists.find((playlist) => playlist?.encodeId === id)) {
            messageApi.open({
                type: 'warning',
                content: 'This playlist is already in your library...',
            });
        } else {
            const newUserData = userData;
            newUserData?.playlists.push(playlistData);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
            dispatch(actions.setUserData(newUserData));
            messageApi.open({
                type: 'success',
                content: 'Added to your library!',
            });
        }
    };

    return (
        <div>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <div className={cx('wrapper')}>
                    {contextHolder}
                    <div className={cx('left-content')}>
                        <div className={cx('thumbnail')}>
                            <img
                                className={cx('thumbnail-img')}
                                src={playlistData?.thumbnailM}
                                alt=""
                            />
                        </div>

                        <div className={cx('playlist-content')}>
                            <div className={cx('info')}>
                                <h3>{playlistData?.title}</h3>
                                <p>{playlistData?.like} likes</p>
                                <p>{playlistData?.listen} listens</p>
                            </div>

                            <div className={cx('actions')}>
                                <Button
                                    className={cx('playlist-btn')}
                                    type="primary"
                                    shape="round"
                                    icon={<PlayCircleTwoTone />}
                                    onClick={handlePlayPlaylist}
                                >
                                    Play playlist
                                </Button>

                                <div className={cx('icons')}>
                                    {playlistData && (
                                        <HeartOutlined
                                            className={cx('icon')}
                                            onClick={handleAddFavorite}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Scrollbars style={{ height: 'calc(100vh - 92px - 96px)', width: '100%' }}>
                        <div className={cx('right-content')}>
                            <div className={cx('heading')}>
                                <span className={cx('heading-text')}>Lời tựa</span>
                                <span>{playlistData?.sortDescription}</span>
                            </div>
                            <SongList />
                        </div>
                    </Scrollbars>
                </div>
            )}
        </div>
    );
};

export default Playlist;
