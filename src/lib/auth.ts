import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import CognitoProvider from 'next-auth/providers/cognito';
import { axios_user } from './api';

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
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }

          const { status, data } = await axios_user.get('/');
          //TODO: axios_user가 실제 서버와의 연결로 반환되는 내용 처리

          console.log(data);

          return {
            id: data.user.id,
            username: data.user.username,
            email: credentials.email,
            role: data.user.role,
            accessToken: data.accessToken,
          };
        } catch (error) {
          return null; // Not Authorized
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
          role: token.role,
          accessToken: token.accessToken,
        },
      };
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as any;
        return {
          ...token,
          role: u.id,
          accessToken: u.accessToken,
        };
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
