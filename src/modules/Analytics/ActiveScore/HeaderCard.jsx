import React from "react";
import { Select, Typography } from "antd";
import "./analytics.css";
const { Option } = Select;

const HeaderCard = props => {
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
                    <Option value="low" data-testid="low">Sort: Low</Option>
                </Select>
            </div>
            <div className="speed-score-average">
                <Typography style={{ width: "33%", color: "#00CF15", fontWeight: "700" }} data-testid="minValue">{props.minValue}</Typography>
                {/*<Typography style={{ width: "34%", textAlign: "center", color: "#F3AF00", fontWeight: "700" }}>{"Average"}</Typography>*/}
                <Typography style={{ width: "33%", textAlign: "end", color: "#D10000", fontWeight: "700" }} data-testid="maxValue">{props.maxValue}</Typography>
            </div>
        </div>
    );
};

export default HeaderCard;
