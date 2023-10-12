import classNames from 'classnames/bind';
import style from './NewRelease.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import SongCommomItem from '~/components/SongCommonItem';
const cx = classNames.bind(style);

const NewRelease = () => {
    const dispatch = useDispatch();
    const { newRelease } = useSelector((state) => state.app);
    const songsPlayAble = newRelease?.filter((song) => song.isWorldWide);
    
    const handleSetPlaylist = () => {
        dispatch(actions.setPlaylist(songsPlayAble));
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>New Release</h3>
            <div className={cx('songs-container')}>
                {songsPlayAble?.map((song) => (
                    <SongCommomItem
                        key={song?.encodeId}
                        data={song}
                        onSetPlaylist={handleSetPlaylist}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewRelease;
