import React from "react";
import { Card, Empty } from "antd";

const NoData = () => {
  return (
    <Card title="No Data" style={{ margin: "20px" }}>
      {<Empty description="No Data Found" />}
    </Card>
  );
};

export default NoData;
