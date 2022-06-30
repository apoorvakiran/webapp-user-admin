import React, { useEffect, useState } from "react";
import { Button, Card, Radio, Skeleton } from "antd";
import Table from "../../components/Table/index";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { newCreateUserButton, editUserButton, cardStyle } from "./style";
import BasicLayout from "../../layouts/BasicLayout";
import routes from "../../features/Routes/URLs";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

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
        "https://p7igg9ijcb.execute-api.us-east-1.amazonaws.com/prod/user", {
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
      sorter: true,
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
      dataIndex: "job_id",
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
      sorter: true,
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
          children: <div onClick={() => onRow(record, item)}>{item || "TBD"}</div>,
        };
      },
    },
    {
      title: "Device",
      dataIndex: "device",
      width: "15rem",
      render(item, record) {
        return {
          props: {
            style: {},
          },
          children: <div onClick={() => onRow(record, item)}>{item || "TBD"}</div>,
        };
      },
    },
    {
      title: "Android ID",
      dataIndex: "macId",
      width: "15rem",
      render(item, record) {
        return {
          props: {
            style: {},
          },
          children: <div onClick={() => onRow(record, item)}>{item || "TBD"}</div>,
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
    <BasicLayout pageTitle="Users">
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) : (
        <Card>
          <Button
            shape="round"
            style={newCreateUserButton}
            onClick={CreateNewUser}
            icon={<PlusOutlined />}
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
