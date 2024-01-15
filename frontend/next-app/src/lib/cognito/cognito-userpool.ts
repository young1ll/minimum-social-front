"use server";

import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
  ClientId: process.env.COGNITO_APP_CLIENT_ID as string,
};

if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error("Missing Cognito pool data");
}

export const createUserPool = async () => {
  return new CognitoUserPool(poolData);
};
