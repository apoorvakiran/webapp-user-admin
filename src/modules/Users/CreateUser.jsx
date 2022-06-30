import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Card,
} from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import { createUserButton, cardStyle, padding50 } from "./style";
import { openNotificationWithIcon } from "../../utils/helpers";
import axios from "axios";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

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

const CreateUser = (props) => {
  const [form] = Form.useForm();
  const [jobTitleList, setJobTitleList] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    getJobTitleList();
  }, []);

  async function getJobTitleList() {
    const response = await axios.get(
      "http://localhost:5051/api/user-admin/get-jobs-list",
    );
    setJobTitleList(response.data.data);
  }

  function generatePassword() {
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    setPassword(randomPassword);
    return randomPassword;
  };

  const handleFinish = values => {
    signUp(values);
  };

  async function signUp(values) {
    try {
      const pwd = generatePassword();
      console.log(pwd);
      const { user } = await Auth.signUp({
        username: values.email,
        password: pwd,
        attributes: {
          email: values.email,
          phone_number: values.phone,   // optional - E.164 number convention
          name: values.first_name,
          family_name: values.last_name,
          'custom:role': values.role,
          'custom:jobtitle': values.jobTitle,
          'custom:hand': values.hand,
          'custom:source': 'user-admin'
        }
      });
      openNotificationWithIcon("success", "Success", `User ${values.first_name} successfully created`);
      props.history.goBack();
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+1</Option>
        <Option value="87">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <BasicLayout>
      <Form
        {...formItemLayout}
        form={form}
        name="create-user"
        onFinish={handleFinish}
        initialValues={{
          prefix: "1",
        }}
        style={{ margin: "60px 30px" }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Card title="Create New Users">
              <Form.Item
                style={{ justifyContent: "center" }}
                name="firstName"
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
                name="lastName"
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
                <Input className="formInput" placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center" }}
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
                  <Select.Option value="1">Admin</Select.Option>
                  <Select.Option value="2">User</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center" }}
                className="formStyle"
                name="jobTitle"
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
              <Form.Item {...tailFormItemLayout} style={{ marginTop: "25px", justifyContent: "center" }}>
                <Button
                  style={createUserButton}
                  className="create-user"
                  htmlType="submit"
                  shape="round"
                >
                  Create User
                </Button>
              </Form.Item>
              <Form.Item {...canTailFormItemLayout} style={{ fontSize: 14, justifyContent: "center" }}>
                <Link className="cancel" to="/user-admin/users/">
                  Cancel
                </Link>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </BasicLayout >
  );
};

export default CreateUser;
