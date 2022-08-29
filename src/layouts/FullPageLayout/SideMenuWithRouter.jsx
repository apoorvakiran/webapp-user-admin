import React from "react";
import { Menu } from "antd";
import {
  MENU_KEYS,
  sideBarNavigator,
} from "../../features/Routes/navigation";
import { SideMenuStyle } from "./style";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LogOut } from "../../modules/Login/Logout";

const { SubMenu } = Menu;

const Icon = ({ type, ...rest }) => {
  const icons = require(`@ant-design/icons`);
  const Component = icons[type];
  return <Component {...rest} />;
};

class SidebarMenuItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [this.firstPath],
      selectedKey: this.path,
    };
  }
  rootSubmenuKeys = Object.values(MENU_KEYS);
  path = window.location.pathname;
  firstPath = this.path.split("/")[1];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  onMenuItemSelected = selectedMenu => {
    if (selectedMenu.key !== this.state.selectedKey) {
      this.setState({ selectedKey: selectedMenu.key });
      if (selectedMenu.key === "/user-admin/logout") {
        LogOut();
      } else {
        this.props?.history?.push(`${selectedMenu.key}`);
      }
    }

  };
  renderSideMenu = routeMap => {
    return routeMap?.map((menu, i) => {
      return (
        <>
          <Menu.Item
            key={menu.url}
            disabled={menu.disabled}
            className={
              this.state.selectedKey === menu.url ||
                "/" + this.state.selectedKey.split("/").slice(1, 3).join("/") ===
                menu.url ||
                (menu.url === "/user-admin/analytics/safety-score" &&
                  menu.url.split("/").slice(1, 3).join("/") ===
                  this.state.selectedKey.split("/").slice(1, 3).join("/"))
                ? "selected-menu-item"
                : ""
            }
          >
            {this.state.selectedKey === menu.url ||
              "/" + this.state.selectedKey.split("/").slice(1, 3).join("/") ===
              menu.url ||
              (menu.url === "/user-admin/analytics/safety-score" &&
                menu.url.split("/").slice(1, 3).join("/") ===
                this.state.selectedKey.split("/").slice(1, 3).join("/")) ? (
              <Icon type={menu.icon} />
            ) : null}
            <span>{menu.name}</span>
          </Menu.Item>
        </>
      );
    });
  };

  render() {
    const routesGenerated = sideBarNavigator;
    return (
      <Menu
        mode="inline"
        style={SideMenuStyle}
        onClick={e => this.onMenuItemSelected(e)}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={this.state.selectedKey}
      >
        {routesGenerated && this.renderSideMenu(routesGenerated)}
      </Menu>
    );
  }
}

export const SidebarMenuItemsWithRouter = withRouter(SidebarMenuItems);
