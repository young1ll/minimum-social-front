declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    darkmode: boolean;
    token: {
      idToken: string;
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
  interface Session extends DefaultSession {}
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: Role;
//     authorization?: JWT["accessToken"];
//   }
// }

export enum Role {}
