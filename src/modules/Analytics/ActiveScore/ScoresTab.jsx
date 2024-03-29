import React, { useEffect, useState } from "react";
import { Grid, Paper, styled, Typography } from "@mui/material";
import { DashboardData, ScoresTabData, baseUrl, formatDate, getAuthData } from "../../../utils/Data/Data";
import SettingIcon from "../../../images/setting.png";
import PolygonIcon from "../../../images/risk-icon.svg";
import StrokeIcon from "../../../images/Stroke.png";
import Vector2Icon from "../../../images/Vector2.png";
import CurrActiveIcon from "../../../images/activity-score-icon-white.png";
import CurrSafetyIcon from "../../../images/safety-score-icon-white.png";
import CurrSpeedIcon from "../../../images/speed-icon-white.png";
import CurrRiskIcon from "../../../images/risk-icon-white.png";
import { cardIconStyle } from "../../../modules/Users/style";
import ScoreDetails from "./ScoreDetails";
import { Card, Skeleton } from "antd";
import UserProgressScore from "./UserProgressScore";
import axios from "axios";
import routes from "../../../features/Routes/URLs";
import { sumBy } from "lodash";
import { ACTIVE_SCORE, ANALYTICS, INJURY_RISK_SCORE, RISK_FREQUENCY, SPEED_SCORE } from "../../../utils/consts";


export const ScoresTab = props => {
  const { history } = props;
  const [scoreType, setScoreType] = useState();
  const [aggScore, setAggScore] = useState();
  const [rating, setRating] = useState();
  // const [showDate, setShowDate] = useState();
  const [userScoreData, setUserScoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [filterBy, setFilterBy] = useState("Day");
  const [maxValue, setMaxValue] = useState();
  const [minValue, setMinValue] = useState();

  useEffect(() => {
    if (history.location.pathname === "/user-admin/analytics/active-score") {
      setScoreType('Active Score');
      setMaxValue("100%");
      setMinValue("0%");
    } else if (history.location.pathname === "/user-admin/analytics/safety-score") {
      setScoreType('Injury Risk Score');
      setMaxValue(7);
      setMinValue(0);
    }
    setFilterBy("Day");
    getScoresData(scoreType, filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreType, history]);

  async function getScoresData(type, filterBy) {
    const current = new Date();
    const date = formatDate(current);
    const idToken = await getAuthData();
    let response = [];
    if (type === ACTIVE_SCORE) {
      response = await axios.get(
        // "http://localhost:5051/api/user-admin/get-active-score",
        baseUrl + "userdetail",
        {
          headers: {
            "Authorization": `Bearer ${idToken}`
          },
          params: {
            type: "get-active-score",
            durationType: filterBy,
            startdate: date,
          },
        },
      );
    } else if (type === INJURY_RISK_SCORE) {
      response = await axios.get(
        // "http://localhost:5051/api/user-admin/get-safety-score",
        baseUrl + "userdetail",
        {
          headers: {
            "Authorization": `Bearer ${idToken}`
          },
          params: {
            type: "get-safety-score",
            durationType: filterBy,
            startdate: date,
          },
        },
      );
    }
    setLoading(false);
    setAggScore(response?.data?.agg_score || '');
    setRating(response?.data?.rating || '');
    // setShowDate(response?.data?.start_date || '');
    setUserScoreData(response?.data?.users || []);
  }

  const getIcon = icon => {
    switch (icon) {
      case ACTIVE_SCORE:
        if (history.location.pathname === "/user-admin/analytics/active-score") {
          return CurrActiveIcon;
        } else {
          return SettingIcon;
        }

      case INJURY_RISK_SCORE:
        if (history.location.pathname === "/user-admin/analytics/safety-score") {
          return CurrSafetyIcon;
        } else {
          return Vector2Icon;
        }
      case RISK_FREQUENCY:
        if (history.location.pathname === "/user-admin/analytics/risk-score") {
          return CurrRiskIcon;
        } else {
          return PolygonIcon;
        }
      case SPEED_SCORE:
        if (history.location.pathname === "/user-admin/analytics/speed-score") {
          return CurrSpeedIcon;
        } else {
          return StrokeIcon;
        }
      default:
        return SettingIcon;
    }
  };

  const handleScoreCard = async type => {
    setScoreType(() => type);
    switch (type) {
      case INJURY_RISK_SCORE:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
      case ACTIVE_SCORE:
        setScoreType(type);
        return props?.history?.push(routes.ANALYTICS_ACTIVE_SCORE);
      case SPEED_SCORE:
        return props?.history?.push(routes.ANALYTICS_SPEED_SCORE);
      case RISK_FREQUENCY:
        return props?.history?.push(routes.ANALYTICS_RISK_SCORE);
      default:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'gray',
    borderColor: "black",
    padding: theme.spacing(1),
    textAlign: "center",
    color: "black",
  }));

  async function onGridSelection(value) {
    getScoresData(scoreType, value);
  }
  return (
    <div className="dashboard">
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) :
        (
          <>
            <div className="user-score">User Scores</div>
            <Card className="childCard scores-nav">
              {ScoresTabData.map((row, index) => (
                <Card.Grid
                  hoverable={false}
                  className="risk-score-gridStyle"
                  onClick={() => handleScoreCard(row)}
                  style={{
                    background: scoreType === row ? "#C54B30" : "unset",
                    color: scoreType === row ? "#ffffff" : "unset",
                  }}
                  value={scoreType}
                >
                  <Typography className="innerCardTitle">
                    <span>
                      <img src={getIcon(row)} style={cardIconStyle} alt="" />
                    </span>
                  </Typography>
                  <Typography>{row}</Typography>
                </Card.Grid>
              ))}
            </Card>

            <ScoreDetails detailsText={scoreType} score={aggScore} rating={rating} />
            <Grid container className="timeSelect">
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
            {/* <Row gutter={24} style={{ marginTop: "20px" }}>
              <Col xs={12} xl={8}>
                <Select defaultValue="All Users" className="inputStyle">
                  <Option value="Alessandro Cross">Alessandro Cross</Option>
                  <Option value="Kaley Sexton">Kaley Sexton</Option>
                  <Option value="Chanel Brock">Chanel Brock</Option>
                  <Option value="Alayna Chen">Alayna Chen</Option>
                  <Option value="Amya Valdez">Amya Valdez</Option>
                  <Option value="Adeline Willis">Adeline Willis</Option>
                  <Option value="Chaim Avery">Chaim Avery</Option>
                  <Option value="Laney Taylor">Laney Taylor</Option>
                  <Option value="Tessa Kaufman">Tessa Kaufman</Option>
                  <Option value="Nathalia James">Nathalia James</Option>
                </Select>
              </Col>
              <Col xs={12} xl={8}>
                <Select
                  defaultValue="All Jobs"
                  className="inputStyle"
                  style={{ marginLeft: "10px" }}
                >
                  <Option value="Meat Processing">Meat Processing</Option>
                  <Option value="Meat Grinder">Meat Grinder</Option>
                </Select>
              </Col>
            </Row> 
            <UserProgressScore scoreName={props.title} minValue={minValue} maxValue={maxValue} userScore={props.data} />
            */}
            <UserProgressScore inheritedFrom={ANALYTICS} scoreName={scoreType} minValue={minValue} maxValue={maxValue} userScore={userScoreData} totalAvgScore={sumBy(userScoreData, data => Number(data.user_score)) / userScoreData.length} />
          </>
        )}
    </div>
  );
};
