import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import CognitoProvider from "next-auth/providers/cognito";
import { axios_user } from "./api";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { createUserPool } from "./cognito/cognito-userpool";

/**
 * NextAuth Options #2 #8 #9
 *
 * reference:
 *  - "https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/",
 *  - "https://next-auth.js.org/configuration/options"-
 *
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      /**
       * Sign In Method #6
       *
       * @returns
       *   - Promise
       *   - { id: string, username: string, email: string, accessToken: string }
       * */
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Invalid credentials");
          }

          const userPool = await createUserPool();
          const cognitoUser = new CognitoUser({
            Username: credentials.email,
            Pool: userPool,
          });

          const authenticationDetails = new AuthenticationDetails({
            Username: credentials.email,
            Password: credentials.password,
          });

          // const { status, data } = await axios_user.get('/');
          //TODO:상세정보: axios_user가 실제 서버와의 연결로 반환되는 내용 처리

          // RETURN: Promise
          return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
              onSuccess: (result) => {
                console.log("Cognito Login Success: ", result);

                const payload = result.getIdToken().payload;

                resolve({
                  id: result.getIdToken().payload.email,
                  email: result.getIdToken().payload.email,
                });
              },

              onFailure: (err) => {
                console.log("Cognito Login Failure: ", err);

                if (err.code === "UserNotConfirmedException") {
                  resolve({ id: credentials.email, email: "Not Verified" });
                }

                reject(new Error(err.message) || "Failed to authenticate user");
              },
            });
          });
        } catch (error) {
          console.log(error);
          throw new Error(error as string);
        }
      },
    }),
    // CognitoProvider({

    // }),
    // GithubProvider({
    //   clientId: authConfig.github.clientId!,
    //   clientSecret: authConfig.github.clientSecret!,
    // }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          // role: token.role,
          // accessToken: token.accessToken,
        },
      };
    },
  },
};
export default NextAuth(authOptions);
