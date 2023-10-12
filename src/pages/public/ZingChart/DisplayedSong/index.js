import React from 'react'
import classNames from 'classnames/bind';
import style from './DisplayedSong.module.scss';
const cx = classNames.bind(style);

const DisplayedSong = ({data}) => {
  return (
    <div className={cx('wrapper')}>
        <img className={cx('image')} src={data?.thumbnailM} alt="" />
            <div className={cx('info')}>
                <strong>{data?.title}</strong>
                <p className={cx('name')}>{data?.artistsNames}</p>
            </div>
    </div>
  )
}

export default DisplayedSong