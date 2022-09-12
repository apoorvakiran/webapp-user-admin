import React from "react";
import { Progress } from "antd";

const ProgressBar = props => {
  const { percent, strokeWidth, strokeColor } = props;
  return (
    <>
      <Progress
        data-testId="progress"
        percent={percent || 0}
        format={percent => percent}
        type="line"
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
        strokeLinecap="square"
        showInfo={true}
        // trailColor="white"
      />
    </>
  );
};

export default ProgressBar;
