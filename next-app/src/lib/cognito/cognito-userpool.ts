"use server";

import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
  ClientId: process.env.COGNITO_APP_CLIENT_ID as string,
  Region: process.env.COGNITO_REGION as string,
};

if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error("Missing Cognito pool data");
}

export const cognitoClient = () =>
  new CognitoIdentityProviderClient({
    region: poolData.Region, //optional
  });
