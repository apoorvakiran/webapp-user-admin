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
import { createUserButton } from "./style";
import { openNotificationWithIcon } from "../../utils/helpers";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, defaultJobName, getAuthData } from "../../utils/Data/Data";

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
};
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
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('');

  useEffect(() => {
    getJobTitleList();
  }, []);

  async function getJobTitleList() {
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "userdetail", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
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
  }

  const handleFinish = values => {
    const defaultValue = jobTitleList.find((item) => item.name === defaultJobName);
    const newValues = values.jobTitle === undefined ? {
      ...values, jobTitle: defaultValue.id
    } : values;
    signUp(newValues);
  };

  async function signUp(values) {
    try {
      // eslint-disable-next-line no-unused-vars
      const pwd = generatePassword();
      const attributeVal = {
        email: values.email,
        phone: (values.phone !== undefined) ? "+1" + values.phone : null,   // optional - E.164 number convention
        first_name: values.firstName,
        last_name: values.lastName,
        role: values.role,
        job_id: values.jobTitle,
        hand: values.hand
      };
      // const { user } = await Auth.signUp({
      //   username: values.email,
      //   password: pwd,
      //   attributes: attributeVal
      // });
      const idToken = await getAuthData();
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        // mode: 'no-cors',
        body: JSON.stringify(attributeVal),
      };

      let responseCode = null;
      const url = baseUrl + "admin?type=create-user";
      await fetch(url, config)
        .then(response => {
          responseCode = response.status;
          return response.json();
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

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="86">+1</Option>
  //       <Option value="87">+91</Option>
  //     </Select>
  //   </Form.Item>
  // );

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
              // rules={[
              //   {
              //     required: true,
              //     // message: "Please select Job Title",
              //   },
              // () => ({
              //   validator(_, value) {
              //     if (value === 0) {
              //       return Promise.reject("Job title cannot be None");
              //     }
              //     return Promise.resolve();
              //   },
              // }),
              // ]}
              // initialValue={0}
              >
                <Select placeholder="Select Job Title"
                  className="formSelectStyle" style={{ height: 50, marginBottom: "20px" }}>
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
              <Form.Item {...canTailFormItemLayout} style={{ fontSize: 14, justifyContent: "center", textAlign: "center" }}>
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
