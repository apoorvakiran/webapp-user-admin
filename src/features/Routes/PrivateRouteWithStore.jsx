import React from "react";
import routes, { getRoute } from "./URLs";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { sideBarNavigator } from "./navigation";

export const BASE_ROUTE = "/user-admin/";
const PrivateRouteWithStore = ({
  component: Component,
  accessToken,
  loggedIn,
  loginModal,
  ...rest
}) => {
  const landingPage = () => {
    try {
      const route = sideBarNavigator[0];
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
  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default PrivateRouteWithStore;
