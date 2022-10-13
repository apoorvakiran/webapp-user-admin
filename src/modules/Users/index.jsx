
import React, { useEffect, useState, useRef, useContext } from "react";
import { Button, Card, Radio, Skeleton } from "antd";
import Table from "../../components/Table/index";
import { PlusOutlined, EditOutlined, DownloadOutlined } from "@ant-design/icons";
import { editUserButton } from "./style";
import BasicLayout from "../../layouts/BasicLayout";
import routes from "../../features/Routes/URLs";
import axios from "axios";
import { baseUrl, compareString, getAuthData, sortTableColumns, UserRole } from "../../utils/Data/Data";
import { UserRoleContext } from '../../features/Routes';
import "./user.css";
import { openNotificationWithIcon } from "../../utils/helpers";
import * as html2canvas from "html2canvas";
import { jsPDF } from "jspdf"
import { usersJobsList } from './../../utils/Data/Data';
import SearchBox from "../../utils/SearchBox";
const Users = props => {
  const [loading, setLoading] = useState(true);
  const [radioValue, setRadioValue] = useState(null);
  const [userRowData, setuserRowData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [width, setWidth] = useState(0)
  const [defaultJob, setDefaultJob] = useState({})
  const [searchedText, setSearchedText] = useState("");

  const userRole = useContext(UserRoleContext);

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    setWidth(width);
  };

  async function getJobTitleList() {
    const jobList = await usersJobsList()
    setDefaultJob(jobList);
  }

  useEffect(() => {
    getData();
    getWindowDimensions();
    getJobTitleList()
    window.addEventListener("resize", getWindowDimensions);
    return () => window.removeEventListener("resize", getWindowDimensions);
  }, []);

  async function getData() {
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "user", {
      // "http://localhost:5051/api/user-admin/user-list"
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: { type: "user-list" }
    }
    );
    setLoading(false);
    setDataSource(response.data.data);
  }


  const CreateNewUser = () => {
    props?.history?.push({
      pathname: routes.CREATE_USER,
    });
  };
  const EditUser = () => {
    if (userRowData.length !== 0) {
      props?.history?.push({
        pathname: routes.EDIT_USER,
        state: userRowData,
      });
    } else {
      openNotificationWithIcon("error", "Error", `Please select any user to edit`);
    }
  };
  const editButton = () => {
    return (
      <Button
        shape="round"
        style={editUserButton}
        onClick={EditUser}
        icon={<EditOutlined />}
        disabled={userRole.userRole === UserRole} //Admin: 1
      >
      </Button>
    );
  };

  const onChange = (e, record) => {
    const newRecord = {
      ...record,
      name: defaultJob.name,
      job_id: defaultJob.id
    }
    setRadioValue(e?.target?.value);
    setuserRowData(record.name ? record : newRecord);
  };

  const pull_data = (searchedText) => {
    setSearchedText(searchedText);
    return searchedText;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a, b) => sortTableColumns(a.first_name, b.first_name),
      fixed: "left",
      width: "10rem",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return compareString(record.first_name + " " + record?.last_name, value) ||
          compareString(record.role, value) ||
          compareString(record.name, value) ||
          compareString(record.email, value) ||
          compareString(record.phone, value) ||
          compareString(record.id_number, value) ||
          compareString(record.mac, value) ||
          compareString(record.hand, value)
      },
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
      sorter: (a, b) => sortTableColumns(a.role, b.role),
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
      sorter: (a, b) => sortTableColumns(a.name, b.name),
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div onClick={() => onRow(record, item)}>{item ? item : "Default"}</div>,
        };
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width: "20rem",
      sorter: (a, b) => sortTableColumns(a.email, b.email),
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
      sorter: (a, b) => sortTableColumns(a.phone, b.phone),
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
      sorter: (a, b) => sortTableColumns(a.id_number, b.id_number),
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
      sorter: (a, b) => sortTableColumns(a.mac, b.mac),
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
      sorter: (a, b) => sortTableColumns(a.hand, b.hand),
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
      width: "55px",
      fixed: "right",
      textAlign: "center",
      render: (item, record) => {
        return (
          <div className="action-div">
            <Radio.Group
              onChange={e => {
                onChange(e, record);
              }}
              value={radioValue}
              disabled={userRole.userRole === UserRole} //Admin: 1
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
      width: "10rem",
      sorter: (a, b) => sortTableColumns(a.first_name, b.first_name),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return compareString(record.first_name, value);
      },
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

  const onRow = (record = {}, rowIndex) => {
    const newRecord = {
      ...record,
      name: defaultJob.name,
      job_id: defaultJob.id
    }

    props?.history?.push({
      pathname: routes.USER_DETAIL,
      state: record.name ? record : newRecord,
    });
  };

  const PDFComponent = useRef(null)

  const saveAsPdf = () => {
    const trElements = document.getElementsByTagName('tr');
    for (let i = 0; i < trElements.length; i++) {
      trElements[i].classList.remove('table-row-light');
      const nodes = trElements[i].childNodes;
      for (let j = 0; j < nodes.length; j++) {
        if (j !== 0 && j % 8 === 0) {
          nodes[j].style.display = 'none';
        }
        if (nodes[j].nodeName.toLowerCase() === 'th') {
          if (j === 9 || j === 10) {
            nodes[j].style.display = 'none';
          }
          if (j === 0) {
            nodes[j].style.width = '92px'
          }
          if (j === 1) {
            nodes[j].style.width = '103px'
          }
          if (j === 2) {
            nodes[j].style.width = '103px'
          }
          if (j === 3) {
            nodes[j].style.width = '222px'
          }
          if (j === 4) {
            nodes[j].style.width = '200px'
          }
          if (j === 5) {
            nodes[j].style.width = '149px'
          }
        }
      }
    }
    const tableElements = document.getElementsByTagName('table');
    for (let i = 0; i < tableElements.length; i++) {
      tableElements[i].style.tableLayout = 'initial';
    }
    const viewportMeta = document.getElementById("viewportMeta").getAttribute("content");
    document.getElementById("viewportMeta").setAttribute("content", "width=1200");
    html2canvas(PDFComponent.current)
      .then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${new Date().toISOString()}.pdf`);
        document.getElementById("viewportMeta").setAttribute("content", viewportMeta);
        for (let i = 0; i < trElements.length; i++) {
          if (i % 2 === 0) {
            trElements[i].classList.add('table-row-light');
          }
          const nodes = trElements[i].childNodes;
          for (let j = 0; j < nodes.length; j++) {
            nodes[j].style.width = 'auto';
            nodes[j].style.display = 'table-cell'
          }
          const tableElements = document.getElementsByTagName('table');
          for (let i = 0; i < tableElements.length; i++) {
            tableElements[i].style.tableLayout = 'fixed';
          }
        }
      })
  }

  return (
    <BasicLayout>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99", padding: "20px" }}
          loading
          active
        />
      ) : (
        <Card className="page-content" ref={PDFComponent}>
          <div className="page-content-header users-page-header">
            <div className="user-score">Users</div>

            <div className="create-pdf-buttons">
              <Button
                shape="round"
                onClick={() => saveAsPdf()}
                icon={<DownloadOutlined />}
                className="pdf-button"
                data-html2canvas-ignore="true"
              >
                Save as PDF
              </Button>
              <Button
                shape="round"
                onClick={CreateNewUser}
                icon={<PlusOutlined />}
                className="createNewButton"
              >
                Create New User
              </Button>
            </div>

          </div>
          <div className="usersTable">
            <SearchBox func={pull_data} />
            <Table
              data={dataSource}
              columns={parseInt(width) > 480 ? columns : mobileColumns}
            />
          </div>
        </Card>
      )}
    </BasicLayout>
  );
};
export default Users;
