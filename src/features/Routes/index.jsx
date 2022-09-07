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
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator, View, Image, Text, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../Configuration/config';
import Jobs from "../../modules/Jobs";
import CreateJob from "../../modules/Jobs/CreateJob";
import EditJob from "../../modules/Jobs/EditJob";
import validator from 'validator';
import Summary from "../../modules/Summary";

Amplify.configure(config);

const components = {
  Header() {

    return (
      <View textAlign="center" paddingTop="60px" paddingBottom="15px">
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
          level={5}
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

const formFields = () => {
  return [
    {
      type: "email",
      label: constants.EMAIL_LABEL,
      placeholder: constants.EMAIL_PLACEHOLDER,
      value: email.value,
      className: 'email-field',
      inputProps: {
        autocomplete: "off",
        onBlur: (e) => {
          handleValidation({
            ev: e,
            rules: { required: true },
          });
        },
        style:
          !email.valid && email.focused ? errorStyle : null,
      },
    },
    {
      type: "password",
      label: constants.PASSWORD_LABEL,
      placeholder: constants.PASSWORD_PLACEHOLDER,
      value: password.value,
      placeholder: 'Enter E-mail',
      inputProps: {
        autocomplete: "off",
        style:
          !password.valid && password.focused
            ? errorStyle
            : null,
        onblur: (e) =>
          handleValidation({
            rules: { required: true },
            ev: e,
          }),
      },
    },
  ];
};

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const handleValidation = ({ ev, rules }) => {
  const { value, type, name } = ev.target;
  dispatch({ type, name, rules, value });
};

const services = {
  async handleForgotPassword(formData) {
    console.log("formData", formData);
    let username = formData;
    // custom username
    // username = username;
    console.log("username", username);
    console.log("first", isValidEmail(username))

    if (validator.isEmail(username)) {
      return Auth.forgotPassword(username);
    } else {
      throw Error("Please enter valid email")
    }

  },
};

const Routes = () => {
  return (
    <Authenticator services={services} hideSignUp={true} formFields={formFields} components={components}>
      <Router history={history}>
        <ErrorBoundary>
          <Switch>
            {/* <Route
              exact
              path={getRoute("reset-password/:userid")}
              component={(props: any) => <ResetPasswordScreen {...props} />}
            /> */}
            <Route exact path="/">
              <Redirect to="/user-admin/jobs-summary" />
            </Route>
            <Route exact path="/user-admin/logout">
              <Redirect to="/user-admin/jobs-summary" />
            </Route>
            <PrivateRouteWithStore
              exact
              path={routes.NEW_SUMMARY}
              component={props => <Dashboard />}
            />
            <PrivateRouteWithStore
              exact
              path={routes.SUMMARY}
              component={props => <Summary />}
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
              component={props => <Summary />}
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
