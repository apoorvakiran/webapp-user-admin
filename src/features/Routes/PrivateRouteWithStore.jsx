import React, { useContext } from "react";
import routes, { getRoute } from "./URLs";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { userSideBarNavigator, adminSideBarNavigator } from "./navigation";
import { Auth } from "aws-amplify";
import { UserRoleContext } from './index'
import { AdminRole } from "../../utils/Data/Data";

export const BASE_ROUTE = "/user-admin/";
const PrivateRouteWithStore = ({
  component: Component,
  accessToken,
  loggedIn,
  loginModal,
  userAccess,
  ...rest
}) => {

  const userRole = useContext(UserRoleContext);

  const landingPage = () => {
    try {
      const route = userRole.userRole === AdminRole ? adminSideBarNavigator : userSideBarNavigator;
      return route;
    } catch (error) {
      console.error("error in landingPage", error);
      return false;
    }
  };
  if (rest?.path === routes.LOGIN || rest?.path === BASE_ROUTE) {
    const landingPageRoute = landingPage(); // always 1st child of 1st menu url
    return (
      <Route
        {...rest}
        render={props =>
          loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect from="/" to={landingPageRoute?.url} />
          )
        }
      />
    );
  }
  return <Route {...rest} render={props =>
    userRole.userRole === AdminRole ? <Component {...props} />
      :
      userAccess ? <Component {...props} />
        :
        <Redirect from="/" to={landingPage()?.url} />} />;
};

export default PrivateRouteWithStore;
