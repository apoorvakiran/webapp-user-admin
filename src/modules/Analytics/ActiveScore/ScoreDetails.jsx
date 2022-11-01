import React from "react";
import { RiskcardIconStyle } from "../../../modules/Users/style";
// import SettingIcon from "../../../images/setting.png";
// import PolygonIcon from "../../../images/risk-icon.svg";
// import StrokeIcon from "../../../images/Stroke.png";
// import Vector2Icon from "../../../images/Vector2.png";
import { getCurrIcon, getDescription } from "../../../utils/Data/Data";

const ScoreDetails = props => {

  // const getIcon = icon => {
  //   switch (icon) {
  //     case "Active Score":
  //       return SettingIcon;
  //     case "Injury Risk Score":
  //       return Vector2Icon;
  //     case "Risk Frequency":
  //       return PolygonIcon;
  //     case "Speed Score":
  //       return StrokeIcon;
  //     default:
  //       return SettingIcon;
  //   }
  // };

  return (
    <div className="textContent">
      {/* <div className="aggScore scoresTextDiv">
        <p className="score">{props?.score}</p>
        <p className="scoreGrade">
          <span>
            <img src={DownArrowIcon} alt="" className="scoresIcons" />
          </span>
          {props.rating}
        </p>
      </div>
      <Divider type="vertical" dashed="true" /> */}
      <div className="scoresTextDiv">
        <p className="scoreText">
          <span>
            <img
              src={getCurrIcon(props?.detailsText)}
              style={RiskcardIconStyle}
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
