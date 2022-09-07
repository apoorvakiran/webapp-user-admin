import { Grid, Paper, styled, Typography } from "@mui/material";
import { Card, Skeleton, Space } from "antd";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { DashboardData, ActiveScoreDesc, SafetyScoreDesc, SpeedScoreDesc, RiskScoreDesc, baseUrl, formatDate, getColor, getAuthData } from "../../utils/Data/Data";
import Chart from "../../components/Charts/Chart";
import axios from "axios";
import "../../components/Dashboard/dashboard.css";
import Barchart from "../../components/Charts/BarChart";
import { useLocation } from "react-router-dom";
import UserInfo from "./UserInfo";
import SettingIcon from "../../images/setting.png";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import { cardIconStyle } from "./style";
import LiveSession from "../../components/LiveSession";

const Dashboard = props => {
  const location = useLocation();
  const [loading, seLoading] = useState(true);
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
  const userData = location?.state;

  const getUserScore = async value => {
    const idToken = await getAuthData();
    const request = await axios.get(
      baseUrl + "userdetail", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        "type": "get-user-score",
        "userId": userData?.id,
        "duration_type": value
      }
    }
    );
    seLoading(false);
    setScores(request?.data?.data || []);
    return request?.data;
  };
  const getActiveScores = async value => {
    const current = new Date();
    const date = formatDate(current);
    const idToken = await getAuthData();
    const response = await axios.get(
      // "http://localhost:5051/api/user-admin/get-user-detail", {
      baseUrl + "userdetail", {
      headers: {
        "Authorization": `Bearer ${idToken}`
      },
      params: {
        "type": "get-user-detail",
        "userId": userData.id,
        "durationType": value,
        "startdate": date
      }
    });
    seLoading(false);
    setScores(response?.data?.card_data || []);
    const data = response?.data?.data;
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
  };
  useEffect(() => {
    getActiveScores("Day");
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    borderColor: "black",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));
  const onGridSelection = async value => {
    getActiveScores(value);
  };
  const getIcon = icon => {
    switch (icon) {
      case "Active":
        return SettingIcon;
      case "Injury":
        return Vector2Icon;
      case "Speed":
        return StrokeIcon;
      case "Risk":
        return PolygonIcon;
      default:
        return SettingIcon;
    }
  };
  return (
    <BasicLayout pageTitle="User Detail">
      {/* <Space> */}
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) : (
        <Card>
          <div className="dashboard">
            <div className="user-info-container">
              <UserInfo userData={userData} />
            </div>
            <Grid container spacing={0} className="timeSelect">
              {DashboardData?.map((data, index) => {
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
                        selected === index
                          ? "gridData activeGrid"
                          : "gridData"
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
            <Card
              className="scoreBoard childCard"
              headStyle={{ fontWeight: "700", padding: "0", marginTop: "-5px" }}
            // extra={
            //   <Space style={{ justifyContent: "center" }}>
            //     <LiveSession session="1:34:00" />
            //   </Space>
            // }
            >
              <div className="scoreboardTitle">
                <span>Scoreboard</span>
              </div>
              {scores?.map((row, index) => (
                <Card.Grid
                  hoverable={false}
                  className="gridUserStyle gridStyle"
                >
                  <Typography className={"innerCardUpperTitle" + index}>
                    <span>
                      <img src={getIcon(row.type)} className="cardIcon" />
                    </span>
                    {row.type !== "Risk" ? row.type : "Risk Frequency"}
                  </Typography>
                  <Typography className="innerCardValue">
                    {row.type !== "Active" ? row.value : row.value + "%"}
                  </Typography>
                  <Typography className={"innerCardTitle" + index} style={{ color: getColor(row) }}>
                    {row.color}
                  </Typography>
                </Card.Grid>
              ))}
            </Card>
            <Grid container spacing={2} className="chartContainer">
              <Grid item s={12} lg={6} className="chart">
                <Item>
                  <Chart
                    title="Injury Risk Score"
                    data={safetyGraphData}
                    desc={SafetyScoreDesc}
                    labels={safetyGraphLabels}
                    Icon={Vector2Icon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                    yAxisMax={7}
                    yAxisMin={0}
                    yAxisStep={1}
                  />
                </Item>
              </Grid>
              <Grid item s={12} lg={6} className="chart">
                <Item>
                  <Barchart
                    title="Risk Frequency"
                    desc={RiskScoreDesc}
                    data={riskGraphData}
                    labels={riskGraphLabels}
                    Icon={PolygonIcon}
                  />
                </Item>
              </Grid>
              <Grid item s={12} lg={6} className="chart">
                <Item>
                  <Chart
                    title="Speed Score"
                    desc={SpeedScoreDesc}
                    data={speedGraphData}
                    labels={speedGraphLabels}
                    Icon={StrokeIcon}
                    LinearGradientColor={["#FF0A0A", "#F3BE00", "#33FF00"]}
                    yAxisMax={7}
                    yAxisMin={0}
                    yAxisStep={1}
                  />
                </Item>
              </Grid>
              <Grid item s={12} lg={6} className="chart">
                <Item>
                  <Chart
                    title="Active Score"
                    data={activeGraphData}
                    desc={ActiveScoreDesc}
                    labels={activeGraphLabels}
                    Icon={SettingIcon}
                    LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}
                    yAxisMax={100}
                    yAxisMin={0}
                    yAxisStep={10}
                  />
                </Item>
              </Grid>
            </Grid>
          </div>
        </Card>
      )}
      {/* </Space> */}
    </BasicLayout>
  );
};

export default Dashboard;
