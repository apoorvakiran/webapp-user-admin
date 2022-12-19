import React, { useEffect, useState } from "react";
import Table from "../../components/Table/index";
import "./chart.css";
import { Typography } from "antd";
import SettingIcon from "../../images/setting.png";
import UserProgressScore from "../Analytics/ActiveScore/UserProgressScore";
import { sumBy } from "lodash";

const AllJobSummary = props => {
  const { Icon } = props;
  const [maxValue, setMaxValue] = useState();
  const [minValue, setMinValue] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log("title:::", props.title);
    if (props.title === "Injury Risk Score" || props.title === "Speed Score") {
      setMaxValue(7);
      setMinValue(0);
    } else if (props.title === "Risk Frequency Score") {
      setMaxValue(props?.data?.[0]?.user_score);
      setMinValue(0);
    } else if (props.title === "Active Score") {
      // console.log("Active")
      setMaxValue("100%");
      setMinValue("0%");
    }
  });


  return (
    <div className="Chart">
      <h3 className="SettingTitle">
        <img className="icon-css" src={Icon ? Icon : SettingIcon} alt="" />
        {props.title}
      </h3>
      <div className="description">
        <Typography className="desc">
          {props.desc}
        </Typography>

        {/* <FormButton
          className="viewBtn"
          id="viewButton"
          title={"View " + props.title}
          changeStyleClass="ViewScoreSm"
        /> */}

      </div>
      {/* <article className="canvas-container"> */}
      {/* eslint-disable-next-line no-prototype-builtins*/}
      {props?.data?.length && props.data[0].hasOwnProperty('name') ?
        <Table data={props.data} columns={props.columns} showHeader={props.showHeader} /> :
        <UserProgressScore inheritedFrom={"Summary"} scoreName={props.title} minValue={minValue} maxValue={maxValue} userScore={props.data} totalAvgScore={sumBy(props.data, 'user_score') / props.data.length} />
      }
      {/* </article> */}
      {/* <FormButton
        id="viewButton"
        title={"View " + props.title}
        changeStyleClass="ViewScore"
      /> */}
    </div>
  );
};

export default AllJobSummary;
