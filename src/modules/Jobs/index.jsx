import React, { useEffect, useState } from "react";
import { Button, Card, Skeleton } from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import Table from "../../components/Table";
import axios from "axios";
import './jobs.css';
import routes from "../../features/Routes/URLs";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { baseUrl, compareString, getAuthData } from "../../utils/Data/Data";
import SearchBox from "../../utils/SearchBox";

const editUserButton = {
    color: "#C54B30",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "700",
    height: "auto",
    padding: "3px 6px",
    border: "1.5px solid #C54B30",
};

const Jobs = props => {
    const [loading, setLoading] = useState(true);
    const [jobsList, setJobsList] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    // const [jobRowData, setJobRowData] = useState([]);

    useEffect(() => {
        getJobsList();
    }, []);

    const pull_data = (searchedText) => {
        setSearchedText(searchedText);
        return searchedText;
    };

    async function getJobsList() {
        const idToken = await getAuthData();
        const response = await axios.get(
            // "http://localhost:5051/api/user-admin/get-jobs-list",
            baseUrl + "userdetail", {
            headers: {
                "Authorization": `Bearer ${idToken}`
            },
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
        // setJobRowData((jobRowData) => [
        //     ...jobRowData,
        //     record,
        // ]);

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
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return compareString(record?.name, value);
            },
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
                <Card className="page-content">
                    <div className="page-content-header">
                        <div className="user-score">Job Types</div>
                        <Button
                            className="createNewButton"
                            shape="round"
                            onClick={CreateNewJob}
                            icon={<PlusOutlined
                            />}
                        >
                            Create New Job
                        </Button>
                    </div>
                    <SearchBox func={pull_data} />
                    <Table data={jobsList} columns={columns} showHeader={false} />
                </Card>
            )}
        </BasicLayout>
    );
};

export default Jobs;
