import React from "react";
import { Result, Button } from "antd";
import BasicLayout from "../BasicLayout/index";
import { ButtonStyle } from "../../modules/Users/style";

const onReload = () => window?.location?.reload();
const PageNotFound = () => (
  <BasicLayout>
    <div style={{ marginTop: "10rem", backgroundColor: "#fcfcfc" }}>
      <Result
        style={{ backgroundColor: "#fcfcfc" }}
        title={"Page Not Found"}
        subTitle={
          "Sorry, the page doesn't exist, try again or contact the administrator."
        }
        extra={
          <Button style={ButtonStyle} onClick={onReload}>
            Try Again
          </Button>
        }
      />
    </div>
  </BasicLayout>
);

export default PageNotFound;
