import React from "react";
import { Progress, Select, Typography } from "antd";
import "../analytics.css"
const { Option } = Select;

const ScoreFilter = props => {
  const { handleChange } = props;
  return (
    <div className="speed-score-container">
      <div style={{ width: "33%" }}>
        <Select
          defaultValue="high"
          onChange={handleChange}
          style={{ width: 120 }}
        >
          <Option value="high">Sort: High</Option>
          <Option value="low" data-testId="low">Sort: Low</Option>
        </Select>
      </div>
      <div className="speed-score-average">
        <Typography style={{ width: "33%" }} data-testId="min-value">{0}</Typography>
{/*        <Typography style={{ width: "34%", textAlign: "center" }}>{"Average"}</Typography>*/}
        <Typography style={{ width: "33%", textAlign: "end" }} data-testId="max-value">{7}</Typography>
      </div>
    </div>
  );
};

export default ScoreFilter;
