import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormItem from "antd/lib/form/FormItem";
import { signInApi }from '../../../api/user';
import{ ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss';

export default function LoginForm() {


    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };
    
    
    const login = async (e) => {
        const result = await signInApi(inputs);
        if(result.message){
            notification["error"]({
                message: result.message
            });
        } else {
            const { accessToken, refreshToken } = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            notification["success"]({
                message: "Login correcto"
            });

            window.location.href = "/admin";
        }
    };




    return (

        <Form className="login-form" onChange={changeForm} onFinish={login} >
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)" }} />}
                    type="email"
                    name="email"
                    placeholder="Correo electronico"
                    className="login-form_input"
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login-form_input"
                />
            </Form.Item>
            <FormItem>
            <Button
                htmlType="submit"
                className="login-form_button"
            >
                Entrar
            </Button>
        </FormItem>
        </Form>
    )
}