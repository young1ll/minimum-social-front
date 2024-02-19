"use server";

import config from "@/config";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

const poolData = {
  UserPoolId: config.auth.cognito.userPoolId,
  ClientId: config.auth.cognito.clientId,
  Region: config.auth.cognito.region,
};

if (!poolData.UserPoolId || !poolData.ClientId) {
  throw new Error("Missing Cognito pool data");
}

export const cognitoClient = () =>
  new CognitoIdentityProviderClient({
    region: poolData.Region, //optional
  });
