import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import CognitoProvider from "next-auth/providers/cognito";
import { axios_user } from "./api";
import { AdminGetUserCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "./cognito/cognito-userpool";

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
        const client = cognitoClient();

        try {
          const response = await client.send(
            new InitiateAuthCommand({
              AuthFlow: "USER_PASSWORD_AUTH",
              ClientId: process.env.COGNITO_APP_CLIENT_ID,
              AuthParameters: {
                USERNAME: credentials?.email as string,
                PASSWORD: credentials?.password as string,
              },
            }),
          );

          const serverResponse = await axios_user.get(`/user/${credentials?.email}`);
          console.log(serverResponse.headers);
          console.log(serverResponse.data.user);

          if (response.AuthenticationResult) {
            const { IdToken, AccessToken, RefreshToken, ExpiresIn } = response.AuthenticationResult;
            const { pk, email, username, darkmode } = serverResponse.data.user[0];

            return {
              id: pk,
              username,
              email,
              darkmode,
              token: {
                idToken: IdToken as string,
                accessToken: AccessToken as string,
                refreshToken: RefreshToken as string,
                expiresIn: ExpiresIn as number,
              },
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.darkmode = user.darkmode;

        token.idToken = user.token.idToken;
        token.accessToken = user.token.accessToken;
        token.refreshToken = user.token.refreshToken;
        token.expiresIn = user.token.expiresIn;
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          email: token.email,
          darkmode: token.darkmode,
        },
        idToken: token.idToken,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: token.expiresIn,
      };
    },
  },
};
export default NextAuth(authOptions);
