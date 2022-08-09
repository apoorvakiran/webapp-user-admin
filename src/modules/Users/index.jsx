import React, { useEffect, useState } from "react";
import { Button, Card, Radio, Skeleton } from "antd";
import Table from "../../components/Table/index";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { editUserButton, cardStyle } from "./style";
import BasicLayout from "../../layouts/BasicLayout";
import routes from "../../features/Routes/URLs";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { baseUrl } from "../../utils/Data/Data";
import "./user.css";

const Users = props => {
  const [loading, setLoading] = useState(true);
  const [radioValue, setRadioValue] = useState(null);
  const [userRowData, setuserRowData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [width, setWidth] = useState(0)

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    setWidth(width);
  };
  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        baseUrl + "user", {
        // "http://localhost:5051/api/user-admin/user-list"
        params: { type: "user-list" }
      }
      );
      setLoading(false);
      setDataSource(response.data.data);
    }
    getData();
    getWindowDimensions();
    window.addEventListener("resize", getWindowDimensions);
    return () => window.removeEventListener("resize", getWindowDimensions);
  }, []);

  const CreateNewUser = () => {
    props?.history?.push({
      pathname: routes.CREATE_USER,
    });
  };
  const EditUser = () => {
    props?.history?.push({
      pathname: routes.EDIT_USER,
      state: userRowData,
    });
  };
  const editButton = () => {
    return (
      <Button
        shape="round"
        style={editUserButton}
        onClick={EditUser}
        icon={<EditOutlined />}
      >
        Edit
      </Button>
    );
  };
  const onChange = (e, record) => {
    setRadioValue(e?.target?.value);
    setuserRowData(record);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      fixed: "left",
      width: "10rem",
      render(item, record) {
        return {
          props: {
            style: { fontWeight: 400, color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{`${record?.first_name} ${record?.last_name}`}</div>,
        };
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "10rem",
      render(item, record) {
        return {
          props: {
            style: { fontWeight: "400" },
          },
          children: <div onClick={() => onRow(record, item)}>{item === 1 ? "Admin" : "User"}</div>,
        };
      },
    },
    {
      title: "Job Title",
      dataIndex: "name",
      width: "10rem",
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{item}</div>,
        };
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: "20rem",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{item || "TBD"}</div>,
        };
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "15rem",
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{item || ""}</div>,
        };
      },
    },
    {
      title: "Device",
      dataIndex: "id_number",
      width: "15rem",
      render(item, record) {
        return {
          props: {
            style: {},
          },
          children: <div onClick={() => onRow(record, item)}>{item || ""}</div>,
        };
      },
    },
    {
      title: "Android ID",
      dataIndex: "mac",
      width: "15rem",
      render(item, record) {
        return {
          props: {
            style: {},
          },
          children: <div onClick={() => onRow(record, item)}>{item || ""}</div>,
        };
      },
    },
    {
      title: "Hand",
      dataIndex: "hand",
      width: "10rem",
      render(item, record) {
        return {
          props: {
            style: {},
          },
          children: <div onClick={() => onRow(record, item)}>{item === "left" ? "Left" : "Right"}</div>,
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
            <Radio.Group
              onChange={e => {
                onChange(e, record);
              }}
              value={radioValue}
            >
              <Radio value={record?.id} />
            </Radio.Group>
          </div>
        );
      },
    },
  ];
  const mobileColumns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      width: "10rem",
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{`${record?.first_name} ${record?.last_name}`}</div>,
        };
      },
    },
    {
      title: editButton(),
      width: "7rem",
      render: (item, record) => {
        return (
          <div className="action-div">
            <Radio.Group
              onChange={e => {
                onChange(e, record);
              }}
              value={radioValue}
            >
              <Radio value={record?.id} />
            </Radio.Group>
          </div>
        );
      },
    },
  ]
  const onRow = (record, rowIndex) => {
    props?.history?.push({
      pathname: routes.USER_DETAIL,
      state: record,
    });
  };
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
          <div className="user-score" style={{ marginBottom: 20 }}>Users</div>
          <Button
            shape="round"
            onClick={CreateNewUser}
            icon={<PlusOutlined />}
            className="createNewButton"
          >
            Create New Users
          </Button>

          <Table
            data={dataSource}
            columns={parseInt(width) > 480 ? columns : mobileColumns}
          />
        </Card>
      )}
    </BasicLayout>
  );
};
export default Users;
