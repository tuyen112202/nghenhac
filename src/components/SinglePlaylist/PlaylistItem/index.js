import React from 'react';
import classNames from 'classnames/bind';
import style from './PlaylistItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { usersRef } from '~/firebase';
import * as actions from '~/store/actions';
import { message } from 'antd';
const cx = classNames.bind(style);

const PlaylistItem = ({ data, deleteAble = false, className}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, userData } = useSelector((state) => state.app);
    const [messageApi, contextHolder] = message.useMessage();


    const handleClickPlaylist = (item) => {
        const playlistPath = item?.link?.split('.')[0];
        const playlistPath2 = playlistPath.split('/');
        playlistPath2[1] = 'playlist';
        const playlistPath3 = playlistPath2.join('/');
        navigate(playlistPath3);
    };

    const handleDeletePlaylist = () => {
        const index = userData?.playlists.indexOf(data);
        const newUserData = userData;
        if (index !== -1) {
            newUserData?.playlists.splice(index, 1);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
        }
        dispatch(actions.setUserData(newUserData));
    };

    const handleAddFavoritePlaylist = () => {
        if (userData?.playlists.find((playlist) => playlist?.encodeId === data?.encodeId)) {
            messageApi.open({
                type: 'warning',
                content: 'This playlist is already in your library...',
            });
        } else {
            const newUserData = userData;
            newUserData?.playlists.push(data);
            setDoc(doc(usersRef, `${user?.uid}`), newUserData);
            dispatch(actions.setUserData(newUserData));
            messageApi.open({
                type: 'success',
                content: 'Added to your library!',
            });
        }
    }
    return (
        <div className={cx('wrapper', className)}>
            {contextHolder}
            <div className={cx('image-wrapper')}>
                <img
                    className={cx('image')}
                    onClick={() => {
                        handleClickPlaylist(data);
                    }}
                    src={data?.thumbnailM}
                    alt=""
                />
                {deleteAble ? (
                    <CloseOutlined className={cx('playlist-icon')} onClick={handleDeletePlaylist} />
                ) : (
                    <HeartOutlined className={cx('playlist-icon')} onClick={handleAddFavoritePlaylist}></HeartOutlined>
                )}
            </div>
            <p>{data?.title}</p>
        </div>
    );
};

export default PlaylistItem;
