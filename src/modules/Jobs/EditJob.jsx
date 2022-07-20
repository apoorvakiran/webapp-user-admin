import React, { useState } from "react";
import {
  Form,
  Input,
  Row,
  Select,
  Col,
  Button,
  Card
} from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import { createUserButton } from "./../Users/style";
import { openNotificationWithIcon } from "../../utils/helpers"
import axios from "axios";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import { Box } from "@mui/system";
import Table from "../../components/Table/index";
import { useLocation } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { baseUrl } from "../../utils/Data/Data";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 11,
    },
    sm: {
      span: 24,
      offset: 8,
    },
  },
};

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const EditJob = (props) => {
  const location = useLocation();
  const [userList, setUserList] = useState([]);
  const [mappedUserList, setMappedUserList] = useState([]);

  useEffect(() => {
    getUserData();
    getJobUserList(location.state.id);
  }, [])


  async function getJobUserList(jobId) {
    const response = await axios.get(
      // "http://localhost:5051/api/user-admin/get-user-jobs-list", {
      baseUrl + "userdetail", {
      params: {
        id: jobId,
        type: "get-user-jobs-list"
      }
    }
    );
    setMappedUserList(response.data);
  }

  async function getUserData() {
    const response = await axios.get(
      baseUrl + "user", {
      params: { type: "user-list" }
    })
    setUserList(response.data.data)
  }

  function deleteMappedUserList(value) {
    console.log(value);
    let userArray = [];
    var key = value.id;
    userArray.push(key);
    console.log(userArray);
    return userArray;
  }

  const onClick = (event, value) => {
    console.log(value);
    const data = {
      'job_id': location.state.id,
      'users': deleteMappedUserList(value)
    };

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // mode: 'no-cors',
      body: JSON.stringify(data),
    }
    const url = baseUrl + 'userdetail?type=delete-job'
    // const url = 'http://localhost:5051/api/user-admin/delete-job';
    fetch(url, config).
      then(response => response.json())
      .then(data => {
        if (data.data.code === 201) {
          openNotificationWithIcon("success", "Success", `User unassigned successfully`);
          // props?.history?.goBack();
          setMappedUserList((prevState) =>
            prevState.filter((prevItem) => prevItem !== value)
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
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
          children: <div>{`${record?.first_name} ${record?.last_name}`}</div>,
        };
      },
    },
    {
      title: "Delete",
      width: "7rem",
      fixed: "right",
      render: (item, record) => {
        return (
          <div className="action-div">
            <Button
              shape="round"
              style={{ color: "#C54B30" }}
              onClick={e => {
                onClick(e, record);
              }}
              icon={<DeleteOutlined />}
            >
            </Button>
          </div>
        );
      }
    }
  ];

  const [form] = Form.useForm();

  async function handleFinish(values) {
    const response = await axios.post(
      "http://localhost:5051/api/user-admin/create-new-job", {
      job_id: values.id,
      job_name: values.name.trim(),
      description: values.name.trim(),
      location_id: 4,
      users: getIdforMappedUsers()
    }
    );
    openNotificationWithIcon("success", "Success", `Job ${values.name} updated successfully`);
    props?.history?.goBack();
  };

  function saveEditJob(values) {
    const data = {
      'job_id': values.id,
      'job_name': values.name.trim(),
      'description': values.name.trim(),
      'location_id': 4,
      'users': getIdforMappedUsers()
    };

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    let responseCode = null;
    const url = baseUrl + 'userdetail?type=create-new-job'
    // const url = 'http://localhost:5051/api/user-admin/create-new-job'
    fetch(url, config).
      then(response => { responseCode = response.status; return response.json() })
      .then(data => {
        if (responseCode === 200) {
          openNotificationWithIcon("success", "Success", `Job updated successfully`);
          props?.history?.goBack();
        }
        if (responseCode === 409) {
          openNotificationWithIcon("error", "Error", data.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function getIdforMappedUsers() {
    let userArray = [];
    for (var i = 0; i < mappedUserList.length; i++) {
      var key = mappedUserList[i].id;
      userArray.push(key);
    }
    return userArray;
  }

  const handleChange = (event, value) => {
    if (value.length !== 0) {
      setMappedUserList((mappedUserList) => [
        ...mappedUserList,
        value,
      ]);
    }
  }

  return (
    <BasicLayout>
      <Form
        {...formItemLayout}
        form={form}
        name="edit-job"
        onFinish={saveEditJob}
        initialValues={location?.state}
        style={{ margin: "60px 30px" }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Card title="Edit Job">
              <Form.Item
                style={{ justifyContent: "center" }}
                name="id"
              // tooltip="What do you want others to call you?"
              >

              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center" }}
                name="name"
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please enter Job Title",
                    whitespace: true,
                  },
                ]}
              >
                <Input className="formInput" placeholder="Enter Job Title" />
              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center", fontSize: 20, fontWeight: 600, color: "#535353" }}
                name="label"
              >
                + Assign Users
              </Form.Item>
              <Form.Item
                name="users"
                style={{ justifyContent: "center" }}
              // label="Type User's Name to Add"

              >
                {/* <Input className="formInput" placeholder="Type User's Name to Add" /> */}
                <Autocomplete
                  id="asynchronous-demo"
                  getOptionLabel={(userList) => `${userList.first_name} ${userList.last_name}`}
                  options={userList}
                  isOptionEqualToValue={(option, value) => option.first_name === value.first_name}
                  noOptionsText={"No users"}
                  renderOption={(props, userList) => (
                    <Box component="li" {...props} key={userList.id}>
                      {userList.first_name} {userList.last_name}
                    </Box>
                  )}
                  value={props | null}
                  renderInput={(params) => <TextField {...params} label="Enter user name" />}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="userList"
                style={{ justifyContent: "center" }}>
                {mappedUserList.length !== 0 ?
                  <Table style={{ width: "80%" }} data={mappedUserList} columns={columns} showHeader={false} />
                  : <></>
                }
              </Form.Item>
              <Form.Item {...tailFormItemLayout} style={{ marginTop: "25px", justifyContent: "center" }}>
                <Button
                  className="create-user"
                  htmlType="submit"
                  shape="round"
                  style={createUserButton}
                >
                  Save
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </BasicLayout>
  );
};

export default EditJob;
