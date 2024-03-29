import React, { useEffect, useState, useContext } from "react";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Card,
  Skeleton,
  Modal,
} from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import {
  createUserButton,
  grayUserButton,
  invertCreateUserButton,
} from "./style";
import { Link, useHistory, useLocation } from "react-router-dom";
import { openNotificationWithIcon } from "../../utils/helpers";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl, getAuthData, UserRole } from "../../utils/Data/Data";
import { UserRoleContext } from './../../features/Routes';

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Methods"] = "*";

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
      span: 16,
      offset: 4,
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
      offset: 14,
    },
    sm: {
      span: 24,
      offset: 12,
    },
  },
};

const { confirm } = Modal;

const EditUser = () => {
  const location = useLocation();
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [form] = Form.useForm();

  const userRole = useContext(UserRoleContext);

  useEffect(() => {
    setInitialValues(location.state);
    getJobTitleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getJobTitleList() {
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "userdetail", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        type: "get-jobs-list",
      },
    });
    setJobTitleList(response.data);
    setLoading(false);
  }

  async function saveEditUser(values) {
    try {
      const phone = (values.phone !== undefined && values.phone !== "") ? values.phone.includes("+1") ? values.phone : "+1" + values.phone : "";
      const userdata = {
        user_id: location.state.id,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: phone,
        role: String(values.role),
        job_id: values.job_id,
        hand: values.hand,
        email: values.email
      };
      const idToken = await getAuthData();
      const config = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        // mode: 'no-cors',
        body: JSON.stringify(userdata),
      };
      const url = baseUrl + "admin?type=edit-user";
      // const url = 'http://localhost:5051/api/user-admin/user-edit';
      await fetch(url, config)
        .then(response => response.json())
        .then(data => {
          openNotificationWithIcon(
            "success",
            "Success",
            `User updated successfully`,
          );
          setInitialValues(data.rows);
          setTimeout(() => {
            history.push("/user-admin/users/");
          }, 1000);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } catch (error) {
      return error;
    }
  }

  // async function saveEditUser2(values) {
  //   const idToken = await getAuthData();
  //   const response = await axios.post(
  //     // "http://localhost:5051/api/user-admin/user-edit",
  //     baseUrl + "admin",
  //     {
  //       "user_id": location.state.id,
  //       "first_name": values.first_name,
  //       "last_name": values.last_name,
  //       "phone": values.phone,
  //       "role": values.role,
  //       "job_id": values.job_id,
  //       "hand": values.hand,
  //       "email": values.email
  //     }, {
  //     headers: {
  //       "Authorization": `Bearer ${idToken}`
  //     },
  //     params: {
  //       type: "edit-user"
  //     }
  //   }
  //   );
  //   if (response.rowcount === 1) {
  //     openNotificationWithIcon(
  //       "success",
  //       "Success",
  //       `User ${values?.first_name} updated successfully`,
  //     );
  //   }
  // }

  // async function deleteUser1() {
  //   const idToken = await getAuthData();
  //   const response = await axios.post(
  //     // "http://localhost:5051/api/user-admin/banned-user",
  //     baseUrl + "user",
  //     {
  //       "user_id": location.state.id,
  //     }, {
  //     headers: {
  //       "Authorization": `Bearer ${idToken}`
  //     },
  //     params: {
  //       type: "user-deactivate"
  //     }
  //   }
  //   );
  //   // openNotificationWithIcon("success", "Success", `User deleted/disabled successfully`);
  // }

  const openModal = () => {
    confirm({
      title: "Delete User",
      content: "Are you sure you want to Delete user?",
      onOk() {
        deleteUser();
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  async function deleteUser() {
    const data = {
      // 'user_id': location.state.id,
      email: location.state.email,
    };
    const idToken = await getAuthData();
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
    const url = baseUrl + "admin?type=delete-user";
    fetch(url, config)
      .then(response => {
        console.log("response", response.status);
      })
      .then(data => {
        // console.log('Success:', data);
        openNotificationWithIcon(
          "success",
          "Success",
          `User deleted successfully`,
        );
        history.push("/user-admin/users/");
      })
      .catch(error => {
        return error;
      });
  }

  const onFinish = values => {
    saveEditUser(values);
  };

  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="+1">+1</Option>
  //       <Option value="+91">+91</Option>
  //     </Select>
  //   </Form.Item>
  // );

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
          initialValues={initialValues}
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
                  <Input className="formInput" placeholder="First Name *" />
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
                  <Input
                    disabled={true}
                    className="formInput"
                    placeholder="E-mail *"
                  />
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center", width: "100%" }}
                  name="phone"
                >
                  <Input className="formInput" placeholder="Phone" />
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
                  hidden={userRole.userRole === UserRole}
                >
                  <Select
                    placeholder="Select Permissions *"
                    className="formSelectStyle"
                    style={{ height: 50, marginBottom: "20px" }}
                    disabled={userRole.userRole === UserRole}
                  >
                    <Select.Option value={1}>Admin</Select.Option>
                    <Select.Option value={2}>User</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ justifyContent: "center" }}
                  className="formStyle"
                  name="job_id"
                  rules={[
                    {
                      required: true,
                      message: "Please select Job Title",
                    },
                    () => ({
                      validator(_, value) {
                        if (value === 0) {
                          return Promise.reject("Job title cannot be None");
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Select
                    placeholder="Select Job Title"
                    className="formSelectStyle"
                    style={{ height: 50, marginBottom: "20px" }}
                    disabled={userRole.userRole === UserRole}
                  >
                    <Select.Option value={0}>None </Select.Option>
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
                  <Select
                    placeholder="Watch Hand"
                    className="formSelectStyle"
                    style={{ height: 50, marginBottom: "20px" }}
                  >
                    <Select.Option value="left">Left </Select.Option>
                    <Select.Option value="right">Right </Select.Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <Form.Item className="edit-job-save-item" {...tailFormItemLayout} style={{ marginTop: "25px" }}>
            <Button
              className="create-user"
              htmlType="submit"
              shape="round"
              style={location.state.banned ? grayUserButton : createUserButton}
              disabled={location.state.banned}
            >
              Save
            </Button>
          </Form.Item>

          <Form.Item className="edit-job-save-item" {...tailFormItemLayout} style={location.state.banned ? { display: "none" } : { marginTop: "25px" }}>
            <Button
              className="create-user"
              htmlType="button"
              shape="round"
              style={invertCreateUserButton}
              onClick={() => {
                openModal();
              }}
              icon={<DeleteOutlined />}
              disabled={userRole.userRole === UserRole}
            >
              Delete
            </Button>
          </Form.Item>

          <Form.Item className="edit-job-save-item" {...canTailFormItemLayout} style={{ fontSize: 14, justifyContent: "center", marginTop: "20px" }}>
            <Link className="cancel-edit" to={userRole.userRole === UserRole ? "/user-admin/users/user-detail" : "/user-admin/users/"}>
              Cancel
            </Link>
          </Form.Item>
        </Form>
      )}
    </BasicLayout>
  );
};

export default EditUser;
