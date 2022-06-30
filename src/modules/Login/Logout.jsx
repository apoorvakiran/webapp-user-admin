import React from 'react';
import { Button, Modal } from 'antd';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

const { confirm } = Modal

export const LogOut = () => {

    const openModal = () => {
        confirm({
            title: "LogOut",
            content: "Are you sure you want to log out?",
            onOk() {
                Auth.signOut()
                    .then(data => console.log(data))
                    .catch(err => console.log(err));
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    return (
        openModal()
    )
}