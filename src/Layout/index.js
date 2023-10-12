import React, { useEffect, useState } from 'react';
import LeftSideBar from '~/components/LeftSideBar/LeftSideBar';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import Header from '~/components/Header';
import MusicPlayer from '~/components/MusicPlayer';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '~/store/actions';
const cx = classNames.bind(styles);

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const { isMenuShow } = useSelector((state) => state.app);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScroll, setIsScroll] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Gán sự kiện lắng nghe resize của cửa sổ
        window.addEventListener('resize', handleWindowResize);

        // Gọi hàm handleWindowResize lần đầu tiên để cập nhật kích thước ban đầu
        handleWindowResize();

        // Hủy sự kiện lắng nghe khi component unmount
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth > 950) {
            dispatch(actions.setMenuShow(true));
        } else {
            dispatch(actions.setMenuShow(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    const handleScroll = () => {
        const currentPosition = window.scrollY;
        setScrollPosition(currentPosition);
    };

    useEffect(() => {
        // Đăng ký sự kiện cuộn khi component được render
        window.addEventListener('scroll', handleScroll);
        scrollPosition ? setIsScroll(true) : setIsScroll(false);
        // Hủy đăng ký sự kiện khi component unmount để tránh memory leak
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    const handleCloseMenu = () => {
        dispatch(actions.setMenuShow(false));
    };

    return (
        <div className={cx('wrapper')}>
            {isMenuShow && <div className={cx('overlay')} onClick={handleCloseMenu}></div>}
            <div className={cx('main')}>
                <LeftSideBar className={cx({ active: isMenuShow })} />
                <div className={cx('content')}>
                    <Header isScroll={isScroll} />
                    <div className={cx('content-page')}>{children}</div>
                </div>
            </div>

            <div className={cx('player-wrapper')}>
                <MusicPlayer />
            </div>
        </div>
    );
};

export default Layout;
