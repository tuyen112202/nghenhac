import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    LoadingOutlined,
    MenuOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Button, Popover, Spin } from 'antd';
import SearchPopper from './Popper/SearchPopper';
import SettingPopper from './Popper/SettingPopper';
import AvatarPopper from './Popper/AvatarPopper';
import { useNavigate } from 'react-router-dom';
import * as apis from '~/apis';
import * as actions from '~/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

const Header = ({ isScroll }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSearchLoading } = useSelector((state) => state.app);
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleGoForward = () => {
        navigate(1);
    };

    const [searchValue, setSearchValue] = useState('');
    const [dataSearch, setDataSearch] = useState({});

    const searchValueDebounced = useDebounce(searchValue, 500);

    useEffect(() => {
        const fetchDataSearch = async () => {
            dispatch(actions.setSearchLoading(true));
            const res = await apis.apiSearch(searchValueDebounced);
            if (res?.data?.err === 0) {
                setDataSearch(res?.data?.data);
                dispatch(actions.setSearchLoading(false));
            }
        };
        fetchDataSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueDebounced]);

    const handleShowMenu = () => {
        dispatch(actions.setMenuShow(true));
    };

    return (
        <div className={cx('wrapper', { isScroll: isScroll })}>
            <div className={cx('search-container')}>
                <MenuOutlined className={cx('menu-btn')} onClick={handleShowMenu} />
                <ArrowLeftOutlined className={cx('lr-button')} onClick={handleGoBack} />
                <ArrowRightOutlined className={cx('lr-button')} onClick={handleGoForward} />

                <Popover
                    content={
                        isSearchLoading ? (
                            <Spin
                                className={cx('loading')}
                                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                            />
                        ) : (
                            <SearchPopper data={dataSearch} className={cx('search-popper')} />
                        )
                    }
                    placement="bottom"
                    trigger="click"
                    arrow={false}
                    color="#34224f"
                >
                    <Search
                        style={{
                            width: 400,
                        }}
                        size="large"
                        placeholder="Search songs, artists, lyrics..."
                        allowClear
                        bordered={false}
                        className={cx('search')}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        onFocus={() => {
                            dispatch(actions.setFocusSearch(true));
                        }}
                        onBlur={() => {
                            dispatch(actions.setFocusSearch(false));
                        }}
                    />
                </Popover>
            </div>

            <div className={cx('nav-container')}>
                <Popover
                    content={<SettingPopper />}
                    trigger="click"
                    arrow={false}
                    color="#34224f"
                    overlayInnerStyle={{ padding: '6px' }}
                    placement="bottomLeft"
                >
                    <Button
                        className={cx('setting-btn')}
                        type="primary"
                        shape="circle"
                        icon={<SettingOutlined />}
                    />
                </Popover>

                <Popover
                    content={<AvatarPopper />}
                    trigger="click"
                    arrow={false}
                    color="#34224f"
                    overlayInnerStyle={{ padding: '6px' }}
                    placement="bottomLeft"
                >
                    <img
                        src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                        alt=""
                        className={cx('avatar')}
                    />
                </Popover>
            </div>
        </div>
    );
};

export default Header;
