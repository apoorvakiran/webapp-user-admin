import { Col, Row, Button, Space } from "antd";
import React from "react";
import Profile from "../../images/profile.png";
import "./user.css";
import { profileImage, createProfileButton } from "./style";
import { EditOutlined } from "@ant-design/icons";
import routes from "../../features/Routes/URLs";
import { useHistory } from "react-router-dom";
const style = {
  paddingTop: ".5em",
};
const UserInfo = props => {
  let history = useHistory();
  const { userData } = props;

  const editUser = (e, record) => {
    history.push({
      pathname: routes.EDIT_USER,
      state: record,
    });
  };

  return (
    <>
      <div className="user-name">
        {userData?.[0]?.first_name
          ? `${userData?.[0]?.first_name} ${userData?.[0]?.last_name}`
          : "NA"}
      </div>
      <div className="user-info">
        <Row>
          <Col className="gutter-row">
            <img src={Profile} style={profileImage} alt="" />
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
              <div style={{ fontWeight: "700" }}>{userData?.[0]?.role === 1 ? "Admin" : "User" || ""}</div>
              <div style={{ color: "#C54B30" }}>{userData?.[0]?.name || ""}</div>
            </Col>
            <Col style={style} className="gutter-row">
              <div style={{ color: "#C54B30" }}>{userData?.[0]?.email || ""}</div>
              <div style={{ color: "#C54B30" }}>
                Phone: {userData?.[0]?.phone || ""}
              </div>
            </Col>
            <Col style={style} className="gutter-row">
              <div>Watch: {userData?.[0]?.id_number || ""}</div>
              <div>Android ID: {userData?.[0]?.mac || ""}</div>
            </Col>
            <Col style={style} className="gutter-row">
              <div>Hand: {userData?.[0]?.hand || ""}</div>
            </Col>
            <Col style={style} className="gutter-row">
              <Button
                className="create-profile"
                htmlType="submit"
                shape="round"
                onClick={e => {
                  editUser(e, userData?.[0]);
                }}
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
