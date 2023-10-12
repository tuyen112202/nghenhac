import React from 'react';
import classNames from 'classnames/bind';
import style from './ClickAbleText.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from "~/store/actions"
const cx = classNames.bind(style);

const ClickAbleText = ({ children, className, dataArtist }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickArtist = () => {
        navigate(`/artist${dataArtist?.link}`);
        dispatch(actions.setArtist(dataArtist))
    }

    return <div className={cx(style.wrapper, className)} onClick={handleClickArtist}>{children}</div>;
};

export default ClickAbleText;
