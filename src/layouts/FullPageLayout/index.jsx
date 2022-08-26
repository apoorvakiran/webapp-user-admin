import React, { useState, useEffect } from "react";
import { Layout, Space, Menu, PageHeader, Spin } from "antd";
import {
  SettingOutlined,
  PoweroffOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import routes from "../../features/Routes/URLs";
import { SidebarMenuItemsWithRouter } from "./SideMenuWithRouter";
import { LogoComponent } from "./Logo";
import NoData from "./NoData/index";
import styled from "styled-components";
import LayoutComponentStyles, { LogoComponentStyle } from "./style";
import "./styles.css";
import Logo from "../../images/mlogo.svg";
import logoType from "../../images/mentore-logotype.svg";

const { Content, Sider } = Layout;

const TitleMenu = styled(PageHeader)`
  .ant-page-header-heading-title {
    color: #535353;
    font-family: "Montserrat";
    font-size: 12px;
    text-transform: capitalize;
    fontweight: bold;
  }
`;
class LayoutComponent extends React.Component {
  state = {
    collapsed: false,
    contentMargin: 253,
    displaySideMenu: false,
    width: 0,
    height: 0,
  };
  getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ width: width, height: height });
  };
  componentDidMount() {
    this.getWindowDimensions();
    window.addEventListener("resize", this.getWindowDimensions);
    return () => window.removeEventListener("resize", this.getWindowDimensions);
  }
  onLogoutClick = async () => {
    this.props.onLogoutClick();
  };

  showLogoWithTitle = () => (
    <>
      <div className="logo-div">
        <div className="logoType">
          <img src={logoType} alt="Mentore" />
        </div>
        <div className="companyTitle" >
{/*          <div>Company Name</div>
          <div>
            Location, State
          </div>*/}
        </div>
      </div>
    </>
  );

  renderPageHeaderTitle = title => <div>{title} </div>;

  showProfileMenu = () => (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        <Link to={routes.SETTINGS}>{"Settings"}</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<PoweroffOutlined />}
        onClick={() => this.onLogoutClick()}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  renderHeaderActions = () => {
    return <Space style={LayoutComponentStyles.actionButtons}></Space>;
  };
  renderSider = () => {
    const { width, height } = this.state;
    let style =
      parseInt(width) > 480
        ? "block"
        : parseInt(width) <= 480 && this.state.displaySideMenu
          ? "block"
          : "none";
    return (
      <Sider
        className="sider-wdth sider-menu"
        style={{ display: style }}
        collapsible={false}
        onBreakpoint={this.onBreakpoint}
      >
        <div className="header-close-icon">
          <CloseOutlined onClick={this.handleSideMenu} />
        </div>
        {this.showLogoWithTitle()}
        <SidebarMenuItemsWithRouter />
      </Sider>
    );
  };
  handleSideMenu = () => {
    this.setState({ displaySideMenu: !this.state.displaySideMenu });
  };
  renderPageHeader = () => {
    const { pageTitle } = this.props;
    return (
      <>
        <PageHeader
          className="pageHeader-container"
          style={LayoutComponentStyles.fixedPageHeader}
          // onBack={() => window.history.back()}
          title={this.renderPageHeaderTitle(pageTitle)}
          ghost={false}
          extra={
            <div className="header-mobile-container">
              <MenuOutlined
                className="header-icon"
                onClick={this.handleSideMenu}
              />
              <img className="header-img" src={Logo} />
            </div>
          }
        ></PageHeader>
      </>
    );
  };

  renderContent = () => {
    const { loading, error, showNoData, children } = this.props;
    return (
      <>
        <Content style={LayoutComponentStyles.content}>
          <Spin spinning={!loading ? false : loading} tip="loading content">
            {!error ? children : <>{showNoData ? <NoData /> : null}</>}
          </Spin>
        </Content>
      </>
    );
  };

  render() {
    return (
      <Layout style={LayoutComponentStyles.parentLayout}>
        {this.renderSider()}
        <Layout
          className="layout-width"
          style={LayoutComponentStyles.mainLayout}
        >
          {this.renderPageHeader()}
          {this.renderContent()}
        </Layout>
      </Layout>
    );
  }
}

export default LayoutComponent;
