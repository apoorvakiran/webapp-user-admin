import React, { useState } from "react";
import { Typography, Card } from "antd";
import "./analytics.css";
import PolygonIcon from "../../images/Polygon.svg";
import StrokeIcon from "../../images/Stroke.png";
import Vector2Icon from "../../images/Vector2.png";
import SettingIcon from "../../images/setting.png";
import { cardIconStyle } from "../Users/style";
import BasicLayout from "../../layouts/BasicLayout";
import routes from "../../features/Routes/URLs";
import { ACTIVE_SCORE, INJURY_RISK_SCORE, RISK_FREQUENCY, SAFETY_SCORE, SPEED_SCORE } from "../../utils/consts";

const AalyticsMain = props => {
  const [scoreType, setScoreType] = useState(INJURY_RISK_SCORE);
  const scores = [
    {
      type: ACTIVE_SCORE,
    },
    {
      type: INJURY_RISK_SCORE,
    },
    {
      type: SPEED_SCORE,
    },
    {
      type: RISK_FREQUENCY,
    },
  ];
  const handleScoreCard = type => {
    setScoreType(type);
    switch (type) {
      case ACTIVE_SCORE:
        return props?.history?.push(routes.ANALYTICS_ACTIVE_SCORE);
      case SAFETY_SCORE:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
      case SPEED_SCORE:
        return props?.history?.push(routes.ANALYTICS_SPEED_SCORE);
      case RISK_FREQUENCY:
        return props?.history?.push(routes.ANALYTICS_RISK_SCORE);
      default:
        return props?.history?.push(routes.ANALYTICS_SAFETY_SCORE);
    }
  };

  const getIcon = icon => {
    switch (icon) {
      case ACTIVE_SCORE:
        return SettingIcon;
      case INJURY_RISK_SCORE:
        return Vector2Icon;
      case SPEED_SCORE:
        return StrokeIcon;
      case RISK_FREQUENCY:
        return PolygonIcon;
      default:
        return SettingIcon;
    }
  };
  return (
    <BasicLayout pageTitle="Risk Score">
      <Card>
        <div className="user-score">User Scores</div>
        <Card className="childCard scoreBoard">
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
