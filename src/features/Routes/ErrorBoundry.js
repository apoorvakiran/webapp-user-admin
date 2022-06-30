import React, { Component } from "react";
import { Button, Result } from "antd";
import BasicLayout from "../../layouts/BasicLayout";
import "./style.css";
import { createUserButton } from "../../modules/Users/style";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: {},
    };
  }

  handleReload = () => {
    window?.location?.reload();
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { isLogsEnabled, commonFailureAction } = this.props;
    this.setState({ hasError: error, errorInfo: info });
    if (isLogsEnabled) {
      commonFailureAction(error);
    }
  }

  renderFallback = () => {
    return (
      <BasicLayout pageTitle="User Admin">
        <Result
          title="Oops!"
          style={{ paddingTop: "10em" }}
          subTitle="Sorry, something went wrong, please try again."
          extra={
            <Button
              className="create-user"
              shape="round"
              style={createUserButton}
              onClick={this.handleReload}
            >
              Retry
            </Button>
          }
        />
      </BasicLayout>
    );
  };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <>{this.renderFallback()}</>;
    }
    return children;
  }
}

export default ErrorBoundary;
