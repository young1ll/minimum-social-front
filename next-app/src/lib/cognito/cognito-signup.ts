"use server";

import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { createUserPool } from "./cognito-userpool";

interface cognitoSignupProps {
  email: string;
  password: string;
  // confirmPassword: string;
}

/**
 * Sign Up Method #2 #5
 */
export const cognitoSignup = async ({ email, password }: cognitoSignupProps) => {
  return new Promise(async (resolve, reject) => {
    const userPool = await createUserPool();

    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      // new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.log("Cognito Registration Failure: ", err);
        return err || "Cognito Registration Failed!";
      }

      console.log("Cognito Registration Success: ", result);
      const response = {
        userConfirmed: result?.userConfirmed,
        userSub: result?.userSub,
      };

      // save cognito user in database
    });
  });
};
