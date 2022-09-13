const config = {
    Auth: {
        'userPoolId': process.env.REACT_APP_USER_POOL,
        'userPoolWebClientId': process.env.REACT_APP_WEB_CLIENT,
        'identityPoolId': 'us-east-2:7e918941-abdd-4be2-bb0d-e34df35f9ffc',
        'region': 'us-east-2',
    },
    Storage: {
        AWSS3: {
            'bucket': 'mentore-tenant-images', //REQUIRED -  Amazon S3 bucket name
            'region': 'us-east-2', //OPTIONAL -  Amazon service region
        }
    }
}

export default config;