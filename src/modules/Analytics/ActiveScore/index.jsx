import React, { useState } from "react";
import { Card, Skeleton } from "antd";
import BasicLayout from "../../../layouts/BasicLayout";
import { ScoresTab } from "./ScoresTab";
import "./analytics.css";

const UserAnalytics = props => {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  return (
    <BasicLayout>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99" }}
          loading
          active
        />
      ) : (
        <Card>
          <ScoresTab history={history} />
        </Card>
      )}
    </BasicLayout>
  );
};

export default UserAnalytics;
