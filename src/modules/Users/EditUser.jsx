import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Card,
  Skeleton,
} from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import { createUserButton, invertCreateUserButton } from "./style";
import { Link, useLocation } from "react-router-dom";
import { openNotificationWithIcon } from "../../utils/helpers";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.post['Access-Control-Allow-Methods'] = "*";

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

const canTailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 11,
    },
    sm: {
      span: 24,
      offset: 12,
    },
  },
}

const formItemStyle = {
  marginBottom: "0px !important"
}

const EditUser = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getJobTitleList();
  }, []);

  async function getJobTitleList() {
    const response = await axios.get(
      "https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/userdetail", {
      params: {
        type: "get-jobs-list"
      }
    }
    );
    setJobTitleList(response.data);
    setLoading(false);
  }

  function saveEditUser(values) {
    try {
      const data = {
        'user_id': location.state.id,
        'first_name': values.first_name,
        'last_name': values.last_name,
        'phone': values.phone,
        'role': values.role,
        'job_id': values.job_id,
        'hand': values.hand,
      };

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(data),
      }
      const url = 'https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/user?type=user-edit'
      fetch(url, config).
        then(response => { console.log('response', response.status); })
        .then(data => {
          console.log('Success:', data);
          openNotificationWithIcon("success", "Success", `User updated successfully`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      return error
    }
  }

  async function saveEditUser2(values) {
    const response = await axios.post(
      // "http://localhost:5051/api/user-admin/user-edit",
      "https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/user",
      {
        "user_id": location.state.id,
        "first_name": values.first_name,
        "last_name": values.last_name,
        "phone": values.phone,
        "role": values.role,
        "job_id": values.job_id,
        "hand": values.hand,
      }, {
      params: {
        type: "user-edit"
      }
    }
    );
    if (response.rowcount === 1) {
      openNotificationWithIcon("success", "Success", `User ${values?.first_name} updated successfully`);
    }
  }

  async function deleteUser1() {
    const response = await axios.post(
      // "http://localhost:5051/api/user-admin/banned-user",
      "https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/user",
      {
        "user_id": location.state.id,
      }, {
      params: {
        type: "user-deactivate"
      }
    }
    );
    // openNotificationWithIcon("success", "Success", `User deleted/disabled successfully`);
  }

  function deleteUser() {
    const data = {
      'user_id': location.state.id,
    };

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify(data),
    }
    const url = 'https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/user?type=user-deactivate'
    fetch(url, config).
      then(response => { console.log('response', response.status); })
      .then(data => {
        console.log('Success:', data);
        openNotificationWithIcon("success", "Success", `User deleted successfully`);
      })
      .catch((error) => {
        return error
      });
  }

  const onFinish = values => {
    saveEditUser(values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+1">+1</Option>
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <BasicLayout>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) : (
        <Form
          {...formItemLayout}
          form={form}
          name="create-user"
          onFinish={onFinish}
          initialValues={location?.state}
          style={{ margin: "60px 30px" }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Card title="Edit User">
                <Form.Item
                  style={{ justifyContent: "center" }}
                  name="first_name"
                  // tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input first name",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input className="formInput" placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center" }}
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input className="formInput" placeholder="Last Name" />
                </Form.Item>

                <Form.Item
                  style={{ justifyContent: "center" }}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input disabled={true} className="formInput" placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center", width: "100%" }}
                  name="phone"
                >
                  <Input className="formInput"
                    placeholder="Phone"
                  />
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center" }}
                  className="formStyle"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please select permissions",
                    },
                  ]}
                >
                  <Select placeholder="Select Permissions" className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                    <Select.Option value={1}>Admin</Select.Option>
                    <Select.Option value={2}>User</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center" }}
                  className="formStyle"
                  name="job_id"
                >
                  <Select placeholder="Select Job Title" className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                    {jobTitleList.map((row, index) => (
                      <Select.Option value={row.id}>{row.name} </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="hand"
                  style={{ justifyContent: "center" }}
                  className="formStyle"
                >
                  <Select placeholder="Watch Hand" className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                    <Select.Option value="left">Left </Select.Option>
                    <Select.Option value="right">Right </Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <Form.Item {...tailFormItemLayout} style={{ marginTop: "25px" }}>
            <Button
              className="create-user"
              htmlType="submit"
              shape="round"
              style={createUserButton}
              disabled={location.state.banned}
            >
              Save
            </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout} style={{ marginTop: "25px" }}>
            <Button
              className="create-user"
              htmlType="button"
              shape="round"
              style={invertCreateUserButton}
              onClick={() => { deleteUser() }}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Form.Item>
          <Form.Item {...canTailFormItemLayout} style={{ fontSize: 14, justifyContent: "center" }}>
            <Link className="cancel-edit" to="/user-admin/users/">
              Cancel
            </Link>
          </Form.Item>
        </Form>
      )}
    </BasicLayout>
  );
};

export default EditUser;
