import React from "react";
import { Select, Typography } from "antd";
import "./analytics.css";
const { Option } = Select;

const HeaderCard = props => {
    const { handleChange } = props;

    return (
        <div className="speed-score-container">
            <div className="dropdownWidth">
                <Select
                    defaultValue="high"
                    onChange={handleChange}
                    style={{ width: "auto" }}
                >
                    <Option value="high">Sort: High</Option>
                    <Option value="low" data-testid="low">Sort: Low</Option>
                </Select>
            </div>
            <div className="spaceDiv"></div>
            <div className="speed-score-average">
                <Typography className="rangeLabelStart" data-testid="minValue">{props.minValue}</Typography>
                {/*<Typography style={{ width: "34%", textAlign: "center", color: "#F3AF00", fontWeight: "700" }}>{"Average"}</Typography>*/}
                <Typography className="rangeLabelEnd" data-testid="maxValue">{props.maxValue}</Typography>
            </div>
        </div>
    );
};

export default HeaderCard;
