import { Grid, Paper, styled, Typography } from "@mui/material";
import { Card, Skeleton, Space, Radio, Row, Col, Progress } from "antd";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../../layouts/BasicLayout";
import axios from "axios";
import "../../../components/Dashboard/dashboard.css";
import "../analytics.css";
import { useLocation } from "react-router-dom";
import PolygonIcon from "../../../images/Polygon.svg";
import StrokeIcon from "../../../images/Stroke.png";
import Vector2Icon from "../../../images/Vector2.png";
import SettingIcon from "../../../images/setting.png";
import { cardIconStyle, RiskcardIconStyle } from "../../Users/style";
import ProgressBar from "./ProgressBar";
import ScoreFilter from "./ScoreFilter";
import { getSpeedScoreColor } from "../../../utils/helpers";
import routes from "../../../features/Routes/URLs";
import { baseUrl, DashboardData, formatDate, getCurrIcon, Item, ScoresTabData } from "../../../utils/Data/Data";
import CurrActiveIcon from "../../../images/activity-score-icon-white.png";
import CurrSafetyIcon from "../../../images/safety-score-icon-white.png";
import CurrSpeedIcon from "../../../images/speed-icon-white.png";
import CurrRiskIcon from "../../../images/risk-icon-white.png";
import ScoreDetails from "../ActiveScore/ScoreDetails";
import { round, sumBy } from "lodash";
import HeaderCard from "../ActiveScore/HeaderCard";

