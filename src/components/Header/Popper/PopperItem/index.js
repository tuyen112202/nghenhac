import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopperItem.module.scss';
const cx = classNames.bind(styles);

const PopperItem = ({text, iconLeft, iconRight, href, onClick}) => {
    return (
        <a className={cx('suggestion-item')} href={href} alt='' onClick={onClick}>
            <div className={cx('left-item')}>
                {iconLeft}
                <p className={cx('suggestion-text')}>{text}</p>
            </div>
            {iconRight}
        </a>
    );
};

export default PopperItem;
