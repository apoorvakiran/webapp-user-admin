const config = {
    Auth: {
        'userPoolId': process.env.REACT_APP_USER_POOL, //REQUIRED - forced commit again
        'userPoolWebClientId': process.env.REACT_APP_WEB_CLIENT,
        'identityPoolId': process.env.REACT_APP_IDENTITY_POOL,
        'region': process.env.REACT_APP_REGION,
    },
    Storage: {
        AWSS3: {
            'bucket': process.env.REACT_APP_LOGO_BUCKET, //REQUIRED -  Amazon S3 bucket name
            'region': process.env.REACT_APP_REGION, //OPTIONAL -  Amazon service region
        }
    }
};

export default config;