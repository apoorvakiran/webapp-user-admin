import {
    ClockCircleOutlined ,
} from "@ant-design/icons";
import { Tag } from "antd";
import React from "react";

const LiveSession = (props) => {
    const {session} = props;
    return(
  <>
    <Tag style={{borderRadius: "15px", background: "#C54B30", width: "8em", fontWeight: "600"}} icon={<ClockCircleOutlined  />} color="#FFFFFF">
      {session}
    </Tag>
  </>
);
};

export default LiveSession;
