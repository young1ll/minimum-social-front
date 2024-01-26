"use server";

import {
  AdminGetUserCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "./cognito-userpool";
import config from "@/config";

const client = cognitoClient();

interface cognitoCheckUserPoolProps {
  email: string;
}

export const cognitoCheckUserPool = async ({
  email,
}: cognitoCheckUserPoolProps) => {
  const command = new AdminGetUserCommand({
    UserPoolId: config.auth.cognito.userPoolId,
    Username: email,
  });

  try {
    const result = await client.send(command);
    return result;
  } catch (error) {
    //@ts-ignore
    const errorName =
      error?.name || (error?.constructor && error.constructor.name);
    if (errorName === "UserNotFoundException") {
      return null;
    }
  }
};

interface cognitoSignupProps {
  username: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

/**
 * Sign Up Method #2 #5
 * 회원 가입 시 cognito userpool에 사용자 저장
 * 회원 가입 시 userSub을 pk로 server에 해당 사용자 저장 요청
 */
export const cognitoSignup = async ({
  username,
  email,
  password,
}: cognitoSignupProps) => {
  const command = new SignUpCommand({
    ClientId: config.auth.cognito.clientId,
    Username: email,
    Password: password,
    // UserAttributes: [{ Name: "username", Value: username }],
  });
  const result = await client.send(command);

  // console.log("CognitoSignupResult", result);

  return result;
  // return new Promise(async (resolve, reject) => {

  //   userPool.signUp(email, password, attributeList, [], (err, result) => {
  //     if (err) {
  //       console.log("Cognito Registration Failure: ", err);
  //       return err || "Cognito Registration Failed!";
  //     }

  //     console.log("Cognito Registration Success: ", result);
  //     const response = {
  //       userConfirmed: result?.userConfirmed,
  //       userSub: result?.userSub,
  //     };

  //     // save cognito user in database with userSub
  //     if (response) {
  //       const { userConfirmed, userSub } = response;

  //       // 인증 여부, pk
  //       const serverResponse = axios_user.post("/user", { userConfirmed, userSub });

  //       resolve(serverResponse);
  //     }
  //   });
  // });
};
