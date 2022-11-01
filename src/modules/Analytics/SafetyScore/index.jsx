import React from "react";
import { Card, Skeleton } from "antd";
import BasicLayout from "../../../layouts/BasicLayout";
import { ScoresTab } from "./../ActiveScore/ScoresTab";
import "./../ActiveScore/analytics.css";

const UserAnalytics = props => {
  const { history } = props;
  const loading =  false;

  return (
    <BasicLayout>
      {loading ? (
        <Skeleton
          style={{ position: "absolute", zIndex: "99", padding: "40px 20px" }}
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
