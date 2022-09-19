import React from 'react'
import { Amplify } from "aws-amplify";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import config from '../../features/Configuration/config';

Amplify.configure(config);

export const LogoComponent = (props) => {
  return (
    process.env.REACT_APP_LOGO_NAME !== null && process.env.REACT_APP_LOGO_NAME !== undefined ?
      process.env.REACT_APP_LOGO_NAME !== "" ?
        <AmplifyS3Image
          imgKey={process.env.REACT_APP_LOGO_NAME} /> :
        <></>
      : <></>
  )
}
