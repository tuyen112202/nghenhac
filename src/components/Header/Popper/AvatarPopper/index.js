import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './AvatarPopper.module.scss';
import PopperItem from '../PopperItem';
import CustomSeparate from '~/components/CustomSeparate';
import { BlockOutlined, LogoutOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import SignIn from '~/components/auth/signIn';
import SignUp from '~/components/auth/signUp';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const AvatarPopper = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLogin, isSignUpContent, user } = useSelector((state) => state.app);
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(actions.setLogin(false));
            dispatch(actions.logoutSuccess());
            navigate('/');
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {isLogin ? (
                <div className={cx('wrapper')}>
                    <div className={cx('user-info')}>
                        <img
                            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                            alt=""
                            className={cx('avatar')}
                        />
                        <div className={cx('info')}>
                            <strong className={cx('name')}>{user?.email}</strong>
                            <p className={cx('status')}>Basic</p>
                        </div>
                    </div>

                    <CustomSeparate />

                    <div className={cx('personal-setting')}>
                        <div className={cx('personal')}>Personal</div>

                        <PopperItem text="Block list (not working yet...)" iconLeft={<BlockOutlined />} />
                        <PopperItem text="Upload song (not working yet...)" iconLeft={<UploadOutlined />} />
                    </div>

                    <CustomSeparate />

                    <div className={cx('logout-item')}>
                        <PopperItem text="Logout" iconLeft={<LogoutOutlined />} onClick={handleLogout}/>
                    </div>
                </div>
            ) : (
                <div className={cx('wrapper-notlogin')}>
                    <Button type="primary" shape="round" className={cx('login-button')} onClick={() => {setOpen(true)}}>
                        Đăng nhập
                    </Button>

                    <Modal
                        title={isSignUpContent ? 'Create a account' : 'Login'}
                        centered
                        open={open}
                        footer={null}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={700}
                    >
                        {isSignUpContent ? <SignUp/> : <SignIn/>}
                    </Modal>
                </div>
            )}
        </>
    );
};

export default AvatarPopper;
