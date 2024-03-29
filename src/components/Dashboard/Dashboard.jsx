import { Grid, Paper, styled, Typography } from "@mui/material";
import { Card, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { DashboardData, ActiveScoreDesc, SafetyScoreDesc, SpeedScoreDesc, RiskScoreDesc, baseUrl, formatDate, getColor, getAuthData } from "../../utils/Data/Data";
import Chart from "../Charts/Chart";
import axios from "axios";
import "./dashboard.css";
import Barchart from "../Charts/BarChart";
import SettingIcon from "../../images/setting.png";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import UserIcon from "../../images/UserIcon.png";
import { cardIconStyle } from "../../modules/Users/style";
import Table from "../../components/Table/index";
import Meta from "antd/lib/card/Meta";
import { ACTIVE, ACTIVE_SCORE, RISK, SAFETY, SAFETY_SCORE, SPEED, SPEED_SCORE } from "../../utils/consts";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState([]);
  const [activeGraphLabels, setActiveGraphLabels] = useState([]);
  const [activeGraphData, setActiveGraphData] = useState([]);
  const [safetyGraphLabels, setSafetyGraphLabels] = useState([]);
  const [safetyGraphData, setSafetyGraphData] = useState([]);
  const [speedGraphLabels, setSpeedGraphLabels] = useState([]);
  const [speedGraphData, setSpeedGraphData] = useState([]);
  const [riskGraphLabels, setRiskGraphLabels] = useState([]);
  const [riskGraphData, setRiskGraphData] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [jobTitleList, setJobTitleList] = useState([]);
  const [jobTeamList, setJobTeamList] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [dataType, setDataType] = useState('Day');

  async function getActiveScores(value) {

    const current = new Date();
    const date = formatDate(current);
    const idToken = await getAuthData();
    const response = await axios.get(
      // "http://localhost:5051/api/user-admin/summary-graph-data", {
      baseUrl + "summary", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        type: "summary-graph-data",
        durationType: value,
        startdate: date
      }
    }
    );
    const data = response.data.data;
    setScores(response.data.card_data);
    let activeLabels = data["activescore"]?.x || [];
    let activeData = data["activescore"]?.y || [];
    let safetyLabels = data["safetyscore"]?.x || [];
    let safetyData = data["safetyscore"]?.y || [];
    let speedLabels = data["speedscore"]?.x || [];
    let speedData = data["speedscore"]?.y || [];
    let riskLabels = data["riskexposures"]?.x || [];
    let riskData = data["riskexposures"]?.y || [];
    setActiveGraphLabels(activeLabels);
    setActiveGraphData(activeData);
    setSafetyGraphLabels(safetyLabels);
    setSafetyGraphData(safetyData);
    setSpeedGraphLabels(speedLabels);
    setSpeedGraphData(speedData);
    setRiskGraphLabels(riskLabels);
    setRiskGraphData(riskData);
    return response.data;
  }

  useEffect(() => {
    getJobTitleList();
    getUserData();
    getActiveScores("Day");
  }, []);

  async function getUserData() {
    // const response = await axios.get(
    //   "http://localhost:5051/api/user-admin/user-list",
    // );
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "user", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        type: "user-list"
      }
    }
    );
    setLoading(false);
    setUserCount(response.data.meta.total);
  }

  async function getJobTitleList() {
    // const response = await axios.get(
    //   "http://localhost:5051/api/user-admin/get-jobs-list",
    // );
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
    setLoading(false);
    setJobTitleList(response.data);
  }

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
    borderColor: "black",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

  async function onGridSelection(value) {
    setDataType(value);
    // getData(value);
    if (selectedJobTitle !== "") {
      const jobId = `${jobTitleList.filter(data => data.name === selectedJobTitle)[0].id}`;
      getJobWiseSummaryGraph(jobId, value);
    } else {
      getActiveScores(value);
    }

  }

  const getIcon = icon => {
    switch (icon) {
      case ACTIVE:
        return SettingIcon;
      case SAFETY:
        return Vector2Icon;
      case SPEED:
        return StrokeIcon;
      case RISK:
        return PolygonIcon;
      default:
        return SettingIcon;
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: true,
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div>{`${record?.first_name} ${record?.last_name}`}</div>,
        };
      },
    }
  ];


  const handleChange = (value) => {
    let val = `${value}`;
    setDataType("Day");
    // console.log("key", `${jobTitleList.filter(data => data.id === key)[0].name}`);
    if (val !== "0") {
      setSelectedJobTitle(`${jobTitleList.filter(data => data.id === value)[0].name}`);
      getJobUserList(`${value}`);
      getJobWiseSummaryGraph(`${value}`, dataType);
    } else {
      setSelectedJobTitle("");
      getActiveScores(dataType);
    }
  };

  async function getJobWiseSummaryGraph(value, durationType) {

    const current = new Date();
    const date = formatDate(current);
    const idToken = await getAuthData();
    const response = await axios.get(
      // "http://localhost:5051/api/user-admin/get-summary-by-job", {
      baseUrl + "summary", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        type: "get-summary-by-job",
        durationType: durationType,
        startdate: date,
        jobId: value
      }
    }
    );
    const data = response.data.data;
    setScores(response.data.card_data);
    let activeLabels = data["activescore"]?.x || [];
    let activeData = data["activescore"]?.y || [];
    let safetyLabels = data["safetyscore"]?.x || [];
    let safetyData = data["safetyscore"]?.y || [];
    let speedLabels = data["speedscore"]?.x || [];
    let speedData = data["speedscore"]?.y || [];
    let riskLabels = data["riskexposures"]?.x || [];
    let riskData = data["riskexposures"]?.y || [];
    setActiveGraphLabels(activeLabels);
    setActiveGraphData(activeData);
    setSafetyGraphLabels(safetyLabels);
    setSafetyGraphData(safetyData);
    setSpeedGraphLabels(speedLabels);
    setSpeedGraphData(speedData);
    setRiskGraphLabels(riskLabels);
    setRiskGraphData(riskData);
    return response.data;
  }

  async function getJobUserList(userId) {
    // const response = await axios.get(
    //   "http://localhost:5051/api/user-admin/get-user-jobs-list", {
    //   params: {
    //     id: userId
    //   }
    // }
    // );
    const idToken = await getAuthData();
    const response = await axios.get(
      baseUrl + "userdetail", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        id: userId,
        type: "get-user-jobs-list"
      }
    }
    );
    setLoading(false);
    setJobTeamList(response.data);
  }

  return (
    <BasicLayout pageTitle={"Summary"}>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) : (
        <Card style={{ marginLeft: 10 }}>
          <div style={{ marginBottom: 2 }}>Tampa, Florida</div>
          <div className="user-score" style={{ marginBottom: 20 }}>Dashboard</div>
          <Select defaultValue="All Jobs" className="selectStyle" style={{ width: "200px", marginBottom: "20px" }}
            onChange={handleChange} >
            <Select.Option value={0}> All Jobs </Select.Option>
            {jobTitleList.map((row, index) => (
              <Select.Option value={row.id}>{row.name} </Select.Option>
            ))}
          </Select>
          <div className="dashboard">
            {/* <h1 className="dashboardTitle">Dashboard</h1> */}
            <Grid container spacing={0.2}>
              {DashboardData.map((data, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={3}
                    onClick={() => {
                      setSelected(index);
                    }}
                  >
                    <Item
                      className={
                        selected === index ? "gridData activeGrid" : "gridData"
                      }
                      onClick={e => {
                        e.preventDefault();
                        onGridSelection(data);
                      }}
                    >
                      {data}
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
            <Card className="childCard">
              {
                selectedJobTitle !== "" & selectedJobTitle !== "0" ?
                  <Meta style={{ margin: "10px" }} title={
                    <span style={{ fontWeight: "700", color: "#535353" }}>{selectedJobTitle}</span>
                  } /> : ""
              }

              {scores.map((row, index) => (
                <Card.Grid hoverable={false} className="gridStyle">
                  <Typography className={"innerCardUpperTitle" + index}>
                    <span>
                      <img src={getIcon(row?.type)} className="cardIcon" style={cardIconStyle} alt="" />
                    </span>
                    {row.type}
                  </Typography>

                  <Typography className="innerCardValue">{row.value}</Typography>
                  <Typography className={"innerCardTitle" + index} style={{ color: getColor(row) }}>
                    {row.color}
                  </Typography>
                </Card.Grid>
              ))}
              <Card.Grid hoverable={false} className="gridStyle userCard">
                <Typography className="innerCardTitle">
                  <span>
                    <img src={UserIcon} alt="" />
                  </span>
                  &nbsp; USERS
                </Typography>

                <Typography className="innerCardValue">{userCount}</Typography>
                <Typography className="innerCardTitle12">
                  {/* VIEW ALL  */}
                  USERS
                </Typography>
              </Card.Grid>
            </Card>
            {dataType === 'Day'
              ?
              <>
                <div className="chart">
                  <Chart
                    title={ACTIVE_SCORE}
                    desc={ActiveScoreDesc}
                    data={activeGraphData}
                    labels={activeGraphLabels}
                    Icon={SettingIcon}
                    LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}
                  />
                  <Chart
                    title={SAFETY_SCORE}
                    desc={SafetyScoreDesc}
                    data={safetyGraphData}
                    labels={safetyGraphLabels}
                    Icon={Vector2Icon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                </div>
                <div className="chart">
                  <Chart
                    title={SPEED_SCORE}
                    desc={SpeedScoreDesc}
                    data={speedGraphData}
                    labels={speedGraphLabels}
                    Icon={StrokeIcon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                  <Barchart
                    title="Risk Exposures"
                    desc={RiskScoreDesc}
                    data={riskGraphData}
                    labels={riskGraphLabels}
                    Icon={PolygonIcon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                </div>
              </>
              :
              <>
                <div className="chart">
                  <Chart
                    title={ACTIVE_SCORE}
                    desc={ActiveScoreDesc}
                    data={activeGraphData}
                    labels={activeGraphLabels}
                    Icon={SettingIcon}
                    LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}
                  />
                  <Chart
                    title={SAFETY_SCORE}
                    desc={SafetyScoreDesc}
                    data={safetyGraphData}
                    labels={safetyGraphLabels}
                    Icon={Vector2Icon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                </div>
                <div className="chart">
                  <Chart
                    title={SPEED_SCORE}
                    desc={SpeedScoreDesc}
                    data={speedGraphData}
                    labels={speedGraphLabels}
                    Icon={StrokeIcon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                  <Barchart
                    title="Risk Exposures"
                    desc={RiskScoreDesc}
                    data={riskGraphData}
                    labels={riskGraphLabels}
                    Icon={PolygonIcon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                  />
                </div>
              </>
            }

            {
              selectedJobTitle !== "" & selectedJobTitle !== "0" ?
                <>
                  <Typography className="jobTitleTeam"><img style={{ marginRight: "10px" }} src={UserIcon} alt="" />{selectedJobTitle} Team</Typography>
                  <div className="chart">
                    <Table data={jobTeamList} columns={columns} showHeader={false} />
                  </div>
                </>
                : <></>
            }

          </div>
        </Card>
      )}
    </BasicLayout>
  );
};

export default Dashboard;
