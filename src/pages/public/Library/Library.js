import React, { useEffect } from 'react';
import { database } from '~/firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { doc, getDoc } from 'firebase/firestore';
import SongList from '~/components/SongList';
import Scrollbars from 'react-custom-scrollbars-2';
import styles from './Library.module.scss';
import classNames from 'classnames/bind';
import PlaylistItem from '~/components/SinglePlaylist/PlaylistItem';
import Slider from 'react-slick';
import { settingsPlaylist } from '~/config/slickResponsiveSetting';
const cx = classNames.bind(styles);

const Library = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.app);
    const { user } = useSelector((state) => state.app);
    const docRef = doc(database, 'users', `${user?.uid}`);

    useEffect(() => {
        const getUser = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                dispatch(actions.setUserData(docSnap.data()));
            } else {
                // docSnap.data() will be undefined in this case
                console.log('No such document!');
            }
        };
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(actions.setPlaylist(userData?.songs));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('favorite-playlists')}>
                <h2 className={cx('heading')}>Playlists loved by {userData?.email}</h2>
                <>
                    {userData?.playlists?.length > 4 ? (
                        <Slider {...settingsPlaylist} arrows={false} adaptiveHeight>
                            {userData?.playlists?.map((playlist, index) => (
                                <PlaylistItem key={index} data={playlist} deleteAble />
                            ))}
                        </Slider>
                    ) : (
                        <div className={cx('playlists-wrapper')}>
                            {userData?.playlists?.map((playlist, index) => (
                                <PlaylistItem
                                    key={index}
                                    data={playlist}
                                    deleteAble
                                    className={cx('playlist-item')}
                                />
                            ))}
                        </div>
                    )}
                </>
            </div>

            <div className={cx('favorite-songs')}>
                <h2 className={cx('heading')}>Songs loved</h2>
                <Scrollbars style={{ height: 'calc(100vh - 92px - 140px)', width: '100%' }}>
                    <SongList deleteAble />
                </Scrollbars>
            </div>
        </div>
    );
};

export default Library;
