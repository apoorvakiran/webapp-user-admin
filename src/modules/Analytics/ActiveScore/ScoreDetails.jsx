import React from "react";
import { cardIconStyle } from "../../../modules/Users/style";
import DownArrowIcon from "../../../images/downArrow.png";
import { Divider, Row } from "antd";
import SettingIcon from "../../../images/setting.png";
import PolygonIcon from "../../../images/risk-icon.svg";
import StrokeIcon from "../../../images/Stroke.png";
import Vector2Icon from "../../../images/Vector2.png";

const ScoreDetails = props => {
  const getDescription = activeTab => {
    switch (activeTab) {
      case "Active Score":
        return "A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0.0 to 1.0. It is an indicator of individual productivity and engagement.";
      case "Safety Score":
        return "Measures the risk of injury due to poor ergonomic motion. Value ranges from 0 to 7. The higher the number, the higher the risk of injury. The dominant motion (pitch, yaw, roll) used in this index is speed of pitch. It is a measure of force on the hand and wrist.";
      case "Risk Exposure":
        return "A count of the number of times the Risk Index exceeds a safe value during a 2.5 hour period of time. Value ranges from 0 to 10. The higher the number, the higher the risk of injury. The maximum value is capped at 10.";
      case "Speed Score":
        return "Measures the speed (and force) on the hand and wrist. Value ranges from 0 to 7. The higher the number, the higher the force. The speed score takes into account maximum values among pitch, yaw and roll for each sample. It is a measure of how fast the hand and wrist are moving. ";
      default:
        return "A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.";
    }
  };

  const getIcon = icon => {
    switch (icon) {
      case "Active Score":
        return SettingIcon;
      case "Safety Score":
        return Vector2Icon;
      case "Risk Exposure":
        return PolygonIcon;
      case "Speed Score":
        return StrokeIcon;
      default:
        return SettingIcon;
    }
  };

  return (
    <div className="textContent">
      <div className="aggScore scoresTextDiv">
        <p className="score">{props?.score}</p>
        <p className="scoreGrade">
          <span>
            <img src={DownArrowIcon} alt="" className="scoresIcons" />
          </span>
          {props.rating}
        </p>
      </div>
      <Divider type="vertical" dashed="true" />
      <div className="scoresTextDiv">
        <p className="scoreText">
          <span>
            <img
              src={getIcon(props?.detailsText)}
              style={cardIconStyle}
              alt=""
            />
          </span>
          {props?.detailsText}
        </p>

        <p className="scoreDescription">{getDescription(props?.detailsText)}</p>
      </div>
    </div>
  );
};

export default ScoreDetails;
