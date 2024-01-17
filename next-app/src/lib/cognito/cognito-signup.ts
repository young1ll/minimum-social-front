"use server";

import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import { axios_user } from "../api";
import { cognitoClient } from "./cognito-userpool";

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
export const cognitoSignup = async ({ username, email, password }: cognitoSignupProps) => {
  const client = cognitoClient();

  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_APP_CLIENT_ID,
    Username: email,
    Password: password,
    // UserAttributes: [{ Name: "username", Value: username }],
  });
  const result = await client.send(command);

  console.log("CognitoSignupResult", result);

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
