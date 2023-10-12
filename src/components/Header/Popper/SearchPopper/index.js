import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchPopper.module.scss';
import ArtistItem from '~/components/ArtistItem';
import SongCommomItem from '~/components/SongCommonItem';
import Scrollbars from 'react-custom-scrollbars-2';
import PlaylistItem from '~/components/PlaylistItemSearch';
const cx = classNames.bind(styles);

const SearchPopper = ({ data, className }) => {
    return (
        <div className={cx('wrapper', className)}>
            <strong className={cx('title')}>Suggested for you</strong>
            <Scrollbars
                autoHeight
                autoHeightMin={100}
                autoHeightMax={450}
                style={{ width: '100%' }}
            >
                <div className={cx('suggestion')}>
                    {data?.top?.objectType === 'artist' ? (
                        <ArtistItem data={data?.top} />
                    ) : (
                        <SongCommomItem data={data?.top} sidePlaylistCheck />
                    )}
                    <div className={cx('songs-searched')}>
                        {data?.songs
                            ?.filter((song, index) => song.isWorldWide && index < 4)
                            .map((song, index) => (
                                <SongCommomItem data={song} sidePlaylistCheck key={index} />
                            ))}
                    </div>

                    <div className={cx('playlists-searched')}>
                    {data?.playlists
                            ?.filter((playlist, index) => playlist && index < 4)
                            .map((playlist, index) => (
                                <PlaylistItem data={playlist} key={index}/>
                            ))}
                    </div>

                    <div className={cx('artist-searched')}>
                        {data?.artists
                            ?.filter((artist, index) => artist && index < 4)
                            .map((artist, index) => (
                                <ArtistItem data={artist} key={index}/>
                            ))}
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};

export default memo(SearchPopper);
