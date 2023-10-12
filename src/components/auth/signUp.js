import { Button, Form, Input, message } from 'antd';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, usersRef } from '~/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { useDispatch } from 'react-redux';
import * as actions from '~/store/actions';
import style from "./style.module.scss";
import classNames from 'classnames/bind';   
const cx = classNames.bind(style);

const SignUp = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
   
    const onFinish = (values) => {
        // console.log('Success:', values);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                console.log(userData);
                dispatch(actions.setSignUp(false));
                setDoc(doc(usersRef, `${userData?.user?.uid}`), {
                    email: userData?.user?.email,
                    songs: [],
                    playlists: [],
                    uid: userData?.user?.uid,
                  });
            })
            .catch((err) => {
                console.log(err);
                messageApi.open({
                    type: 'warning',
                    content: 'Sign up failed...Please check your email or password...',
                  });
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
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
                    marginRight:120
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className={cx('submit-wrapper')}>
                        <Button type="primary" htmlType="submit" className={cx('submit-button')}>
                            Sign up
                        </Button>
    
                        <div>
                            Have a account?
                            <span
                                className={cx('click-text')}
                                onClick={() => {
                                    dispatch(actions.setSignUp(false));
                                }}
                            >
                                SignIn now
                            </span>
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignUp;
