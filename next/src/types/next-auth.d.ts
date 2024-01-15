declare module 'next-auth' {
  interface User {}
  interface Session extends DefaultSession {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
    authorization?: JWT['accessToken'];
  }
}

export enum Role {}
