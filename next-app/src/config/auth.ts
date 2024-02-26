export default {
  nextSecret: process.env.NEXTAUTH_SECRET,

  cognito: {
    region: process.env.S3_AWS_REGION,
    clientId: process.env.COGNITO_APP_CLIENT_ID,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
};
