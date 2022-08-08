import { Grid, Typography } from "@mui/material";
import { Card, Skeleton, Space, Radio } from "antd";
import React, { useEffect, useState } from "react";
import BasicLayout from "../../../layouts/BasicLayout";
import { baseUrl, DashboardData, formatDate, getCurrIcon, Item } from "../../../utils/Data/Data";
import axios from "axios";
import "../../../components/Dashboard/dashboard.css";
import "../analytics.css";
import { useLocation } from "react-router-dom";
import PolygonIcon from "../../../images/Polygon.svg";
import StrokeIcon from "../../../images/Stroke.png";
import Vector2Icon from "../../../images/Vector2.png";
import SettingIcon from "../../../images/setting.png";
import { cardIconStyle, RiskcardIconStyle } from "../../Users/style";
import Table from "../../../components/Table/index";
import routes from "../../../features/Routes/URLs";
import { ScoresTabData } from "../../../utils/Data/Data";
import CurrActiveIcon from "../../../images/activity-score-icon-white.png";
import CurrSafetyIcon from "../../../images/safety-score-icon-white.png";
import CurrSpeedIcon from "../../../images/speed-icon-white.png";
import CurrRiskIcon from "../../../images/risk-icon-white.png";
import ScoreDetails from "../ActiveScore/ScoreDetails";

const RiskScore = props => {
  const location = useLocation();
  const [loading, seLoading] = useState(true);
  const [scoreType, setScoreType] = useState("Risk Frequency");
  const [selected, setSelected] = useState(0);
  const [speedScoreData, setSpeedScoreData] = useState([]);
  const [riskScoreCount, setRiskScoreCount] = useState(0);
  const [tabChanged, setTabChanged] = useState(false);
  const [activeTab, setActiveTab] = useState("Risk Frequency");
  const [aggScore, setAggScore] = useState();

  const userData = location?.state;
  const getSpeedScore = async value => {
    const current = new Date();
    const date = formatDate(current);
    const request = await axios.get(
      // "http://localhost:5051/api/user-admin/get-risk-scores", {
      baseUrl + "scores", {
      params: {
        type: "get-risk-scores",
        durationType: value,
        startdate: date,
      },
    },
    );
    setSpeedScoreData(request?.data?.data || []);
    setRiskScoreCount(request?.data?.riskScore || 0);
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
    },
  ];
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
    },
    {
      title: "Risk Events",
      dataIndex: "riskexposures",
      key: "riskexposures",
      render(item, record) {
        return {
          props: {
            style: { color: "#C54B30" },
          },
          children: <div>{item}</div>,
        };
      },
    },
  ];
  const handleScoreCard = type => {
    setScoreType(type);
    switch (type) {
      case "Active Score":
        return props?.history?.push(routes.ANALYTICS_ACTIVE_SCORE);
      case "Safety Score":
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
      case "Speed Score":
        return props?.history?.push(routes.ANALYTICS_SPEED_SCORE);
      case "Risk Frequency":
        return props?.history?.push(routes.ANALYTICS_RISK_SCORE);
      default:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
    }
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
          <div className="user-score">User Scores</div>
          <Card className="childCard scoreBoard">
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
                {riskScoreCount}
              </Typography>
              <Typography
                style={{
                  color: "#94A3AC",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                Out of 10
              </Typography>
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
                    src={getCurrIcon("Risk Frequency")}
                    style={RiskcardIconStyle}
                  />
                </span>
                Risk Frequency
              </Typography>
              <Typography
                style={{
                  color: "#535353",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                A count of the number of times the Risk Index exceeds a safe
                value. Value ranges from 0 to
                10. The higher the number, the higher the risk of injury. The
                maximum value is capped at 10.
              </Typography>
            </div>
          </div> */}
          <ScoreDetails detailsText="Risk Frequency" score={riskScoreCount} />
          <Grid
            container
            spacing={0}
            className="timeSelect"
            style={{ marginTop: "15px", marginBottom: "25px" }}
          >
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
          <Table data={speedScoreData} columns={columns} />
        </Card>
      )}
    </BasicLayout>
  );
};

export default RiskScore;
