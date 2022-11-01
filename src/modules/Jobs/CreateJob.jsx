import React, { useState } from "react";
import { Form, Input, Row, Col, Button, Card } from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import { createUserButton } from "./../Users/style";
import { openNotificationWithIcon } from "../../utils/helpers";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { Box } from "@mui/system";
import Table from "../../components/Table/index";
import { baseUrl, getAuthData } from "../../utils/Data/Data";

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

const CreateJob = props => {
  const [userList, setUserList] = useState([]);
  const [mappedUserList, setMappedUserList] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "user", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: { type: "user-list" }
    });
    setUserList(response.data.data);
  }

  const onClick = (event, item) => {
    setMappedUserList(prevState =>
      prevState.filter(prevItem => prevItem !== item),
    );
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
            ></Button>
          </div>
        );
      },
    },
  ];

  const [form] = Form.useForm();

  // async function handleFinish(values) {
  //   const response = await axios.post(
  //     "http://localhost:5051/api/user-admin/create-new-job",
  //     {
  //       job_id: null,
  //       job_name: values.jobTitle.trim(),
  //       description: values.jobTitle.trim(),
  //       location_id: 4,
  //       users: getIdforMappedUsers(),
  //     },
  //   );
  //   openNotificationWithIcon(
  //     "success",
  //     "Success",
  //     `New Job ${values.jobTitle} successfully created`,
  //   );
  //   props?.history?.goBack();
  // }

  function getIdforMappedUsers() {
    let userArray = [];
    for (var i = 0; i < mappedUserList.length; i++) {
      var key = mappedUserList[i].id;
      userArray.push(key);
    }
    return userArray;
  }

  async function saveEditJob(values) {

    const idToken = await getAuthData();
    const data = {
      job_id: null,
      job_name: values.jobTitle.trim(),
      description: values.jobTitle.trim(),
      location_id: 4,
      users: getIdforMappedUsers(),
    };

    const config = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      // mode: 'no-cors',
      body: JSON.stringify(data),
    };
    let responseCode = null;
    const url = baseUrl + "userdetail?type=create-new-job";
    //const url = 'http://localhost:5051/api/user-admin/create-new-job'
    fetch(url, config)
      .then(response => {
        responseCode = response.status;
        return response.json();
      })
      .then(data => {
        if (responseCode === 200) {
          openNotificationWithIcon(
            "success",
            "Success",
            `Job created successfully`,
          );
          props?.history?.goBack();
        }
        if (responseCode === 409) {
          openNotificationWithIcon("error", "Error", data.data.message);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  const handleChange = (event, value) => {
    if (value.length !== 0) {
      setMappedUserList(mappedUserList => [...mappedUserList, value]);
    }
  };

  return (
    <BasicLayout>
      <Form
        {...formItemLayout}
        form={form}
        name="create-job"
        onFinish={saveEditJob}
        initialValues={{
          prefix: "1",
        }}
        style={{ margin: "60px 30px" }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Card title="Create New Job" className="job-card">
              <Form.Item
                style={{ justifyContent: "center" }}
                name="jobTitle"
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please enter Job Title",
                    whitespace: true,
                  },
                ]}
                className="job-title-form-item"
              >
                <Input className="formInput" placeholder="Enter Job Title" />
              </Form.Item>
              <Form.Item className="job-user-heading" name="label">
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
                  getOptionLabel={userList =>
                    `${userList.first_name} ${userList.last_name}`
                  }
                  options={userList}
                  isOptionEqualToValue={(option, value) =>
                    option.first_name === value.first_name
                  }
                  noOptionsText={"No users"}
                  renderOption={(props, userList) => (
                    <Box component="li" {...props} key={userList.id}>
                      {userList.first_name} {userList.last_name}
                    </Box>
                  )}
                  value={props | null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className="job-user-input"
                      label="Enter user name"
                    />
                  )}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item name="userList" style={{ justifyContent: "center" }}>
                {mappedUserList.length !== 0 ? (
                  <Table
                    style={{ width: "80%" }}
                    data={mappedUserList}
                    columns={columns}
                    showHeader={false}
                  />
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout} className="job-save-btn">
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

export default CreateJob;
