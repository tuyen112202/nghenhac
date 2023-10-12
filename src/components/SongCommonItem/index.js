import React from 'react';
import classNames from 'classnames/bind';
import style from './SongCommomItem.module.scss';
import ClickAbleText from '~/components/ClickAbleText';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
const cx = classNames.bind(style);

const SongCommomItem = ({ data, onSetPlaylist = () => {}, className, sidePlaylistCheck }) => {
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month;
        return time;
    }

    const dispatch = useDispatch();
    const { currentSongId } = useSelector((state) => state.curMusic);

    const handlePlaySong = () => {
        dispatch(actions.setCurSongId(data?.encodeId));
        dispatch(actions.setPlay(true));
        onSetPlaylist();
        !sidePlaylistCheck && onSetPlaylist();
    };

    return (
        <div
            className={cx(
                'wrapper',
                {
                    active: currentSongId === data?.encodeId,
                    sidePlaylistCheck: currentSongId === data?.encodeId && sidePlaylistCheck,
                },
                className,
            )}
        >
            <img className={cx('image')} src={data?.thumbnailM} alt="" onClick={handlePlaySong} />
            <div className={cx('info')}>
                <strong onClick={handlePlaySong} style={{marginLeft : 2}}>{data?.title}</strong>
                <div className={cx('artists')}>
                    {data?.artists?.map((artist, index) => (
                        <ClickAbleText dataArtist={artist} key={index}>
                            {artist?.name}
                        </ClickAbleText>
                    ))}
                </div>
                <p style={{marginLeft : 2}}>{timeConverter(data?.releaseDate)}</p>
            </div>
        </div>
    );
};

export default SongCommomItem;