const RiskScore = props => {
  const location = useLocation();
  const [loading, seLoading] = useState(true);
  const [scoreType, setScoreType] = useState("Speed Score");
  const [selected, setSelected] = useState(0);
  const [speedScoreData, setSpeedScoreData] = useState([]);
  const [speedScoreCount, setSpeedScoreCount] = useState(0);
  const [bins, setBins] = useState("");
  const [tabChanged, setTabChanged] = useState(false);
  const [activeTab, setActiveTab] = useState("Speed Score");
  const [aggScore, setAggScore] = useState();

  const getSpeedScore = async value => {
    const current = new Date();
    const date = formatDate(current);
    const request = await axios.get(
      // "http://localhost:5051/api/user-admin/get-speed-scores", {
      baseUrl + "scores", {
      params: {
        type: "get-speed-scores",
        durationType: value,
        startdate: date,
      }
    }
    );
    setSpeedScoreData(request?.data?.data || []);
    setSpeedScoreCount(request?.data?.speedScore || 0);
    setBins(request?.data?.bins);
    seLoading(false);
    return request?.data;
  };
  useEffect(() => {
    getSpeedScore("Day");
  }, []);

  const onGridSelection = value => {
    setTabChanged(true);
    setActiveTab(value);
    getSpeedScore(value);
  };
  const getIcon = icon => {
    switch (icon) {
      case "Active Score":
        if (props.history.location.pathname === "/user-admin/analytics/active-score") {
          return CurrActiveIcon;
        } else {
          return SettingIcon;
        }

      case "Injury Risk Score":
        if (props.history.location.pathname === "/user-admin/analytics/safety-score") {
          return CurrSafetyIcon;
        } else {
          return Vector2Icon;
        }
      case "Risk Frequency":
        if (props.history.location.pathname === "/user-admin/analytics/risk-score") {
          return CurrRiskIcon;
        } else {
          return PolygonIcon;
        }
      case "Speed Score":
        if (props.history.location.pathname === "/user-admin/analytics/speed-score") {
          return CurrSpeedIcon;
        } else {
          return StrokeIcon;
        }
      default:
        return SettingIcon;
    }
  };
  let scores = [
    {
      type: "Injury Risk Score",
    },
    {
      type: "Risk Frequency",
    },
    {
      type: "Speed Score",
    },
    {
      type: "Active Score",
    }
  ];
  const handleScoreCard = type => {
    setScoreType(type);
    switch (type) {
      case "Active Score":
        return props?.history?.push(routes.ANALYTICS_ACTIVE_SCORE);
      case "Injury Risk Score":
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
      case "Speed Score":
        return props?.history?.push(routes.ANALYTICS_SPEED_SCORE);
      case "Risk Frequency":
        return props?.history?.push(routes.ANALYTICS_RISK_SCORE);
      default:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
    }
  };
  const getBinsColor = bins => {
    if (bins === "LOW") {
      return "#8ECF03";
    } else if (bins === "MEDIUM") {
      return "#FFA700";
    } else {
      return "#C54B30";
    }
  };

  const strokeColor = {
    '0%': '#FFD705',
    '100%': '#45CF03',
  }

  function calcAverage() {
    // console.log("props.scoreName", avgActiveScore);
    const avgSpeedScore = sumBy(speedScoreData, data => Number(data.speedscore)) / speedScoreData.length;
    return 33 + 67 * avgSpeedScore / 7 + "%";


  }


  const averageLine = {
    "width": "4px",
    "background-color": "transparent",
    "position": "absolute",
    "padding-left": calcAverage(),
    "border-right": "1px solid #727272",
    "z-index": "99",
    "top": "16px",
    "bottom": "0px",
  }

  const handleFilterChange = value => {
    const filterSpeedScoreData = speedScoreData;
    if (value === "low") {
      filterSpeedScoreData.sort((a, b) =>
        parseFloat(a.speedscore) > parseFloat(b.speedscore)
          ? 1
          : parseFloat(b.speedscore) > parseFloat(a.speedscore)
            ? -1
            : 0,
      );
    } else {
      filterSpeedScoreData.sort((a, b) =>
        parseFloat(a.speedscore) < parseFloat(b.speedscore)
          ? 1
          : parseFloat(b.speedscore) < parseFloat(a.speedscore)
            ? -1
            : 0,
      );
    }
    setSpeedScoreData([...filterSpeedScoreData]);
  };
  return (
    <BasicLayout>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99", padding: "20px" }}
          loading
          active
        />
      ) : (
        <Card>
          <div className="user-score">User Scores</div>
          <Card className="childCard scores-nav">
            {scores.map((row, index) => (
              <Card.Grid
                hoverable={false}
                className="risk-score-gridStyle"
                onClick={() => handleScoreCard(row.type)}
                style={{
                  background: scoreType === row.type ? "#C54B30" : "unset",
                  color: scoreType === row.type ? "#ffffff" : "unset",
                }}
              >
                <Typography className="innerCardTitle">
                  <span>
                    <img src={getIcon(row?.type)} style={cardIconStyle} />
                  </span>
                </Typography>
                <Typography>{row.type}</Typography>
              </Card.Grid>
            ))}
          </Card>
          {/* <div hoverable={true} className="risk-info"> */}
          {/* <div className="risk-info-sub-1">
              <Typography
                className="risk-card"
                style={{ color: "#535353" }}
              >
                {speedScoreCount}
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  color: getBinsColor(bins),
                }}
              >
                {bins}
              </Typography>
              <Typography
                style={{
                  color: "#94A3AC",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              ></Typography>
            </div>
            <div
              style={{
                borderLeft: "2px dashed #535353",
                marginRight: "2em",
                height: "70px",
              }}
            ></div> */}
          {/* <div className="risk-info-sub-2">
              <Typography className="innerCardTitle">
                <span>
                  <img
                    src={getCurrIcon("Speed Score")}
                    style={RiskcardIconStyle}
                  />
                </span>
                Speed Score
              </Typography>
              <Typography
                style={{
                  color: "#535353",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Measures the speed (and force) on the hand and wrist. Values
                range from 0 to 7. The higher the number, the higher the force.
                The speed score takes into account maximum values among
                pitch, yaw and roll for each sample. It is a measure of how fast
                the hand and wrist are moving.
              </Typography>
            </div>
          </div> */}
          <ScoreDetails detailsText="Speed Score" score={speedScoreCount} />
          <Grid
            container
            spacing={0}
            className="timeSelect"
            style={{ marginTop: "15px", marginBottom: "25px" }}
          >
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
          <div className='progressContainer-1'>
            {/* <ScoreFilter handleChange={handleFilterChange} /> */}
            <HeaderCard maxValue={7} minValue={0} handleChange={handleFilterChange} />
            <div style={averageLine} class="avgLine"></div>
            {speedScoreData?.map(progress => (
              <div style={{ margin: "25px 0px" }}>
                <Row gutter={24}>
                  <Col span={8}>
                    <Typography style={{ color: "#C54B30", fontSize: "15px", fontWeight: "600" }}>
                      {`${progress?.first_name} ${progress?.last_name}`}
                    </Typography>
                  </Col>
                  <Col span={16}>
                    {/* <ProgressBar
                      format={percent => `${progress.speedscore}`}
                      percent={round((parseInt(progress.speedscore) / 7) * 100)}
                      strokeColor={getSpeedScoreColor(
                        parseInt(progress.speedscore),
                      )}
                      strokeWidth={25}
                    /> */}
                    <Progress format={percent => `${progress.speedscore}`} showInfo={true} strokeWidth={30} percent={round(100 - (parseFloat(progress.speedscore) / 7) * 100)} />
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Card>
      )}
    </BasicLayout>
  );
};

export default RiskScore;
