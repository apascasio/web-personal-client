import React from 'react';
import {  Button } from 'antd';
import { MenuFoldOutlined , MenuUnfoldOutlined  } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import { logout } from '../../../api/auth';

import BlogLogo from '../../../assets/img/png/logo-white.png'

import './MenuTop.scss';



export default function MenuTop(props){

    const {menuCollapsed, setMenuCollapsed} = props;
    const logoutUser = () =>{
        logout();
        window.location.reload();
    }


    return (
        <div className="menu-top">
            <div className="menu-top_left">
                <img
                    className="menu-top-logo"
                    src={BlogLogo}
                    alt="Pascasio"
                />
                <Button type="link" onClick={()=> setMenuCollapsed(!menuCollapsed)} >
                {menuCollapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined  />}
                    </Button>
            </div>
            <div className="menu-top_right">
                <Button type="link" onClick={logoutUser}>
                    <PoweroffOutlined/>
                </Button>
            </div>
        </div>
    )
}
