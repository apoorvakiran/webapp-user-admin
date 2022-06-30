import React, { useEffect, useState } from "react";
import { Button, Card, Radio, Skeleton } from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import Table from "../../components/Table";
import axios from "axios";
import { createUserButton, newCreateUserButton } from "./../Users/style";
import './jobs.css';
import routes from "../../features/Routes/URLs";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const editUserButton = {
    color: "#C54B30",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    height: "30px",
    padding: "3px 15px",
    border: "1.5px solid #C54B30",
};

const Jobs = props => {
    const { history } = props;
    const [loading, setLoading] = useState(true);
    const [jobsList, setJobsList] = useState([]);
    const [radioValue, setRadioValue] = useState(null);
    const [jobRowData, setJobRowData] = useState([]);

    useEffect(() => {
        getJobsList();
    }, []);

    async function getJobsList() {
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-jobs-list",
            "https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/userdetail", {
            params: {
                type: "get-jobs-list"
            }
        }
        );
        setLoading(false);
        setJobsList(response.data);
    }
    const editButton = () => {
        return (
            <Button
                shape="round"
                style={editUserButton}
                icon={<EditOutlined />}
            >
                Edit
                {/* <img alt="edit" src=""/> */}
            </Button>
        );
    };

    const CreateNewJob = () => {
        props?.history?.push({
            pathname: routes.CREATE_JOB,
        });
    };

    const editRecord = (e, record) => {
        // setRadioValue(e?.target?.value);
        setJobRowData((jobRowData) => [
            ...jobRowData,
            record,
        ]);

        props?.history?.push({
            pathname: routes.EDIT_JOB,
            state: record,
        });

    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: true,
            render(item, record) {
                return {
                    props: {
                        style: { color: "#C54B30", fontWeight: 500 },
                    },
                    children: <div>{`${record?.name}`}</div>,
                };
            },
        },
        {
            title: editButton(),
            width: "7rem",
            fixed: "right",
            render: (item, record) => {
                return (
                    <div className="action-div">
                        {/* <Radio.Group
                            onChange={e => {
                                onChange(e, record);
                            }}
                            value={radioValue}
                        >
                            <Radio value={record?.id} />
                        </Radio.Group> */}
                        <Button
                            shape="round"
                            style={editUserButton}
                            onClick={e => {
                                editRecord(e, record);
                            }}
                            icon={<EditOutlined />}
                        >

                            {/* <img alt="edit" src=""/> */}
                        </Button>
                    </div>
                );
            }
        }
    ];

    return (
        <BasicLayout>
            {loading ? (
                <Skeleton
                    style={{ position: "absolute", zIndex: "99" }}
                    loading
                    active
                />
            ) : (
                <Card>
                    <div className="user-score" style={{ marginBottom: 20 }}>Job Types</div>
                    <Button
                        shape="round"
                        style={newCreateUserButton}
                        onClick={CreateNewJob}
                        icon={<PlusOutlined />}
                    >
                        Create New Job
                    </Button>
                    <Table data={jobsList} columns={columns} showHeader={false} />
                </Card>
            )}
        </BasicLayout>
    );
};

export default Jobs;
