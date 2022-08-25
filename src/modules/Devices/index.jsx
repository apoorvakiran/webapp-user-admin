import React, { useEffect, useState } from "react";
import { Card, Skeleton } from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import Table from "../../components/Table";
import axios from "axios";
import './devices.css';
import { baseUrl, getAuthData } from "../../utils/Data/Data";

const columns = [
    {
        title: "Model",
        dataIndex: "id_number",
        key: "id_number",
        sorter: (a, b) => a.id_number.localeCompare(b.id_number),
        render(item, record) {
            return {
                props: {
                    style: { color: "#535353" },
                },
                children: <div>{`${record?.id_number}`}</div>,
            };
        },
    },
    {
        title: "Active user",
        dataIndex: "first_name",
        key: "first_name",
        sorter: (a, b) => a.first_name.localeCompare(b.first_name),
        render(item, record) {
            return {
                props: {
                    style: { color: "#535353" },
                },
                children: <div>{`${record?.first_name} ${record?.last_name}`}</div>,
            };
        },
    },
    {
        title: "Android ID",
        dataIndex: "mac",
        key: "mac",
        sorter: (a, b) => a.mac.localeCompare(b.mac),
        render(item, record) {
            return {
                props: {
                    style: { color: "#535353" },
                },
                children: <div>{`${record?.mac}`}</div>,
            };
        },
    }
];

const Devices = props => {
    const { history } = props;
    const [loading, setLoading] = useState(true);
    const [devicesList, setDevicesList] = useState([]);

    useEffect(() => {
        getDevicesList();
    }, []);

    async function getDevicesList() {
        const idToken = await getAuthData();
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-device-assign",
            baseUrl + "userdetail",
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                },
                params: {
                    type: "get-device-assign"
                }
            }
        );
        setLoading(false);
        setDevicesList(response.data);
    }

    return (
        <BasicLayout>
            {loading ? (
                <Skeleton
                    style={{ position: "absolute", zIndex: "99", padding: "20px" }}
                    loading
                    active
                />
            ) : (
                <Card className="page-content">
                    <div className="page-content-header">
                        <div className="user-score">Devices</div>
                        < div id="button" style={{ display: "none", marginBottom: 20 }}>
                            <button className="createNewButton" style={{ borderRadius: 50, width: 250, height: 40, backgroundColor: "white", color: "#C54B30", fontWeight: 700 }}>+ Create new Device</button>
                        </div>
                    </div>
                    <Table data={devicesList} columns={columns} showHeader={true} />
                </Card>
            )}
        </BasicLayout>
    );
};

export default Devices;
