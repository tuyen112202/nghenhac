import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './SettingPopper.module.scss';
import PopperItem from '../PopperItem';
import {
    AlipayCircleOutlined,
    ContactsOutlined,
    InfoCircleOutlined,
    LockOutlined,
    TrademarkCircleFilled,
} from '@ant-design/icons';
import CustomSeparate from '~/components/CustomSeparate';
import { Modal } from 'antd';
const cx = classNames.bind(style);

const SettingPopper = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <PopperItem text="Info" iconLeft={<InfoCircleOutlined />} onClick={handleOpenModal} />

            <Modal title="Zing Mp3" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Giấy phép mạng xã hội: 157/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày
                    24/4/2019
                </p>
                <p>
                    Chủ quản: Công Ty Cổ Phần VNG Z06 Đường số 13, phường Tân Thuận Đông, quận 7,
                    thành phố Hồ Chí Minh, Việt Nam
                </p>
            </Modal>

            <CustomSeparate />

            <PopperItem
                text="Contact"
                iconLeft={<ContactsOutlined />}
                href="https://www.facebook.com/duy1462002/"
            />
            <PopperItem
                text="Advertisement"
                iconLeft={<AlipayCircleOutlined />}
                href="https://adtima.vn/"
            />
            <PopperItem
                text="Terms of use"
                iconLeft={<TrademarkCircleFilled />}
                href="https://mp3.zing.vn/tnc"
            />
            <PopperItem
                text="Privacy Policy"
                iconLeft={<LockOutlined />}
                href="https://zingmp3.vn/privacy.html"
            />
        </div>
    );
};

export default SettingPopper;
