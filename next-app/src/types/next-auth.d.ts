declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    darkmode: boolean;
    locale: string;
    profileImage: string;

    token: {
      idToken: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: Role;
//     authorization?: JWT["accessToken"];
//   }
// }

export enum Role {}

export interface UserProps {
  id: string;
  username: string;
  email: string;
  darkmode: boolean;
  locale: string;
  profileImage: string;
  token: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
