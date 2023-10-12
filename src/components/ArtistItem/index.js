import React from 'react'
import classNames from 'classnames/bind';
import styles from './ArtistItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from "~/store/actions"
const cx = classNames.bind(styles);

const ArtistItem = ({data}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickArtist = () => {
        navigate(`/artist${data?.link}`);
        dispatch(actions.setArtist(data))
    }
  return (
    <div className={cx('wrapper')} onClick={handleClickArtist}>
        <img src={data?.thumbnail} alt=''/>
        <div className={cx('info')}>
            <strong>{data?.name}</strong>
            <p>{data?.objectType}</p>
        </div>
    </div>
  )
}

export default ArtistItem