import { Col, Divider, Row, Button, Space } from "antd";
import React from "react";
import Profile from "../../images/profile.png";
import "./user.css";
import { createUserButton, profileImage, createProfileButton } from "./style";
import { EditOutlined } from "@ant-design/icons";
const style = {
  paddingTop: ".5em",
};
const UserInfo = props => {
  const { userData } = props;
  return (
    <>
      <div className="user-name">
        {userData?.first_name
          ? `${userData?.first_name} ${userData?.last_name}`
          : "NA"}
      </div>
      <div className="user-info">
      <Row>
      <Col className="gutter-row">
        <img src={Profile} style={profileImage} />
      </Col>
      </Row>
      <Row
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignContent: "start",
        //   alignItems: "center",
        // }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Space>
          <Col style={style} className="gutter-row">
            <div style={{ fontWeight: "700" }}>Admin</div>
            <div style={{ color: "#C54B30" }}>{userData?.title || "NA"}</div>
          </Col>
          <Col style={style} className="gutter-row">
            <div style={{ color: "#C54B30" }}>{userData?.email || "NA"}</div>
            <div style={{ color: "#C54B30" }}>
              Phone: {userData?.phone || "NA"}
            </div>
          </Col>
          <Col style={style} className="gutter-row">
            <div>Watch: {userData?.device || "NA"}</div>
            <div>Android ID: {userData?.macId || "NA"}</div>
          </Col>
          <Col style={style} className="gutter-row">
            <div>Hand: {userData?.hand || "NA"}</div>
          </Col>
          <Col style={style} className="gutter-row">
            <Button
              className="create-profile"
              htmlType="submit"
              shape="round"
              style={createProfileButton}
              icon={<EditOutlined />}
            >
              Edit Profile
            </Button>
          </Col>
        </Space>
      </Row>
      </div>
    </>
  );
};

export default UserInfo;
