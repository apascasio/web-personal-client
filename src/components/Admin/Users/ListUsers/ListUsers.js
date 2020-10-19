import React, { useState, useEffect } from "react";
import {Switch, List, Avatar, Button } from 'antd';
import { EditOutlined , StopOutlined , DeleteOutlined , CheckOutlined  } from '@ant-design/icons';

import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Modal from '../../../Modal';
import EditUserForm from '../EditUserForm';
// import {
//     getAvatarApi,
//     activateUserApi,
//     deleteUserApi
// } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";  

import "./ListUsers.scss";
import { getAvatarApi } from '../../../../api/user';


    export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);



    return (
        <div className="list-users">
            <div className="list-users__header">
                <div className="list-users__header-switch">
                    <Switch
                        defaultChecked
                        onChange={() => setViewUsersActives(!viewUsersActives)}
                    />
                    <span>
                        {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
                        </span>
                </div>
            </div>
            {viewUsersActives ? (
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                />
            ) : (
                <UsersInactive
                    usersInactive={usersInactive}
                />
            )}

            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}


function UsersActive(props) {
    const{
        usersActive,
        setIsVisibleModal,
        setModalTitle,
        setModalContent,
        setReloadUsers
    } = props;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}  />);
    };


    return ( 
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} /> }
        />
    );
        
}

function UserActive(props) {
    const { user, editUser, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    

    return (
        <List.Item
                    actions={[
                        <Button
                            type="primary"
                            onClick={() => editUser(user)}
                        >
                            <EditOutlined />
                        </Button>,
                        <Button
                        type="danger"
                        onClick={() => console.log("Desactivar Usuario")}
                    >
                        <StopOutlined />
                    </Button>,
                        <Button
                        type="danger"
                        onClick={() => console.log("Eliminar Usuario")}
                    >
                        <DeleteOutlined />
                    </Button>
                    ]}
                > 
                    <List.Item.Meta
                        avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
                        title={`
                            ${user.name ? user.name : '...'}
                            ${user.lastname ? user.lastname : '...'}
                        `}
                        description={user.email}
                    />
                </List.Item>
    );
}

function UsersInactive(props) {
    const { usersInactive, setReloadUsers } = props;

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => (
                <UserInactive user={user}  />
            )}
    />
    );
}

function UserInactive(props) {
    const { user, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button type="primary" >
                    <CheckOutlined />
                </Button>,
                <Button type="danger" >
                    <DeleteOutlined />
                </Button>
            ]}
        >
        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={`
                    ${user.name ? user.name : "..."} 
                    ${user.lastname ? user.lastname : "..."}
                `}
            description={user.email}
        />
        </List.Item>
    );

}