import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlaylistItem.module.scss';
import ClickAbleText from '../ClickAbleText';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const PlaylistItem = ({ data }) => {
    const navigate = useNavigate();
    
    const handleSetPlaylist = () => {
        const playlistPath = data?.link?.split('.')[0];
            const playlistPath2 = playlistPath.split('/');
            playlistPath2[1] = 'playlist';
            const playlistPath3 = playlistPath2.join('/');
            navigate(playlistPath3);
    }
    
    return (
        <div className={cx('wrapper')} onClick={handleSetPlaylist}>
            <img src={data?.thumbnail} alt="" />
            <div className={cx('info')}>
                <strong>{data?.title}</strong>
                <div className={cx('bottom-info')}>
                    <p>Playlist -</p>
                    <div className={cx('artists')}>
                        {data?.artists?.map((artist, index) => (
                            <ClickAbleText dataArtist={artist} key={index}>
                                {artist?.name}
                            </ClickAbleText>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistItem;
