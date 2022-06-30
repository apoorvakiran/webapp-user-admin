/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import routes from "./URLs";
import history from "../../utils/history";
import PrivateRouteWithStore from "./PrivateRouteWithStore";
import Users from "../../modules/Users/index";
import CreateUser from "../../modules/Users/CreateUser";
import EditUser from "../../modules/Users/EditUser";
import PageNotFound from "../../layouts/PageNotFound";
import Dashboard from "../../components/Dashboard/Dashboard";
import UserDetail from "../../modules/Users/UserDetail";
import ErrorBoundary from "./ErrorBoundry";
import MentoreLogoIconN from "../../images/mlogo.svg";
import AnalyticsRiskScore from "../../modules/Analytics/RiskScore";
import AnalyticsSpeedScore from "../../modules/Analytics/SpeedScore";
import AnalyticsActiveScore from "../../modules/Analytics/ActiveScore/index";
import AnalyticsSafetyScore from "../../modules/Analytics/SafetyScore/index";
import Devices from "../../modules/Devices";
import { Amplify } from 'aws-amplify';
import { Authenticator, View, Image, Text, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../Configuration/config';
import Jobs from "../../modules/Jobs";
import CreateJob from "../../modules/Jobs/CreateJob";
import EditJob from "../../modules/Jobs/EditJob";

Amplify.configure(config);

const components = {
  Header() {

    return (
      <View textAlign="center" paddingTop="60px">
        <Image
          alt="Mentore"
          src={MentoreLogoIconN}
          height={60}
          width={50}
        />
        <Text fontSize={"x-large"} fontWeight={900} color="#535353">
          Mentore
        </Text>
      </View>
    );
  },
  SignIn: {
    Header() {
      return (
        <Heading
          level={4}
        >
          Login
        </Heading>
      );
    },
  },
  ResetPassword: {
    Header() {
      return (
        <Heading
          level={4}
          padding={'20px 10px 35px 10px'}
        >
          Password Reset
        </Heading>
      );
    },
  },
  ConfirmResetPassword: {
    Header() {
      return (
        <Heading
          level={4}
          padding={'20px 10px 35px 10px'}
        >
          Update Password
        </Heading>
      );
    },
  }
}

const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      label: '',
      placeholder: 'Email',
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      label: '',
      placeholder: 'Enter E-mail',
    },
  }
}
const signOutfn = '';

const Routes = () => {
  return (
    <Authenticator hideSignUp={true} formFields={formFields} components={components}>
      <Router history={history}>
        <ErrorBoundary>
          <Switch>
            {/* <Route
              exact
              path={getRoute("reset-password/:userid")}
              component={(props: any) => <ResetPasswordScreen {...props} />}
            /> */}
            <Route exact path="/">
              <Redirect to="/user-admin/summary" />
            </Route>
            <Route exact path="/user-admin/logout">
              <Redirect to="/user-admin/summary" />
            </Route>
            <PrivateRouteWithStore
              exact
              path={routes.SUMMARY}
              component={props => <Dashboard />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.USERS}
              component={props => <Users {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.CREATE_USER}
              component={props => <CreateUser {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.EDIT_USER}
              component={props => <EditUser {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.USER_DETAIL}
              component={props => <UserDetail {...props} />}
            />
            <PrivateRouteWithStore
              path={routes.ANALYTICS_RISK_SCORE}
              component={props => <AnalyticsRiskScore {...props} />}
            />
            <PrivateRouteWithStore
              path={routes.ANALYTICS_SPEED_SCORE}
              component={props => <AnalyticsSpeedScore {...props} />}
            />
            <PrivateRouteWithStore
              path={routes.ANALYTICS_ACTIVE_SCORE}
              component={props => <AnalyticsActiveScore {...props} />}
            />
            <PrivateRouteWithStore
              path={routes.ANALYTICS_SAFETY_SCORE}
              component={props => <AnalyticsSafetyScore {...props} />}
            />
            <PrivateRouteWithStore
              path={routes.DEVICES}
              component={props => <Devices {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.JOBS}
              component={props => <Jobs {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.CREATE_JOB}
              component={props => <CreateJob {...props} />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.EDIT_JOB}
              component={props => <EditJob {...props} />}
            />
            <PrivateRouteWithStore
              path="/user-admin/logout"
              component={props => <Dashboard />}
            />
            <PrivateRouteWithStore
              path="*"
              component={props => <PageNotFound />}
            />
          </Switch>
        </ErrorBoundary>
      </Router>
    </Authenticator>
  );
};

export default Routes;
