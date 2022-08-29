import React from 'react';
import { Button, Modal } from 'antd';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const { confirm } = Modal

export const LogOut = () => {

    const history = createBrowserHistory()

    const openModal = () => {
        confirm({
            title: "LogOut",
            content: "Are you sure you want to log out?",
            onOk() {
                Auth.signOut();
                history.push('/user-admin/logout')
            },
            onCancel() {

            },
        });
    }
    return (
        openModal()
    )
}