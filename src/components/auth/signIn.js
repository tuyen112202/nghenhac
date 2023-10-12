import { Button, Checkbox, Form, Input, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '~/firebase';
import { useDispatch } from 'react-redux';
import style from "./style.module.scss";
import classNames from 'classnames/bind';
import * as actions from '~/store/actions';
const cx = classNames.bind(style);
const SignIn = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values) => {
        // console.log('Success:', values);
        signInWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                dispatch(actions.setLogin(true));
                dispatch(actions.loginSuccess(userData.user));
            })
            
            .catch((err) => {
                messageApi.open({
                    type: 'warning',
                    content: 'Login failed...Please check your email or password...',
                  });
                console.log(err);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    marginRight: 120
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className={cx('submit-wrapper')}>
                        <Button type="primary" htmlType="submit" className={cx('submit-button')}>
                            Login
                        </Button>
    
                        <div>
                            Don't have accounts?
                            <span
                                className={cx('click-text')}
                                onClick={() => {
                                    dispatch(actions.setSignUp(true));
                                }}
                            >
                                SignUp now
                            </span>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignIn;
