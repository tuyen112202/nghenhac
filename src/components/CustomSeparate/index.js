import React from 'react'
import style from './Separate.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

const CustomSeparate = () => {
  return (
    <div className={cx('separate')}></div>
  )
}

export default CustomSeparate