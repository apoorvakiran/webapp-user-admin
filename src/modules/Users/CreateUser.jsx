import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Card,
  Upload,
} from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import { createUserButton, cardStyle, padding50 } from "./style";
import { openNotificationWithIcon } from "../../utils/helpers";
import axios from "axios";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
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

const canTailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 18,
    },
    sm: {
      span: 18,
      offset: 8,
    },
    md: {
      span: 18,
      offset: 10,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    md: {
      span: 18,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 8,
    },
    lg: {
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
      baseUrl + "userdetail", {
      params: {
        type: "get-jobs-list"
      }
    }
    );
    setJobTitleList(response.data);
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
      // console.log(pwd);
      const attributeVal = {
        email: values.email,
        phone: (values.phone !== undefined) ? "+1" + values.phone : null,   // optional - E.164 number convention
        first_name: values.firstName,
        last_name: values.lastName,
        role: values.role,
        job_id: values.jobTitle,
        hand: values.hand
      }
      // const { user } = await Auth.signUp({
      //   username: values.email,
      //   password: pwd,
      //   attributes: attributeVal
      // });

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // mode: 'no-cors',
        body: JSON.stringify(attributeVal),
      }

      let responseCode = null;
      const url = baseUrl + "admin?type=create-user"
      await fetch(url, config).
        then(response => {
          responseCode = response.status;
          return response.json()
        })
        .then(data => {
          if (responseCode === 200) {
            openNotificationWithIcon("success", "Success", `User ${values.firstName} successfully created`);
            props.history.goBack();
          }
          if (responseCode === 400) {
            if (data.includes("UsernameExistsException")) {
              openNotificationWithIcon("error", "Error", "User account already exists");
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });


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
                <Input className="formInput" placeholder="First Name *" />
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
                <Input className="formInput" placeholder="Last Name *" />
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
                <Input className="formInput" placeholder="E-mail *" />
              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center" }}
                name="phone"
              >
                <Input className="formInput"
                  // addonBefore={prefixSelector}
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
                <Select placeholder="Select Permissions *" className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                  <Select.Option value="1">Admin</Select.Option>
                  <Select.Option value="2">User</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ justifyContent: "center" }}
                className="formStyle"
                name="jobTitle"
                rules={[
                  {
                    required: true,
                    message: "Please select Job Title",
                  },
                ]}
              >
                <Select placeholder="Select Job Title" defaultValue={0} className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                  <Select.Option value={0}>None</Select.Option>
                  {jobTitleList.map((row, index) => (
                    <Select.Option value={row.id}>{row.name} </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="hand"
                style={{ justifyContent: "center" }}
                className="formStyle"
                rules={[
                  {
                    required: true,
                    message: "Please select Hand",
                  }
                ]}
              >
                <Select placeholder="Watch Hand" className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
                  <Select.Option value="left">Left </Select.Option>
                  <Select.Option value="right">Right </Select.Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                name="image"
                style={{ justifyContent: "center" }}
                className="formStyle"
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  maxCount={1}

                >
                  <Button icon={<UploadOutlined />}>Select Photo</Button>
                </Upload>
              </Form.Item> */}
              <Form.Item {...tailFormItemLayout} style={{ marginTop: "25px", justifyContent: "center" }}>
                <Button
                  style={createUserButton}
                  className="createNewUserBtn"
                  htmlType="submit"
                  shape="round"
                >
                  Create & Send Password Request
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
