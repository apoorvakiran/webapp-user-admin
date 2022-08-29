import { Modal } from 'antd';
import { Auth } from 'aws-amplify';
import history from '../../utils/history';

const { confirm } = Modal

export const LogOut = () => {

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