import classNames from 'classnames/bind';
import style from './SongItem.module.scss';
import { Col, Divider, Row, message } from 'antd';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import ClickAbleText from '../ClickAbleText';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
import { doc, setDoc } from 'firebase/firestore';
import { usersRef } from '~/firebase';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const SongItem = ({ data, onSetPlaylist = () => {}, topNumber = null, deleteAble = false }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { user, userData } = useSelector((state) => state.app);
    const { currentSongId } = useSelector((state) => state.curMusic);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function convertDuration(time) {
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
    }
    const handlePlayMusic = () => {
        dispatch(actions.setCurSongId(data?.encodeId));
        dispatch(actions.setPlay(true));
        onSetPlaylist();
    };

    const handlePlayPlaylist = () => {
        const playlistPath = data?.album?.link?.split('.')[0];
        const playlistPath2 = playlistPath.split('/');
        playlistPath2[1] = 'playlist';
        const playlistPath3 = playlistPath2.join('/');
        navigate(playlistPath3);
    };

    const handleAddFavorite = () => {
        if (userData?.songs.find((song) => song?.encodeId === data?.encodeId)) {
            messageApi.open({
                type: 'warning',
                content: 'This song is already in your playlist...',
            });
        } else {
            const newUserData = userData;
            newUserData?.songs.push(data);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
            dispatch(actions.setUserData(newUserData));
            messageApi.open({
                type: 'success',
                content: 'Added to your playlist!',
            });
        }
    };

    const handleDeleteSong = () => {
        const index = userData?.songs.indexOf(data);
        const newUserData = userData;
        if (index !== -1) {
            newUserData?.songs.splice(index, 1);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
        }
        dispatch(actions.setUserData(newUserData));
    };

    return (
        <div className={cx('wrapper', { active: data.encodeId === currentSongId })}>
            {contextHolder}
            <div className={cx('song-item')}>
                <Row>
                    <Col span={12} className={cx('first-column')}>
                        {topNumber ? (
                            <h3 className={cx('top-number')}>{topNumber}</h3>
                        ) : deleteAble ? (
                            <CloseOutlined
                                className={cx('delete-btn')}
                                onClick={handleDeleteSong}
                            />
                        ) : (
                            <HeartOutlined onClick={handleAddFavorite} className={cx('heart')} />
                        )}
                        <img
                            onClick={handlePlayMusic}
                            className={cx('song-img')}
                            alt=""
                            src={data?.thumbnail}
                        />
                        <div className={cx('song-info')}>
                            <strong className={cx('song-title')} onClick={handlePlayMusic}>
                                {data?.title}
                            </strong>
                            <div className={cx('artists')}>
                                {data?.artists?.map((artist, index) => (
                                    <ClickAbleText dataArtist={artist} key={index}>
                                        {artist?.name}
                                    </ClickAbleText>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col span={10} className={cx('second-col')}>
                        <p className={cx('album-title')} onClick={() => handlePlayPlaylist(data)}>
                            {data?.album?.title}
                        </p>
                    </Col>
                    <Col span={2} className={cx('third-col')}>
                        <p>{convertDuration(data?.duration)}</p>
                    </Col>
                </Row>
            </div>
            <Divider
                orientation="left"
                className={cx('divider')}
                style={{ margin: 0, backgroundColor: 'gray', opacity: 0.3 }}
            />
        </div>
    );
};

export default SongItem;
