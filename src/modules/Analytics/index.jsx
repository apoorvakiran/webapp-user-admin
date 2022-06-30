import React, { useState } from "react";
import { Progress, Select, Typography, Card } from "antd";
import "./analytics.css";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import SettingIcon from "../../images/setting.png";
import { cardIconStyle, RiskcardIconStyle } from "../Users/style";
import BasicLayout from "../../layouts/BasicLayout";
import routes from "../../features/Routes/URLs";

const AalyticsMain = props => {
  const [scoreType, setScoreType] = useState("Safety Score");
  const scores = [
    {
      type: "Active Score",
    },
    {
      type: "Safety Score",
    },
    {
      type: "Speed Score",
    },
    {
      type: "Risk Exposure",
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
      case "Risk Exposure":
        return props?.history?.push(routes.ANALYTICS_RISK_SCORE);
      default:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
    }
  };

  const getIcon = icon => {
    switch (icon) {
      case "Active Score":
        return SettingIcon;
      case "Safety Score":
        return Vector2Icon;
      case "Speed Score":
        return StrokeIcon;
      case "Risk Exposure":
        return PolygonIcon;
      default:
        return SettingIcon;
    }
  };
  return (
    <BasicLayout pageTitle="Risk Score">
      <Card>
        <div className="user-score">User Scores</div>
        <Card className="childCard">
          {scores.map((row, index) => (
            <Card.Grid
              hoverable={false}
              className="risk-score-gridStyle gridStyle"
              onClick={() => handleScoreCard(row.type)}
              style={{
                background: scoreType === row.type ? "#C54B30" : "unset",
                color: scoreType === row.type ? "#ffffff" : "unset",
              }}
            >
              <Typography className="innerCardTitle">
                <span>
                  <img
                    src={getIcon(row?.type)}
                    style={cardIconStyle}
                    alt="card icon"
                  />
                </span>
              </Typography>
              <Typography>{row.type}</Typography>
            </Card.Grid>
          ))}
        </Card>
      </Card>
    </BasicLayout>
  );
};

export default AalyticsMain;
